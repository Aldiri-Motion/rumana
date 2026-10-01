# نشر موقع رمانة على rumana.ps

الخطوات اللي تحت بتتعمل من حسابك أنت، لأنه الدومين والاستضافة لازم يكونوا باسمك وبإيدك. كلها مجانية ما عدا حجز الدومين.

## 1. ارفع الموقع على Cloudflare Pages (10 دقايق)
1. افتح https://dash.cloudflare.com/sign-up واعمل حساب مجاني (بإيميل رمانة).
2. من القائمة: **Workers & Pages** ثم **Create** ثم تبويب **Pages** ثم **Upload assets**.
3. اسم المشروع: `rumana` ثم **Create project**.
4. اسحب ملف `rummana-site-upload.zip` (أو المجلد) وافلته، ثم **Deploy site**.
5. بيصير الموقع شغال فورًا على رابط مثل `https://rumana.pages.dev`. جرّبه من جوالك.

## 2. ضيف الدومين لـ Cloudflare
1. من الصفحة الرئيسية بـ Cloudflare: **Add a domain** واكتب `rumana.ps`، واختار الخطة **Free**.
2. Cloudflare بيعطيك **اسمين سيرفرات (Nameservers)** مثل:
   `xxxx.ns.cloudflare.com` و `yyyy.ns.cloudflare.com`
   انسخهم.

## 3. عند الجهة اللي حجزت عندها الدومين
- ابعتلهم الاسمين واطلب يحطوهم كـ **Nameservers** لدومين `rumana.ps` (بدل الافتراضيين).
- إذا ما خلص الحجز لسا، اطلب منهم يحطوهم من البداية.
- التفعيل بياخد من ساعات لـ 24 ساعة. Cloudflare بيبعتلك إيميل لما يصير الدومين **Active**.

## 4. اربط الدومين بالموقع
1. ارجع لـ **Workers & Pages** ثم مشروع `rumana` ثم **Custom domains** ثم **Set up a custom domain**.
2. اكتب `rumana.ps` ثم **Activate domain**.
3. كرر نفس الشي لـ `www.rumana.ps`.
4. شهادة الأمان (https والقفل) بتتفعل لحالها خلال دقايق.

## 5. بعد ما يشتغل
- افتح https://rumana.ps وجرب طلب من السلة.
- سجّل الموقع على Google Search Console (https://search.google.com/search-console) وضيف `https://rumana.ps/sitemap.xml` عشان يطلع بنتائج جوجل.
- حط رابط الموقع بالبايو على إنستغرام وتيك توك وفيسبوك.

## تحديث الموقع لاحقًا
لما تتغير المنتجات أو الأسعار: من مشروع `rumana` بـ Cloudflare ثم **Create deployment** وارفع الملف الجديد. الرابط ما بيتغير.
