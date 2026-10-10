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
    ["🎀", "كل طلب اله تفاصيله، وبنجهزه حسب الشخص والمناسبة."],
    ["🎁", "بنهتم بالتغليف والتقديم، عشان توصلكم الهدية مرتبة وجاهزة."],
    ["🔒", "بنتعامل مع صوركم وطلباتكم بعناية، وبنحافظ على خصوصيتها."],
    ["✨", "من التصميم والطباعة للتجهيز والتغليف، بنهتم بكل مرحلة من الطلب."],
  ];
  var STEPS = [
    ["🤍", "اختار المنتج المناسب أو احكيلنا شو ببالك."],
    ["📩", "ابعتلنا الصور والتفاصيل على واتساب."],
    ["🎁", "والباقي علينا... بنجهز طلبك خلال 1–3 أيام."],
  ];
  // شعارات التطبيقات الرسمية (Simple Icons)
  var BRAND = {
    whatsapp: ["#25D366", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"],
    instagram: ["linear-gradient(45deg,#F58529,#DD2A7B 55%,#8134AF)", "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"],
    facebook: ["#0866FF", "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"],
    tiktok: ["#000000", "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"],
  };
  function brandIcon(k) {
    return '<span class="b-ic" style="background:' + BRAND[k][0] + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="' + BRAND[k][1] + '"/></svg></span>';
  }

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
  // واجهة الرئيسية: مربعات الأقسام (بتعرض صورة القسم إذا موجودة)
  function catImg(c) {
    if (c.img) return c.img;
    for (var i = 0; i < c.products.length; i++) if (c.products[i].img) return c.products[i].img;
    return "";
  }
  function renderHero() {
    $("#heroTiles").innerHTML = D.categories.map(function (c, i) {
      var im = catImg(c);
      return '<a class="tile t' + (i + 1) + (im ? " has-img" : "") + '" href="#' + c.id + '">' +
        (im ? '<img src="' + esc(im) + '" alt="" loading="lazy">' : '<span class="tile-ic" aria-hidden="true">' + ICONS[c.icon] + "</span>") +
        "<b>" + esc(c.name) + "</b></a>";
    }).join("");
  }
  renderHero();
  $("#homeCats").innerHTML = D.categories.map(function (c) { return catCard(c, false); }).join("");
  $("#allCats").innerHTML = D.categories.map(function (c) { return catCard(c, true); }).join("");
  $("#subNav").innerHTML = D.categories.map(function (c) {
    return '<a href="#' + c.id + '" data-nav="' + c.id + '">' + esc(c.name) + "</a>";
  }).join("");

  $$(".js-why").forEach(function (el) {
    el.innerHTML = WHY.map(function (w) { return '<div class="why"><span class="em" aria-hidden="true">' + w[0] + "</span><p>" + w[1] + "</p></div>"; }).join("");
  });
  $$(".js-steps").forEach(function (el) {
    el.innerHTML = STEPS.map(function (s) { return "<li><p>" + s[1] + "</p></li>"; }).join("");
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
  function renderContact() {
  var C = D.contact;
  var waNum = (C.whatsapp || "").replace(/\D/g, "");
  var items = [
    { ic: "whatsapp", t: "واتساب", sub: waNum ? "+" + waNum.replace(/^(\d{3})(\d{3})(\d{3})(\d+)$/, "$1 $2 $3 $4") : (C.whatsappLink ? "راسلنا مباشرة" : "الرقم يُضاف قريبًا"), href: (waNum || C.whatsappLink) ? waLink("مرحبا رمانة 🤍") : "" },
    { ic: "instagram", t: "إنستغرام", sub: C.instagram ? C.instagram.replace(/^https?:\/\/(www\.)?/, "") : "الرابط يُضاف قريبًا", href: C.instagram },
    { ic: "facebook", t: "فيسبوك", sub: C.facebook ? "صفحة رمانة على فيسبوك" : "الرابط يُضاف قريبًا", href: C.facebook },
  ];
  if (C.tiktok) items.push({ ic: "tiktok", t: "تيك توك", sub: C.tiktok.replace(/^https?:\/\/(www\.)?/, ""), href: C.tiktok });
  if (C.email) items.push({ em: "✉️", t: "البريد", sub: C.email, href: "mailto:" + C.email });
  $("#contactList").innerHTML = items.map(function (i) {
    var icon = i.ic ? brandIcon(i.ic) : '<span class="em" aria-hidden="true">' + i.em + "</span>";
    var inner = '<div class="c-top">' + icon + "<h2>" + i.t + "</h2></div><span>" + esc(i.sub) + "</span>";
    return i.href ? '<a class="c-card" href="' + esc(i.href) + '" target="_blank" rel="noopener">' + inner + "</a>"
                  : '<div class="c-card off">' + inner + "</div>";
  }).join("");
  }
  renderContact();

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

  /* ---------- content.json (saved by the admin panel) ---------- */
  function refreshAfterContent() {
    var h = (location.hash || "#home").slice(1), cat = catById(h);
    if (cat) renderCategory(cat);
    renderHero();
    renderContact();
    renderReviews();
    bindWa(document);
    pruneCart(); save(); renderCart();
  }
  fetch("content.json?v=" + Date.now(), { cache: "no-store" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (c) {
      var st = c.settings || {};
      Object.keys(st.contact || {}).forEach(function (k) { if (st.contact[k]) D.contact[k] = st.contact[k]; });
      if (st.deliveryNote) D.deliveryNote = st.deliveryNote;
      if (Array.isArray(c.products) && c.products.length) {
        D.categories.forEach(function (cat) { cat.products = []; });
        c.products.forEach(function (p) {
          var cat = catById(p.cat);
          if (!cat || !p.name || p.hidden) return;
          cat.products.push({ id: p.id, name: p.name, desc: p.desc || "", price: p.price === "" || p.price == null ? "" : Number(p.price), img: p.img || "" });
        });
      }
      if (Array.isArray(c.testimonials) && c.testimonials.length) D.testimonials = c.testimonials;
      refreshAfterContent();
    })
    .catch(function () { pruneCart(); renderCart(); });
})();
