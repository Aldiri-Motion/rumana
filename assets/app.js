(function () {
  var D = window.RUMMANA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var ICONS = {
    frame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="6.5" y="6.5" width="11" height="11"/><path d="m6.5 15 3.5-3.5 3 3 2-2 2.5 2.5"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3.5" y="9" width="17" height="11.5" rx="1"/><path d="M2.5 9h19M12 9v11.5M12 9c-1.5-3.5-5.5-4-5.5-1.5S10 9 12 9Zm0 0c1.5-3.5 5.5-4 5.5-1.5S14 9 12 9Z"/></svg>',
    mug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 7h12v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7Z"/><path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c0 1 1 1 1 2M11.5 3.5c0 1 1 1 1 2"/></svg>',
    photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><rect x="6.5" y="5.5" width="11" height="10"/><circle cx="12" cy="10.5" r="2.3"/></svg>',
    favor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 10h14l-1.5 10.5h-11L5 10Z"/><path d="M8.5 10a3.5 3.5 0 0 1 7 0"/><path d="M12 14.2c-.9-1-2.6-.4-2.2 1 .3 1 2.2 2.3 2.2 2.3s1.9-1.3 2.2-2.3c.4-1.4-1.3-2-2.2-1Z"/></svg>',
    sticker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M20 13V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8l7-7Z"/><path d="M13 20v-5a2 2 0 0 1 2-2h5"/><circle cx="9.5" cy="9.5" r="1"/><circle cx="14.5" cy="9.5" r="1"/><path d="M9 13.5c1.5 1.2 3.5 1.2 5 0"/></svg>',
  };

  var WHY = [
    ["🤍", "منتجات مخصصة تحمل معنى وتُصنع خصيصًا لك"],
    ["🎁", "تغليف أنيق يضيف قيمة لكل هدية"],
    ["🔒", "خصوصية وثقة في التعامل مع صوركم وطلباتكم"],
    ["✨", "اهتمام بالتفاصيل ولمسة فنية بتفرق بكل قطعة"],
  ];
  var STEPS = [
    ["🤍", "اختر المنتج المناسب أو احكيلنا فكرتك."],
    ["📩", "ابعتلنا الصور والتفاصيل عبر واتساب."],
    ["🎁", "والباقي علينا... نجهز طلبك بعناية خلال 1-3 أيام."],
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(msg) {
    var n = (D.contact.whatsapp || "").replace(/\D/g, "");
    if (!n && D.contact.whatsappLink) return D.contact.whatsappLink;
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(msg || "مرحبا رمانة 🤍");
  }
  function bindWa(root) {
    $$(".js-wa", root).forEach(function (a) {
      a.href = waLink(a.getAttribute("data-msg"));
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  function catById(id) {
    for (var i = 0; i < D.categories.length; i++) if (D.categories[i].id === id) return D.categories[i];
    return null;
  }

  /* ---------- static fills ---------- */
  function catCard(c, big) {
    return '<a class="cat" href="#' + c.id + '"><span class="cat-ic">' + ICONS[c.icon] + '</span>' +
      '<span class="cat-tx"><h3>' + esc(c.name) + '</h3><p>' + esc(c.blurb) + '</p>' +
      (big ? '<span class="go">تصفّح القسم ←</span>' : "") + "</span></a>";
  }
  $("#homeCats").innerHTML = D.categories.map(function (c) { return catCard(c, false); }).join("");
  $("#allCats").innerHTML = D.categories.map(function (c) { return catCard(c, true); }).join("");
  $("#subNav").innerHTML = D.categories.map(function (c) {
    return '<a href="#' + c.id + '" data-nav="' + c.id + '">' + esc(c.name) + "</a>";
  }).join("");

  $$(".js-why").forEach(function (el) {
    el.innerHTML = WHY.map(function (w) { return '<div class="why"><span class="em" aria-hidden="true">' + w[0] + "</span><p>" + w[1] + "</p></div>"; }).join("");
  });
  $$(".js-steps").forEach(function (el) {
    el.innerHTML = STEPS.map(function (s) { return '<li><span class="em" aria-hidden="true">' + s[0] + "</span><p>" + s[1] + "</p></li>"; }).join("");
  });

  $("#pickups").innerHTML = D.pickupPoints.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");

  // testimonials
  function renderReviews() {
  var rv = $("#reviews");
  if (D.testimonials.length) {
    rv.innerHTML = D.testimonials.map(function (t) {
      return '<figure class="review"><blockquote>' + esc(t.text) + "</blockquote><cite>" + esc(t.name) + (t.city ? " · " + esc(t.city) : "") + "</cite></figure>";
    }).join("");
  } else {
    rv.innerHTML = '<div class="empty"><p>تجارب عملائنا بتنزل هون قريبًا.</p><a class="btn btn-ghost js-wa" data-msg="مرحبا رمانة 🤍 حابب أشارككم تجربتي">شاركنا تجربتك</a></div>';
  }
  bindWa(rv);
  }
  renderReviews();

  // contact
  var C = D.contact;
  var waNum = (C.whatsapp || "").replace(/\D/g, "");
  var items = [
    { em: "📱", t: "واتساب", sub: waNum ? "+" + waNum.replace(/^(\d{3})(\d{3})(\d{3})(\d+)$/, "$1 $2 $3 $4") : (C.whatsappLink ? "راسلنا مباشرة" : "الرقم يُضاف قريبًا"), href: (waNum || C.whatsappLink) ? waLink("مرحبا رمانة 🤍") : "" },
    { em: "📸", t: "إنستغرام", sub: C.instagram ? C.instagram.replace(/^https?:\/\/(www\.)?/, "") : "الرابط يُضاف قريبًا", href: C.instagram },
    { em: "📘", t: "فيسبوك", sub: C.facebook ? "صفحة رمانة على فيسبوك" : "الرابط يُضاف قريبًا", href: C.facebook },
  ];
  if (C.tiktok) items.push({ em: "🎵", t: "تيك توك", sub: C.tiktok.replace(/^https?:\/\/(www\.)?/, ""), href: C.tiktok });
  if (C.email) items.push({ em: "✉️", t: "البريد", sub: C.email, href: "mailto:" + C.email });
  $("#contactList").innerHTML = items.map(function (i) {
    var inner = '<span class="em" aria-hidden="true">' + i.em + "</span><h2>" + i.t + "</h2><span>" + esc(i.sub) + "</span>";
    return i.href ? '<a class="c-card" href="' + esc(i.href) + '" target="_blank" rel="noopener">' + inner + "</a>"
                  : '<div class="c-card off">' + inner + "</div>";
  }).join("");

  $("#yr").textContent = new Date().getFullYear();

  /* ---------- category page ---------- */
  function renderCategory(c) {
    $("#catCrumb").textContent = c.name;
    $("#catTitle").textContent = c.name;
    $("#catBlurb").textContent = c.blurb;
    $("#catCustom").setAttribute("data-msg", "مرحبا رمانة 🤍 عندي فكرة بقسم " + c.name);
    var g = $("#prodGrid");
    if (c.products.length) {
      g.innerHTML = c.products.map(function (p, i) {
        var price = p.price != null && p.price !== "" ? '<span class="price">' + esc(p.price) + " " + D.currency + "</span>" : '<span class="price tbd">السعر حسب الطلب</span>';
        var img = p.img ? '<div class="prod-img"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy"></div>'
                        : '<div class="prod-img ph">' + ICONS[c.icon] + "<span>" + esc(p.name) + "</span></div>";
        return '<article class="prod">' + img + '<div class="prod-body"><h3>' + esc(p.name) + "</h3>" +
          (p.desc ? "<p>" + esc(p.desc) + "</p>" : "") +
          '<div class="prod-foot">' + price + '<button class="btn btn-primary" type="button" data-add="' + esc(pid(c, p, i)) + '">أضف للسلة</button></div></div></article>';
      }).join("");
    } else {
      var s = "";
      for (var i = 0; i < 3; i++) {
        s += '<article class="prod sample"><div class="prod-img ph">' + ICONS[c.icon] + '<span>صورة المنتج</span></div>' +
          '<div class="prod-body"><span class="sample-tag">قريبًا</span><h3>منتجات ' + esc(c.name) + '</h3><p>الصور والأسعار بتنزل قريبًا. بتقدر تطلب هلأ وتحكيلنا شو بدك.</p>' +
          '<div class="prod-foot"><span class="price tbd">السعر قريبًا</span><a class="btn btn-primary js-wa" data-msg="مرحبا رمانة 🤍 بستفسر عن ' + esc(c.name) + '">استفسر</a></div></div></article>';
      }
      g.innerHTML = s;
    }
    $("#otherCats").innerHTML = D.categories.filter(function (o) { return o.id !== c.id; })
      .map(function (o) { return '<a href="#' + o.id + '">' + esc(o.name) + "</a>"; }).join("");
  }

  /* ---------- FAQ ---------- */
  $("#faqList").innerHTML = (D.faq || []).map(function (f) {
    return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
  }).join("");

  /* ---------- customer fields (shared by both forms) ---------- */
  function fieldsHTML(px) {
    var pick = D.pickupPoints.map(function (p) { return "<option>" + esc(p) + "</option>"; }).join("");
    return '' +
      '<div class="field"><label for="' + px + '-name">الاسم <i>*</i></label><input id="' + px + '-name" name="name" autocomplete="name" required></div>' +
      '<div class="field"><label for="' + px + '-phone">رقم الجوال <i>*</i></label><input id="' + px + '-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required placeholder="05X XXX XXXX"></div>' +
      '<fieldset class="field full recv"><legend>طريقة الاستلام</legend>' +
        '<label class="opt"><input type="radio" name="' + px + '-recv" value="delivery" checked> توصيل</label>' +
        '<label class="opt"><input type="radio" name="' + px + '-recv" value="pickup"> نقطة استلام</label></fieldset>' +
      '<div class="field full" data-show="delivery"><label for="' + px + '-addr">المدينة والعنوان <i>*</i></label><input id="' + px + '-addr" name="addr" autocomplete="street-address" placeholder="مثلًا: الخليل، رأس الجورة"></div>' +
      '<div class="field full" data-show="pickup" hidden><label for="' + px + '-pick">نقطة الاستلام</label><select id="' + px + '-pick" name="pick">' + pick + "</select></div>";
  }
  function setupFields(form, px) {
    $(".fields", form).innerHTML = fieldsHTML(px);
    $$('input[name="' + px + '-recv"]', form).forEach(function (r) {
      r.addEventListener("change", function () {
        var v = $('input[name="' + px + '-recv"]:checked', form).value;
        $$("[data-show]", form).forEach(function (el) { el.hidden = el.getAttribute("data-show") !== v; });
      });
    });
  }
  function readCustomer(form, px) {
    var v = function (n) { var el = $("#" + px + "-" + n); return el ? el.value.trim() : ""; };
    var recv = $('input[name="' + px + '-recv"]:checked', form).value;
    var errs = [];
    if (!v("name")) errs.push(px + "-name");
    if (v("phone").replace(/\D/g, "").length < 9) errs.push(px + "-phone");
    if (recv === "delivery" && !v("addr")) errs.push(px + "-addr");
    $$("input,textarea,select", form).forEach(function (el) { el.removeAttribute("aria-invalid"); });
    errs.forEach(function (id) { $("#" + id).setAttribute("aria-invalid", "true"); });
    var lines = [
      "الاسم: " + v("name"),
      "الجوال: " + v("phone"),
      recv === "delivery" ? "الاستلام: توصيل إلى " + v("addr") : "الاستلام: نقطة استلام، " + v("pick"),
    ];
    return { errs: errs, lines: lines };
  }
  function sendWa(text, msgEl) {
    var url = waLink(text);
    if (!(D.contact.whatsapp || "").replace(/\D/g, "")) {
      // short link can't carry a prefilled message: show it to copy
      msgEl.innerHTML = '<span class="copy-box"><b>انسخ رسالتك وابعتها لنا على واتساب:</b><textarea readonly rows="6" id="' + msgEl.id + '-txt"></textarea>' +
        '<span class="form-foot"><button type="button" class="btn btn-ghost" data-copy="' + msgEl.id + '-txt">نسخ الرسالة</button>' +
        '<a class="btn btn-primary" href="' + esc(url) + '" target="_blank" rel="noopener">افتح واتساب</a></span></span>';
      $("#" + msgEl.id + "-txt").value = text;
      return;
    }
    var w = null;
    try { w = window.open(url, "_blank", "noopener"); } catch (e) {}
    msgEl.innerHTML = (w ? "انفتحت محادثة واتساب. إذا ما انفتحت، " : "") +
      '<a href="' + url + '" target="_blank" rel="noopener">اضغط هون لفتح واتساب</a> وأرسل الرسالة.';
  }

  // inquiry form
  var inq = $("#inqForm");
  setupFields(inq, "inq");
  $("#inq-cat").innerHTML = D.categories.map(function (c) { return "<option>" + esc(c.name) + "</option>"; }).join("") + "<option>شي ثاني</option>";
  inq.addEventListener("submit", function (e) {
    e.preventDefault();
    var r = readCustomer(inq, "inq");
    var det = $("#inq-details").value.trim();
    $("#inq-details").toggleAttribute("aria-invalid", !det);
    var msg = $("#inqMsg");
    if (r.errs.length || !det) { msg.textContent = "عبّي الحقول المطلوبة (*) ورقم جوال صحيح."; return; }
    var text = ["مرحبا رمانة 🤍 عندي طلب/استفسار:", "القسم: " + $("#inq-cat").value, "الفكرة: " + det, ""].concat(r.lines).join("\n");
    sendWa(text, msg);
  });

  /* ---------- cart ---------- */
  var KEY = "rummana-cart";
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || "[]") || []; } catch (e) { cart = []; }
  function pid(c, p, i) { return p.id || c.id + "-" + (i + 1); }
  function findProduct(id) {
    for (var a = 0; a < D.categories.length; a++) {
      var c = D.categories[a];
      for (var b = 0; b < c.products.length; b++) if (pid(c, c.products[b], b) === id) return { c: c, p: c.products[b] };
    }
    return null;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  // drop items whose product no longer exists
  function pruneCart() { cart = cart.filter(function (it) { return findProduct(it.id); }); }
  if (!D.sheetId) pruneCart();
  function hasPrice(p) { return p.price != null && p.price !== ""; }

  function renderCart() {
    var n = cart.reduce(function (s, it) { return s + it.qty; }, 0);
    var cc = $("#cartCount");
    cc.textContent = n; cc.hidden = !n;
    $("#cartEmpty").hidden = !!cart.length;
    $("#checkout").hidden = !cart.length;
    var total = 0, tbd = false;
    $("#cartItems").innerHTML = cart.map(function (it) {
      var f = findProduct(it.id), p = f.p;
      if (hasPrice(p)) total += Number(p.price) * it.qty; else tbd = true;
      return '<li class="ci"><div class="ci-tx"><b>' + esc(p.name) + "</b><span>" + esc(f.c.name) +
        (hasPrice(p) ? " · " + esc(p.price) + " " + D.currency : " · السعر حسب الطلب") + "</span></div>" +
        '<div class="qty"><button type="button" data-q="+1" data-id="' + esc(it.id) + '" aria-label="زيادة">+</button><span>' + it.qty +
        '</span><button type="button" data-q="-1" data-id="' + esc(it.id) + '" aria-label="إنقاص">−</button></div></li>';
    }).join("");
    var t = $("#cartTotal");
    t.hidden = !cart.length;
    t.innerHTML = '<div class="row"><span>المجموع</span><b>' + total + " " + D.currency + "</b></div>" +
      (tbd ? '<p class="small">في منتجات سعرها حسب الطلب، بنأكدلك السعر النهائي على واتساب.</p>' : "") +
      '<p class="small">' + (D.deliveryNote ? esc(D.deliveryNote) : "سعر التوصيل بنأكده معك على واتساب.") + "</p>";
    return { total: total, tbd: tbd };
  }
  function toast(html) {
    var el = $("#toast");
    el.innerHTML = html; el.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { el.hidden = true; }, 3500);
  }
  document.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (add) {
      var id = add.getAttribute("data-add");
      var it = cart.filter(function (x) { return x.id === id; })[0];
      if (it) it.qty++; else cart.push({ id: id, qty: 1 });
      save(); renderCart();
      toast('انضاف للسلة 🤍 <button type="button" id="toastOpen">عرض السلة</button>');
      return;
    }
    var cp = e.target.closest("[data-copy]");
    if (cp) {
      var ta = $("#" + cp.getAttribute("data-copy"));
      var done = function () { cp.textContent = "انتسخت ✓"; };
      try { navigator.clipboard.writeText(ta.value).then(done, function () { ta.select(); }); }
      catch (err) { ta.select(); }
      return;
    }
    if (e.target.id === "toastOpen") { openCart(); $("#toast").hidden = true; return; }
    var q = e.target.closest("[data-q]");
    if (q) {
      var qid = q.getAttribute("data-id");
      cart.forEach(function (x) { if (x.id === qid) x.qty += Number(q.getAttribute("data-q")); });
      cart = cart.filter(function (x) { return x.qty > 0; });
      save(); renderCart();
    }
  });
  var drawer = $("#cart"), bg = $("#cartBg");
  function openCart() { drawer.hidden = false; bg.hidden = false; document.body.classList.add("lock"); drawer.focus(); }
  function closeCart() { drawer.hidden = true; bg.hidden = true; document.body.classList.remove("lock"); }
  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  bg.addEventListener("click", closeCart);
  $("#cartBrowse").addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !drawer.hidden) closeCart(); });

  var co = $("#checkout");
  setupFields(co, "co");
  co.addEventListener("submit", function (e) {
    e.preventDefault();
    var r = readCustomer(co, "co"), msg = $("#coMsg");
    if (r.errs.length) { msg.textContent = "عبّي الحقول المطلوبة (*) ورقم جوال صحيح."; return; }
    var sum = renderCart();
    var lines = ["مرحبا رمانة 🤍 بدي أطلب:"];
    cart.forEach(function (it, i) {
      var f = findProduct(it.id);
      lines.push((i + 1) + ") " + f.p.name + " (" + f.c.name + ") × " + it.qty + (hasPrice(f.p) ? " = " + Number(f.p.price) * it.qty + " " + D.currency : ""));
    });
    lines.push("المجموع: " + sum.total + " " + D.currency + (sum.tbd ? " + منتجات سعرها حسب الطلب" : ""), "");
    lines = lines.concat(r.lines);
    var notes = $("#co-notes").value.trim();
    if (notes) lines.push("ملاحظات: " + notes);
    lines.push("", "رح أبعت الصور هون بالمحادثة.");
    sendWa(lines.join("\n"), msg);
  });
  renderCart();

  /* ---------- router (hash) ---------- */
  var PAGES = ["home", "about", "products", "why", "how", "delivery", "reviews", "contact"];
  var nav = $("#mainNav"), btn = $("#menuBtn");
  function route() {
    var h = (location.hash || "#home").slice(1);
    var cat = catById(h);
    var page = cat ? "category" : (PAGES.indexOf(h) > -1 ? h : "home");
    if (cat) renderCategory(cat);
    $$(".page").forEach(function (p) { p.hidden = p.getAttribute("data-page") !== page; });
    $$("[data-nav]").forEach(function (a) {
      var k = a.getAttribute("data-nav");
      a.classList.toggle("on", k === h || k === page || (cat && k === "products"));
    });
    bindWa(document);
    nav.classList.remove("open");
    closeCart();
    btn.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    document.title = (page === "home" ? "رمانة | هدايا تحمل معنى" : ((cat ? cat.name : $('[data-nav="' + page + '"]').textContent) + " | رمانة"));
  }
  btn.addEventListener("click", function () {
    var o = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", o ? "true" : "false");
  });
  window.addEventListener("hashchange", route);
  route();

  /* ---------- Google Sheet (products + reviews edited by the shop owner) ---------- */
  function parseCSV(text) {
    var rows = [], row = [], cell = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) {
        if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
      else if (ch !== "\r") cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }
  function sheetRows(tab) {
    var url = "https://docs.google.com/spreadsheets/d/" + D.sheetId + "/gviz/tq?tqx=out:csv&headers=1&sheet=" + encodeURIComponent(tab);
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (t) {
      var rows = parseCSV(t).filter(function (r) { return r.join("").trim(); });
      var head = (rows.shift() || []).map(function (h) { return h.trim(); });
      return rows.map(function (r) {
        var o = {};
        head.forEach(function (h, i) { o[h] = (r[i] || "").trim(); });
        return o;
      });
    });
  }
  function imgUrl(u) {
    if (!u) return "";
    var m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
    return m ? "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w1000" : u;
  }
  function catByName(n) {
    n = (n || "").trim();
    if (!n) return null;
    for (var i = 0; i < D.categories.length; i++) {
      var c = D.categories[i];
      if (c.name === n || c.id === n || c.name.indexOf(n) === 0) return c;
    }
    return null;
  }
  function refreshAfterSheet() {
    var h = (location.hash || "#home").slice(1), cat = catById(h);
    if (cat) { renderCategory(cat); bindWa($("#prodGrid").parentNode); }
    pruneCart(); save(); renderCart();
  }
  if (D.sheetId) {
    sheetRows("المنتجات").then(function (rows) {
      D.categories.forEach(function (c) { c.products = []; });
      rows.forEach(function (r) {
        var hide = /^(لا|no|مخفي)$/i.test(r["ظاهر"] || "");
        var c = catByName(r["القسم"]);
        if (!c || !r["اسم المنتج"] || hide) return;
        var price = (r["السعر"] || "").replace(/[^\d.]/g, "");
        c.products.push({
          id: c.id + "-" + r["اسم المنتج"],
          name: r["اسم المنتج"], desc: r["الوصف"] || "",
          price: price === "" ? "" : Number(price), img: imgUrl(r["رابط الصورة"]),
        });
      });
      refreshAfterSheet();
    }).catch(function () { pruneCart(); renderCart(); });
    sheetRows("آراء العملاء").then(function (rows) {
      var t = rows.filter(function (r) { return r["الكلام"]; }).map(function (r) { return { name: r["الاسم"], city: r["المدينة"], text: r["الكلام"] }; });
      if (t.length) { D.testimonials = t; renderReviews(); }
    }).catch(function () {});
  }
})();
