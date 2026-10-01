(function () {
  var CFG = window.RUMMANA_ADMIN, D = window.RUMMANA;
  var API = "https://api.github.com/repos/" + CFG.owner + "/" + CFG.repo + "/contents/";
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var token = null, content = null, contentSha = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function toast(t) {
    var el = $("#toast");
    el.textContent = t; el.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { el.hidden = true; }, 4000);
  }

  /* ---------- base64 helpers ---------- */
  function bytesToB64(bytes) {
    var bin = "";
    for (var i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function b64ToBytes(b64) {
    var bin = atob(b64.replace(/\s/g, "")), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  var enc = new TextEncoder(), dec = new TextDecoder();

  /* ---------- password <-> token (PBKDF2 + AES-GCM) ---------- */
  function deriveKey(pass, salt) {
    return crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]).then(function (k) {
      return crypto.subtle.deriveKey({ name: "PBKDF2", salt: salt, iterations: 310000, hash: "SHA-256" }, k,
        { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    });
  }
  function lock(tok, pass) {
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return deriveKey(pass, salt).then(function (key) {
      return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, enc.encode(tok));
    }).then(function (ct) {
      return { v: 1, salt: bytesToB64(salt), iv: bytesToB64(iv), ct: bytesToB64(new Uint8Array(ct)) };
    });
  }
  function unlock(box, pass) {
    return deriveKey(pass, b64ToBytes(box.salt)).then(function (key) {
      return crypto.subtle.decrypt({ name: "AES-GCM", iv: b64ToBytes(box.iv) }, key, b64ToBytes(box.ct));
    }).then(function (pt) { return dec.decode(pt); });
  }

  /* ---------- GitHub contents API ---------- */
  function gh(path, opts) {
    opts = opts || {};
    opts.headers = { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" };
    return fetch(API + path + (opts.method ? "" : "?ref=" + CFG.branch + "&t=" + Date.now()), opts).then(function (r) {
      if (r.status === 404 && !opts.method) return null;
      if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) {
        var e = new Error(j.message || r.status); e.status = r.status; throw e;
      });
      return r.json();
    });
  }
  function put(path, b64, msg, sha) {
    var body = { message: msg, content: b64, branch: CFG.branch };
    if (sha) body.sha = sha;
    return gh(path, { method: "PUT", body: JSON.stringify(body) });
  }
  function errText(e) {
    if (e.status === 401) return "المفتاح غلط أو انتهت صلاحيته. اعمل مفتاح جديد وغيّر كلمة السر من الإعدادات.";
    if (e.status === 403 || e.status === 404) return "المفتاح ما معه صلاحية كتابة على المستودع " + CFG.repo + ".";
    if (e.status === 409) return "في تعديل ثاني صار بنفس الوقت. حدّث الصفحة وجرب مرة ثانية.";
    return "ما زبط الحفظ (" + e.message + "). تأكد من الإنترنت وجرب مرة ثانية.";
  }

  /* ---------- content.json ---------- */
  function loadContent() {
    return gh("content.json").then(function (f) {
      if (f) {
        contentSha = f.sha;
        content = JSON.parse(dec.decode(b64ToBytes(f.content)));
      } else {
        contentSha = null;
        content = {};
      }
      content.settings = content.settings || { contact: {}, deliveryNote: "" };
      content.settings.contact = content.settings.contact || {};
      content.products = content.products || [];
      content.testimonials = content.testimonials || [];
    });
  }
  function saveContent(msg) {
    var b64 = bytesToB64(enc.encode(JSON.stringify(content, null, 2) + "\n"));
    return put("content.json", b64, msg, contentSha).then(function (r) {
      contentSha = r.content.sha;
      toast("انحفظ ✓ الموقع بيتحدث خلال دقيقة أو دقيقتين.");
    });
  }
  function withBusy(el, p) {
    el.classList.add("busy");
    return p.catch(function (e) { toast(errText(e)); throw e; }).finally(function () { el.classList.remove("busy"); });
  }

  /* ---------- gates ---------- */
  function show(id) {
    ["#gateLogin", "#gateSetup", "#panel"].forEach(function (s) { $(s).hidden = s !== id; });
  }
  function fetchKeyBox() {
    return fetch("key.json?t=" + Date.now(), { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }
  function enter() {
    return loadContent().then(function () {
      show("#panel");
      renderAll();
    });
  }

  $("#loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("#loginMsg"), form = e.target;
    msg.textContent = "لحظة…";
    withBusy(form, fetchKeyBox().then(function (box) {
      if (!box) { show("#gateSetup"); msg.textContent = ""; return; }
      return unlock(box, $("#loginPass").value).then(function (t) {
        token = t;
        try { sessionStorage.setItem("rm-t", t); } catch (er) {}
        msg.textContent = "";
        return enter();
      }, function () { msg.textContent = "كلمة السر غلط."; });
    })).catch(function () {});
  });

  $("#setupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("#setupMsg"), p1 = $("#setupPass").value, p2 = $("#setupPass2").value;
    if (p1.length < 10) { msg.textContent = "كلمة السر لازم تكون 10 أحرف أو أكثر."; return; }
    if (p1 !== p2) { msg.textContent = "كلمتين السر مش متطابقات."; return; }
    token = $("#setupToken").value.trim();
    msg.textContent = "بفحص المفتاح…";
    withBusy(e.target, gh("admin/key.json").then(function (old) {
      return lock(token, p1).then(function (box) {
        var b64 = bytesToB64(enc.encode(JSON.stringify(box) + "\n"));
        return put("admin/key.json", b64, "Update admin key", old ? old.sha : null);
      });
    }).then(function () {
      try { sessionStorage.setItem("rm-t", token); } catch (er) {}
      msg.textContent = "";
      return enter();
    })).catch(function (er) { msg.textContent = errText(er); token = null; });
  });

  $("#logoutBtn").addEventListener("click", function () {
    token = null;
    try { sessionStorage.removeItem("rm-t"); } catch (er) {}
    $("#loginPass").value = "";
    show("#gateLogin");
  });
  $("#resetKey").addEventListener("click", function () { show("#gateSetup"); });

  /* ---------- tabs ---------- */
  $$(".p-tabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".p-tabs button").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      $$(".tab").forEach(function (p) { p.hidden = p.getAttribute("data-pane") !== b.getAttribute("data-tab"); });
    });
  });

  /* ---------- products ---------- */
  var catOpts = D.categories.map(function (c) { return '<option value="' + c.id + '">' + esc(c.name) + "</option>"; }).join("");
  $("#pm-cat").innerHTML = catOpts;
  $("#catFilter").innerHTML = '<option value="">كل الأقسام</option>' + catOpts;
  $("#catFilter").addEventListener("change", renderProducts);
  function catName(id) { var c = D.categories.filter(function (x) { return x.id === id; })[0]; return c ? c.name : id; }
  var fresh = {}; // photos uploaded this session, shown before the site finishes rebuilding
  function imgSrc(p) { return fresh[p] || (/^https?:/.test(p) ? p : "../" + p); }

  function renderProducts() {
    var f = $("#catFilter").value, list = content.products;
    var shown = list.filter(function (p) { return !f || p.cat === f; });
    $("#prodCount").textContent = list.length + " منتج" + (list.filter(function (p) { return p.hidden; }).length ? "، منهم " + list.filter(function (p) { return p.hidden; }).length + " مخفي" : "");
    if (!shown.length) {
      $("#plist").innerHTML = '<li class="empty-row">ما في منتجات' + (f ? " بهاد القسم" : "") + ' لسا. اكبس "+ منتج جديد".</li>';
      return;
    }
    $("#plist").innerHTML = shown.map(function (p) {
      var i = list.indexOf(p);
      return '<li class="pi' + (p.hidden ? " is-hidden" : "") + '">' +
        '<div class="pi-img">' + (p.img ? '<img src="' + esc(imgSrc(p.img)) + '" alt="">' : "بدون صورة") + "</div>" +
        '<div class="pi-tx"><b>' + esc(p.name) + (p.hidden ? '<span class="tag">مخفي</span>' : "") + "</b><span>" + esc(catName(p.cat)) + " · " +
        (p.price === "" || p.price == null ? "السعر حسب الطلب" : esc(p.price) + " " + D.currency) + "</span></div>" +
        '<div class="pi-act">' +
        '<button class="ib" type="button" data-move="-1" data-i="' + i + '" aria-label="لفوق"' + (i === 0 ? " disabled" : "") + ">↑</button>" +
        '<button class="ib" type="button" data-move="1" data-i="' + i + '" aria-label="لتحت"' + (i === list.length - 1 ? " disabled" : "") + ">↓</button>" +
        '<button class="btn btn-ghost sm" type="button" data-edit="' + i + '">تعديل</button></div></li>';
    }).join("");
  }
  $("#plist").addEventListener("click", function (e) {
    var ed = e.target.closest("[data-edit]");
    if (ed) return openProduct(Number(ed.getAttribute("data-edit")));
    var mv = e.target.closest("[data-move]");
    if (mv) {
      var i = Number(mv.getAttribute("data-i")), j = i + Number(mv.getAttribute("data-move"));
      var a = content.products, t = a[i]; a[i] = a[j]; a[j] = t;
      renderProducts();
      withBusy($("#plist"), saveContent("Reorder products")).catch(function () {});
    }
  });

  /* product modal */
  var editing = -1, newImage = null;
  function openProduct(i) {
    editing = i;
    newImage = null;
    var p = i >= 0 ? content.products[i] : { cat: $("#catFilter").value || D.categories[0].id, name: "", desc: "", price: "", img: "", hidden: false };
    $("#pmTitle").textContent = i >= 0 ? "تعديل منتج" : "منتج جديد";
    $("#pm-cat").value = p.cat; $("#pm-name").value = p.name; $("#pm-desc").value = p.desc || "";
    $("#pm-price").value = p.price === "" || p.price == null ? "" : p.price;
    $("#pm-hidden").checked = !!p.hidden;
    $("#pmPrev").innerHTML = p.img ? '<img src="' + esc(imgSrc(p.img)) + '" alt="">' : "<span>بدون صورة</span>";
    $("#pm-file").value = "";
    var del = $("#pmDelete");
    del.hidden = i < 0; del.textContent = "حذف المنتج"; del.removeAttribute("data-sure");
    $("#pm").hidden = false; $("#pmBg").hidden = false;
    $("#pm-name").focus();
  }
  function closeProduct() { $("#pm").hidden = true; $("#pmBg").hidden = true; }
  $("#addProd").addEventListener("click", function () { openProduct(-1); });
  $("#pmClose").addEventListener("click", closeProduct);
  $("#pmBg").addEventListener("click", closeProduct);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !$("#pm").hidden) closeProduct(); });

  // shrink photos before upload: max 1400px, JPEG
  function shrink(file) {
    return new Promise(function (res, rej) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var s = Math.min(1, 1400 / Math.max(img.width, img.height));
        var c = document.createElement("canvas");
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        var g = c.getContext("2d");
        g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
        g.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { b ? res(b) : rej(new Error("image")); }, "image/jpeg", 0.85);
      };
      img.onerror = function () { rej(new Error("image")); };
      img.src = url;
    });
  }
  $("#pm-file").addEventListener("change", function () {
    var f = this.files[0];
    if (!f) return;
    shrink(f).then(function (b) {
      newImage = b;
      $("#pmPrev").innerHTML = '<img src="' + URL.createObjectURL(b) + '" alt="">';
    }, function () { toast("ما قدرت أقرأ الصورة. جرب صورة JPG أو PNG."); });
  });

  $("#pm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#pm-name").value.trim();
    if (!name) { $("#pm-name").focus(); return; }
    var priceRaw = $("#pm-price").value.replace(/[^\d.]/g, "");
    var old = editing >= 0 ? content.products[editing] : null;
    var p = {
      id: old ? old.id : "p" + Date.now().toString(36),
      cat: $("#pm-cat").value, name: name, desc: $("#pm-desc").value.trim(),
      price: priceRaw === "" ? "" : Number(priceRaw),
      img: old ? old.img : "", hidden: $("#pm-hidden").checked,
    };
    var step = Promise.resolve();
    if (newImage) {
      var path = "assets/products/" + p.id + "-" + Date.now().toString(36) + ".jpg";
      step = newImage.arrayBuffer().then(function (buf) {
        return put(path, bytesToB64(new Uint8Array(buf)), "Add photo for " + p.name);
      }).then(function () { fresh[path] = URL.createObjectURL(newImage); p.img = path; });
    }
    withBusy($("#pm"), step.then(function () {
      if (old) content.products[editing] = p; else content.products.push(p);
      return saveContent((old ? "Update " : "Add ") + "product: " + p.name);
    })).then(function () { closeProduct(); renderProducts(); }).catch(function () {});
  });

  $("#pmDelete").addEventListener("click", function () {
    var b = this;
    if (!b.hasAttribute("data-sure")) { b.setAttribute("data-sure", "1"); b.textContent = "متأكد؟ اكبس مرة ثانية للحذف"; return; }
    var p = content.products[editing];
    content.products.splice(editing, 1);
    withBusy($("#pm"), saveContent("Delete product: " + p.name))
      .then(function () { closeProduct(); renderProducts(); }, function () { content.products.splice(editing, 0, p); });
  });

  /* ---------- reviews ---------- */
  function renderReviews() {
    var t = content.testimonials;
    $("#rlist").innerHTML = t.length ? t.map(function (r, i) {
      return '<li class="ri"><div><p>' + esc(r.text) + "</p><span>" + esc(r.name) + (r.city ? " · " + esc(r.city) : "") + "</span></div>" +
        '<button class="btn btn-ghost sm" type="button" data-del="' + i + '">حذف</button></li>';
    }).join("") : '<li class="empty-row">ما في آراء لسا.</li>';
  }
  $("#revForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var r = { name: $("#rv-name").value.trim(), city: $("#rv-city").value.trim(), text: $("#rv-text").value.trim() };
    if (!r.name || !r.text) return;
    content.testimonials.push(r);
    withBusy(e.target, saveContent("Add review from " + r.name))
      .then(function () { e.target.reset(); renderReviews(); }, function () { content.testimonials.pop(); });
  });
  $("#rlist").addEventListener("click", function (e) {
    var b = e.target.closest("[data-del]");
    if (!b) return;
    if (!b.hasAttribute("data-sure")) { b.setAttribute("data-sure", "1"); b.textContent = "متأكد؟"; return; }
    var i = Number(b.getAttribute("data-del")), r = content.testimonials.splice(i, 1)[0];
    withBusy($("#rlist"), saveContent("Remove review")).then(renderReviews, function () { content.testimonials.splice(i, 0, r); renderReviews(); });
  });

  /* ---------- settings ---------- */
  var FIELDS = ["whatsapp", "instagram", "facebook", "tiktok", "email"];
  function renderSettings() {
    var st = content.settings, c = st.contact;
    $("#st-delivery").value = st.deliveryNote || "";
    $("#st-delivery").placeholder = D.deliveryNote || "مثلًا: التوصيل 20 ₪ داخل الخليل و30 ₪ لباقي المناطق";
    FIELDS.forEach(function (k) { $("#st-" + k).value = c[k] || ""; $("#st-" + k).placeholder = D.contact[k] || ""; });
  }
  $("#setForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var st = content.settings;
    st.deliveryNote = $("#st-delivery").value.trim();
    FIELDS.forEach(function (k) {
      var v = $("#st-" + k).value.trim();
      if (k === "whatsapp") v = v.replace(/\D/g, "");
      st.contact[k] = v;
    });
    withBusy(e.target, saveContent("Update settings")).catch(function () {});
  });

  function renderAll() { renderProducts(); renderReviews(); renderSettings(); }

  /* ---------- start ---------- */
  var saved = null;
  try { saved = sessionStorage.getItem("rm-t"); } catch (er) {}
  if (saved) {
    token = saved;
    enter().catch(function () { token = null; show("#gateLogin"); });
  } else {
    fetchKeyBox().then(function (box) { show(box ? "#gateLogin" : "#gateSetup"); });
  }
})();
