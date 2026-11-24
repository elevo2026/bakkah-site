# Relecture linguistique BAKKAH (AR / EN / FR)

Sources lues (aucune modifiée) : `contenu/i18n.json`, `contenu/produits.json`, `i18n-data.js` (généré), `js/shop.js`, `js/main.js`, `GUIDE-COMMERCANT.md`.

Conventions
- Chemin de clé : `langue.section.clé`, par exemple `ar.cart.items`. Éléments de liste : `ar.faq.items[0].q`.
- Produits : `produits.json > perfumes[id=...]` ou `items[id=...]`.
- Les clés ci-dessous existent dans `i18n.json` sauf mention « JS seulement ». Ces clés (`nav.menu`, `cart.note`, `product.from`, `footer.hours`, `legal.*`, `defaults.*`, etc.) ne figurent que dans `i18n-data.js`. Voir X-01.
- Les JSON ci-dessous sont à copier tels quels. `‎` est le marqueur gauche-droite invisible, à écrire sous cette forme dans le JSON.
- `i18n-data.js` est généré par `contenu/generer.py` : corriger `i18n.json`, puis régénérer.
- Aucun texte en dur dans `shop.js` / `main.js` : tout passe par `T(...)`. Les libellés des réseaux (Instagram, TikTok, Snapchat, Facebook, WhatsApp) sont en dur en latin (`shop.js` ligne 71), ce qui est acceptable.

---

## 0. Les 10 corrections prioritaires (par ordre de priorité)

1. **X-01 / EN-01** `en.meta.currency` vaut `"MAD"` dans `i18n.json` mais `"DH"` dans `i18n-data.js`, et `en.admin.price` affiche « Price (MAD) ». Une régénération ferait revenir MAD sur le site. Mettre `"DH"` et `"Price (DH)"`.
2. **AR-02** Numéro de téléphone cassé en arabe : `671501152 212+` s'affiche avec le « + » du mauvais côté. Nouvelle valeur : `‎+212 671501152‎`.
3. **AR-03** `ar.cart.items` = `"منتج"` donne « 3 منتج », ce qui est faux. Mettre `"منتجات"`.
4. **AR-04** `ar.nav.catalogue` et `ar.sections.catalogue.title` valent `"المتجر"`, comme `ar.nav.boutique`. Trois sens pour un seul mot. Mettre `"الكتالوج"`, comme `ar.hero.cta2`.
5. **AR-06** Tris de prix incomplets : `"السعر من الأقل"` et `"السعر من الأعلى"`. Mettre `"السعر: من الأقل إلى الأعلى"` et `"السعر: من الأعلى إلى الأقل"`.
6. **AR-05** `ar.filters.genderFilter` et `ar.olfactive.gender` valent `"لـ"`, une particule isolée qui ne veut rien dire seule. Mettre `"الفئة"`.
7. **AR-01** `ar.faq.items[0]` : « توصلون » sans voyelles se lit « vous arrivez ». Reformuler avec « التوصيل ».
8. **X-02** Produits non traduits : `items[id=demo-voile-soie].colors` est en français seulement. `size` / `concentration` des parfums sont en français seulement (« 100 ml », « Extrait de parfum »). En AR et EN, le site affichera du français ou du latin.
9. **AR-30 / X-03** `Ana Abiyedh` : le nom arabe `"أنا الأبيض"` est probablement faux (nom officiel « أنا أبيض »). Les variantes EN disent « Red » alors que la description EN dit « Rouge ». Voir le détail plus bas.
10. **AR-07** Message WhatsApp en arabe : « السلام عليكم بكة » se lit comme une salutation tronquée, et « أكدوا لي » est abrupt. Reformuler avec « فريق بكة » et « المرجو ».

Priorité 2 (importantes) : EN-04 (badge « Sample »), EN-02 (« Write to us »), X-04 (CGU contre CGV), FR-02 (« taille et hauteur »), AR-11 (« السعر عند الطلب »), EN-03 (« Stay in the trail »), AR-14 (« الاتجاهات »), P-01 (description de Philos Messenger qui décrit le flacon).

---

## 1. ARABE (38 corrections)

### 1.1 Grammaire, sens, ponctuation, chiffres

**AR-01** `ar.faq.items[0].q` et `.a`
- Actuel : `"هل توصلون إلى جميع مدن المغرب؟"` / `"نعم، نوصل إلى جميع مدن المغرب. …"`
- Proposé :
  - q : `"هل تقومون بالتوصيل إلى جميع مدن المغرب؟"`
  - a : `"نعم، نقوم بالتوصيل إلى جميع مدن المغرب. أخبرنا بمدينتك عند الطلب عبر واتساب وسنؤكد لك تفاصيل التوصيل."`
- Raison : sans voyelles, « توصل / توصلون » est ambigu (« arriver » ou « livrer »). Une formulation avec « التوصيل » est claire, sans tashkil.

**AR-02** `ar.faq.items[9].a`
- Actuel : `"… على الرقم 671501152 212+ لمعرفة …"`
- Proposé : `"راسلنا عبر واتساب على الرقم ‎+212 671501152‎ لمعرفة أوقات العمل والعنوان. كما يتوفر رابط الطريق على الموقع."`
- Raison : en texte RTL, le « + » passe à la fin du nombre. Le marqueur LRM de part et d'autre garde l'ordre +212 671501152. Même risque dans tout texte arabe contenant un numéro (à vérifier aussi côté pied de page et téléphone dans `S.telephone`).

**AR-03** `ar.cart.items`
- Actuel : `"منتج"` ; proposé : `"منتجات"`.
- Raison : « 3 منتج » est agrammatical. « منتجات » est acceptable pour 1 comme pour 3. Si un pluriel exact est souhaité, le développeur peut ajouter une règle (1 : « منتج », 2 : « منتجان », 3 à 10 : « منتجات »).

**AR-05** `ar.filters.genderFilter` et `ar.olfactive.gender`
- Actuel : `"لـ"` ; proposé : `"الفئة"`.
- Raison : la particule isolée (avec tatweel) s'affiche comme un fragment (« لـ : رجالي »). « الفئة » est naturel avec رجالي / نسائي / للجنسين.

**AR-06** `ar.filters.priceAsc` et `ar.filters.priceDesc`
- Actuel : `"السعر من الأقل"` / `"السعر من الأعلى"`.
- Proposé : `"السعر: من الأقل إلى الأعلى"` / `"السعر: من الأعلى إلى الأقل"`.
- Raison : phrases incomplètes ; on ne sait pas ce qui va vers quoi.

**AR-09** `ar.cart.totalToConfirm`
- Actuel : `"يؤكَّد عبر واتساب"` ; proposé : `"سيتم تأكيده عبر واتساب"`.
- Raison : tashkil partiel et incorrect (il manque la damma du ي). La formulation sans voyelles est plus naturelle.

**AR-10** `ar.cart.paymentNote`
- Actuel : `"الدفع عند الاستلام حسب التوفر، ويؤكَّد خلال المحادثة عبر واتساب."`
- Proposé : `"الدفع عند الاستلام حسب التوفر، ويتم تأكيده خلال المحادثة عبر واتساب."`
- Raison : même point que AR-09.

**AR-15** `ar.faq.items[4].a`
- Actuel : `"… في غلافه الأصلي، وتُوضَّح لك الشروط التفصيلية عند الطلب."`
- Proposé : `"تواصل معنا عبر واتساب في أقرب وقت بعد الاستلام. يمكن استبدال المنتج غير المستعمل في عبوته الأصلية، ونوضّح لك الشروط التفصيلية عند الطلب."`
- Raison : « غلاف » veut dire « couverture ». « عبوة » est le mot pour l'emballage. Supprime aussi un tashkil lourd.

**AR-16** `ar.faq.items[5].a`
- Actuel : `"احفظه بعيدًا عن الضوء والحرارة والرطوبة، ويفضّل في علبته الأصلية. وتجنّب الحمّام والسيارة ليدوم أريجه أطول."`
- Proposé : `"احفظه بعيدًا عن الضوء والحرارة والرطوبة، ويُفضَّل أن يبقى في علبته الأصلية. وتجنّب الحمّام والسيارة ليدوم أريجه مدة أطول."`
- Raison : « ويفضّل في علبته » est elliptique ; « أطول » seul est fautif sans « مدة ».

**AR-17** `ar.faq.items[6].a`
- Actuel : `"… لنرشدك إلى القصّة الأنسب."` ; proposé : `"… لنرشدك إلى المقاس الأنسب."`
- Raison : « القصّة » peut se lire « l'histoire ». Ici la question porte sur la taille.

**AR-18** `ar.faq.items[7].a`
- Actuel : `"… ستُفتح رسالة ملخّصة جاهزة للإرسال، ثم نؤكد طلبك معك."`
- Proposé : `"أضف منتجاتك إلى السلة ثم اضغط على «اطلب عبر واتساب». ستُفتح رسالة جاهزة للإرسال تتضمن ملخص طلبك، ثم نؤكد الطلب معك."`
- Raison : « رسالة ملخّصة » veut dire « message résumé », pas « message récapitulatif ».

**AR-19** `ar.commitments.c2.text`
- Actuel : `"نختار ماء عطر مركّزًا بفوحان سخي، يرافقك من الصباح حتى المساء."`
- Proposé : `"نختار عطورًا مركّزة من فئة ماء العطر، بأثر سخي يرافقك من الصباح حتى المساء."`
- Raison : « ماء عطر » sans article est ambigu. « أثر » correspond à « sillage » (déjà utilisé dans `ar.profile.bg2`). « فوحان » est un registre plus rare.

**AR-21** `ar.commitments.c1.text`
- Actuel : `"كل زجاجة مختارة …"` ; proposé : `"كل قارورة مختارة …"`
- Raison : cohérence avec `ar.a11y.canvas` (« قوارير ») et vocabulaire du parfum.

**AR-08** `ar.whatsapp.generalMessage`
- Actuel : `"السلام عليكم بكة، أرغب في الحصول على نصيحة."`
- Proposé : `"السلام عليكم فريق بكة، أرغب في الحصول على نصيحة لاختيار عطر."`
- Raison : même problème de salutation que AR-07. « نصيحة » seul est vague.

**AR-07** `ar.whatsapp.orderTemplate`
- Actuel : `"السلام عليكم بكة، أرغب في تقديم طلب:\n\n{articles}\n\nالمجموع: {total}\n\nالاسم: {nom}\nالعنوان: {adresse}\n\nمن فضلكم أكدوا لي التوفر والتوصيل."`
- Proposé : `"السلام عليكم فريق بكة، أرغب في تقديم طلب:\n\n{articles}\n\nالمجموع: {total}\n\nالاسم: {nom}\nالعنوان: {adresse}\n\nالمرجو تأكيد التوفر والتوصيل."`
- Raison : « المرجو » est la formule de politesse courante au Maroc. Ne pas toucher aux variables `{…}`.

**AR-34** `produits.json > perfumes[id=ateeq].description.ar`
- Actuel : `"… يدوم طويلاً."` ; proposé : `"… يدوم طويلًا."`
- Raison : graphie du tanwin incohérente (le reste du site écrit ـًا : « عطورًا », « تقييمًا »).

### 1.2 Formulations peu naturelles ou ambiguës

**AR-04** `ar.nav.catalogue` et `ar.sections.catalogue.title`
- Actuel : `"المتجر"` ; proposé : `"الكتالوج"` (alternative : `"مجموعتنا"`).
- Raison : « المتجر » désigne déjà `ar.nav.boutique` (la boutique physique). Le catalogue doit rester distinct, comme dans `ar.hero.cta2` (« تصفح الكتالوج »).

**AR-11** `ar.cart.priceOnRequest` et `ar.product.priceNull`
- Actuel : `"السعر عند الطلب"` ; proposé : `"السعر عند الاستفسار"`.
- Raison : « عند الطلب » se lit « à la commande ». « Prix sur demande » = « على الاستفسار ».

**AR-12** `ar.commitments.c1.title`
- Actuel : `"أصلي وفقط"` ; proposé : `"أصلي، دون سواه"`.
- Raison : « وفقط » est un calque peu naturel de « rien d'autre ».

**AR-20** `ar.commitments.c4.crossed`
- Actuel : `"شراء بلا استشارة"` ; proposé : `"شراء عشوائي"`.
- Raison : correspond mieux à « achat à l'aveugle ». « استشارة » donne l'idée d'un service payant.

**AR-13** `ar.meta.description`
- Actuel : `"… وعود وصناديق هدايا. …"` ; proposé : `"بكة، متجر فاخر في المغرب: عطور أصلية وعبايات وقمصان وعود وعلب هدايا. اطلب بسهولة عبر واتساب."`
- Raison : « علب هدايا » partout ailleurs (`ar.footer.about`, catégories). Une seule expression.

**AR-14** `ar.buttons.viewOnMap`, `ar.sections.visit.cta`
- Actuel : `"الاتجاهات"` / `"الاتجاهات على الخرائط"`.
- Proposé : `"كيفية الوصول"` / `"الطريق على خرائط Google"`.
- Raison : « الاتجاهات » veut dire « les directions » (cardinales). C'est un calque du bouton Google anglais.

**AR-22** Newsletter
- `ar.sections.newsletter.title` et `ar.newsletter.title` : actuel `"ابقَ على أثر العطر"` ; proposé `"ابقَ في أثر العطر"`.
- `ar.newsletter.text` : actuel `"توصّل بالجديد والعروض الخاصة."` ; proposé `"تابع جديدنا وعروضنا الخاصة."`.
- `ar.sections.newsletter.subtitle` : actuel `"المنتجات الجديدة والعروض الخاصة تصلك مباشرة إلى بريدك."` ; proposé `"المنتجات الجديدة وآخر الوصولات والعروض الخاصة تصلك مباشرة إلى بريدك الإلكتروني."`.
- Raison : « على أثر » veut dire « sur les traces de » ; « في أثر » rend mieux « dans le sillage ». « توصّل بـ » est un gallicisme. Le sous-titre arabe omet « arrivages » présent en FR et EN.

**AR-23** `ar.olfactive.brand`, `ar.filters.brandFilter`, `ar.admin.brand`
- Actuel : `"العلامة"` ; proposé : `"العلامة التجارية"`.
- Raison : « العلامة » seul veut dire « le signe / la note ».

**AR-24** `ar.buttons.resetFilters`, `ar.buttons.remove`
- Actuel : `"إعادة الضبط"` / `"حذف"` ; proposé : `"إعادة تعيين"` / `"إزالة"`.
- Raison : « إعادة تعيين » est le terme usuel ; « إزالة » est plus doux que « حذف » pour un panier (FR « Retirer »).

**AR-25** `ar.sections.reviews.title`
- Actuel : `"ثقة عملائنا"` ; proposé : `"عملاؤنا يثقون بنا"`.
- Raison : l'actuel se lit comme un nom abstrait (« la confiance de nos clients »).

**AR-29** `ar.product.outOfStock`
- Actuel : `"نفد المخزون"` ; proposé : `"نفدت الكمية"`.
- Raison : la phrase dit que tout le stock de la boutique est épuisé. Il s'agit d'un article.

**AR-36** `ar.olfactive.top` / `heart` / `base`
- Actuel : `"النفحات العليا"` / `"نفحات القلب"` / `"نفحات القاعدة"`.
- Proposé : `"نفحات الافتتاح"` / `"نفحات القلب"` / `"نفحات القاعدة"`.
- Raison : parallélisme des trois libellés (priorité basse).

**AR-37** `ar.filters.featured`
- Actuel : `"المميز"` ; proposé : `"الأبرز"`.
- Raison : forme masculine générique peu naturelle dans « ترتيب حسب : المميز » (priorité basse).

**AR-26** `ar.defaults.hours`
- Actuel : `"الإثنين–السبت 10ص–9م"`.
- Proposé : `"من الاثنين إلى السبت، 10:00 – 21:00"`.
- Raison : « الاثنين » s'écrit sans hamza. Le format 24 h est plus lisible au Maroc (FR : « 10h–21h »).

**AR-27** Mentions légales et CGV
- `ar.footer.terms` : actuel `"شروط الاستخدام"` ; proposé `"الشروط العامة للبيع"` (voir X-04).
- `ar.legal.mentions` : actuel `"الإشعارات القانونية: تُستكمل من طرف المتجر (الاسم التجاري، العنوان، رقم التسجيل، وسيلة التواصل)."` ; proposé `"الإشعار القانوني: يستكمله المتجر (الاسم التجاري، العنوان، السجل التجاري، رقم التعريف الموحد للمقاولة ICE، وسيلة التواصل)."`.
- `ar.legal.cgu` : remplacer « الأداء » par « الدفع ». Proposé : `"الشروط العامة للبيع: يستكملها المتجر (الطلب عبر واتساب، الدفع، التوصيل، الإرجاع)."`.
- Raison : « الإشعار » (singulier) doit correspondre à `ar.footer.legal`. « الأداء » est un mot technique inutile ici. L'ICE est l'identifiant légal marocain.

**AR-28** Espace vendeur
- `ar.admin.priceMissing` : actuel `"السعر يجب إدخاله"` ; proposé `"يجب إدخال السعر"`.
- `ar.admin.gender` : actuel `"الجنس"` ; proposé `"الفئة"`.
- `ar.admin.confirmDelete` : actuel `"هل تريد فعلًا حذف هذا المنتج؟"` ; proposé `"هل أنت متأكد من حذف هذا المنتج؟"`.
- `ar.admin.title` : actuel `"فضاء البائع"` ; proposé `"مساحة البائع"`.
- Raison : ordre des mots naturel ; « الجنس » veut dire « le sexe » ; « فضاء » est un gallicisme (« espace »).

### 1.3 Contenu produit en arabe

**AR-30** `produits.json > perfumes[id=ana-abiyedh]`
- `name.ar` : actuel `"أنا الأبيض"` ; proposé `"أنا أبيض"`.
- Raison : le nom officiel Lattafa s'écrit « أنا أبيض » (sans article). À faire valider par le commerçant, car le parfum est classé « femme » (la forme « بيضاء » serait grammaticalement attendue).
- `description.ar` : actuel `"بصمة من لطافة بثلاث نسخ: أحمر وبودري وأبيض …"` ; proposé `"بصمة من لطافة (Lattafa) بثلاث نسخ: أحمر وبودري وأبيض، لتختار مزاجك بين الكثافة والرقة والإشراق."`.
- Raison : sans la forme latine, « لطافة » peut se lire « délicatesse ». Le client voit « Lattafa » sur la boîte.

**AR-31** `produits.json > perfumes[id=officer].description.ar`
- Actuel : `"عطر عطري راقٍ بلمسة شهية: …"`
- Proposé : `"عطر من الفصيلة العطرية (أروماتيك) راقٍ بلمسة شهية: إشراقة الحمضيات ونعومة اللافندر، ثم قاعدة عنبرية خشبية دافئة بحضور لافت."`
- Raison : « عطر عطري » est une tautologie ; « أروماتيك » désigne la famille olfactive.

**AR-32** Cèdre = « أرز » (ambigu avec « riz »)
- `produits.json > perfumes[id=asad-elixir].notes.heart.ar[1]` : `"أرز"` devient `"خشب الأرز"`.
- `produits.json > perfumes[id=najdia].notes.heart.ar[1]` : `"أرز"` devient `"خشب الأرز"`.
- Raison : « أرز » signifie aussi « riz ». « خشب الأرز » est sans ambiguïté.

**AR-33** `produits.json > perfumes[id=philos-messenger].description.ar` (voir P-01)
- Actuel : `"ماء عطر سعة 100 مل بمظهر هادئ وراقٍ، بالأخضر العميق المطعّم بالأبيض والذهبي."`
- Proposé (notes provisoires) : `"ماء عطر منعش بنفحات مائية: برغموت وجريب فروت وتفاح، قلب من الورد والياسمين، وقاعدة من المسك وخشب الصندل."`
- Raison : la description actuelle parle du flacon, pas du parfum. Voir P-01.

**AR-35** Articles de démonstration (`items[...]`)
- `demo-abaya-taupe` `name.ar` : actuel `"عباية رمادية بنية ساتان"` ; proposé `"عباية ساتان بلون التاوب"`. Raison : l'actuel est une suite de mots sans lien.
- `demo-montre-or` `name.ar` : actuel `"ساعة ذهبية بميناء أسود"` ; proposé `"ساعة ذهبية بواجهة سوداء"`. Raison : « ميناء » signifie « port » dans le langage courant.
- `demo-qamis-blanc` / `demo-qamis-noir` et `ar.categories.qamis` : « قميص » veut dire « chemise » pour un client marocain. Proposé : `ar.categories.qamis` = `"القمصان الرجالية"` ; `demo-qamis-blanc` `name.ar` = `"قميص رجالي أبيض كلاسيكي"` (même logique pour le noir). À valider : si le commerçant veut le thobe/qamis long, ajouter « طويل ».
- `demo-bakhouriya-pliable` : le « bouton pliable » (FR « bouton se plie ») n'est pas clair. Faire préciser par le client avant de corriger les trois langues.

**AR-38** Tasbih : `items[id=demo-tasbih-bois].description` : FR « glands soyeux » (pluriel) contre AR « شرّابة » (singulier). Proposé FR : `"33 perles polies, gland soyeux."` ; EN : `"33 polished beads with a silky tassel."` ; AR inchangé.

### 1.4 Translittérations des noms

| Nom | Arabe actuel | Verdict |
|---|---|---|
| Officer | أوفيسر | Correct. |
| Asad Elixir | أسد إليكسير | Correct (« أسد » = lion, cohérent avec la description). |
| Nudo Green Iris | نودو غرين آيريس | Correct. Variante acceptable : « أيريس ». |
| Najdia | نجدية | Correct (graphie officielle). |
| Launo Intense Blue | لانو إنتنس بلو | Correct. |
| Ana Abiyedh | أنا الأبيض | À corriger : `"أنا أبيض"` (AR-30). |
| Philos Messenger | فيلوس ميسنجر | Correct. |
| Ateeq | عتيق | Correct. |
| Sehr Lattafa | سحر لطافة | Correct. |
| Glacier Bella | غلاسيير بيلا | Acceptable. Alternative plus proche du français : « غلاسييه بيلا ». À garder si la marque est connue sous la graphie actuelle. |

Remarque : `main.js` / `scene.js` séparent le nom au premier mot pour le titre. En arabe, « سحر لطافة » donne « سحر » + « لطافة » : cohérent. « أنا أبيض » donnerait « أنا » + « أبيض » : acceptable.

---

## 2. ANGLAIS (14 corrections)

**EN-01** Devise
- `en.meta.currency` : actuel `"MAD"` ; proposé `"DH"` (valeur déjà présente dans `i18n-data.js`).
- `en.admin.price` : actuel `"Price (MAD)"` ; proposé `"Price (DH)"`.
- Raison : le site affiche partout « DH ». MAD n'apparaît qu'ici.

**EN-02** `en.buttons.contactUs`
- Actuel : `"Write to us"` ; proposé : `"Message us"`.
- Raison : « Write to us » est un calque de « Nous écrire ». Cohérent avec `en.commitments.c4.text` (« Message us on WhatsApp »).

**EN-03** Newsletter
- `en.sections.newsletter.title` et `en.newsletter.title` : actuel `"Stay in the trail"` ; proposé `"Stay close to the scent"`.
- Raison : calque de « Restez dans le sillage », qui ne veut rien dire en anglais.

**EN-04** `en.product.demoBadge`
- Actuel : `"Sample"` ; proposé : `"Example"`.
- Raison : dans une parfumerie, « sample » désigne un échantillon (gratuit). Le badge signale un article d'exemple.

**EN-05** Engagements
- `en.commitments.c3.title` : actuel `"A gift box"` ; proposé `"Gift-ready"`.
- `en.commitments.c3.text` : actuel `"Every order can arrive in a refined black and gold case, ready to give and to be remembered."` ; proposé `"Every order can arrive in a refined black and gold case, ready to give and impossible to forget."`.
- `en.commitments.c2.crossed` : actuel `"Weak longevity"` ; proposé `"Short-lived scent"`.
- Raison : ton luxe plus naturel et plus concret.

**EN-06** `en.hero.subtitle`
- Actuel : `"Authentic fragrances, carefully chosen pieces and gift boxes made to be given."`
- Proposé : `"Authentic fragrances, carefully chosen pieces and gift boxes designed for giving."`
- Raison : « made to be given » est maladroit.

**EN-07** `en.sections.featured.subtitle`
- Actuel : `"Six signatures to discover, one turn at a time."`
- Proposé : `"Six signature fragrances to discover, one by one."`
- Raison : « one turn at a time » est un calque du français « faire tourner du regard » (carrousel 3D). Hors contexte, ça ne s'entend pas.

**EN-08** `en.filters.incenseBurners`
- Actuel : `"Bakhoor burners (incense)"` ; proposé : `"Bakhoor burners"`.
- Raison : la parenthèse « (incense) » est redondante. À rapprocher de `en.items` : « Bakhoor burner with foldable button ».

**EN-09** `en.categories.packs` et casse des catégories
- Actuel : `"Sets & Gift Boxes"` ; proposé : `"Gift Sets"`.
- Casse : `categories` est en Title Case (« Prayer Mats & Tasbih ») mais `filters` est en casse de phrase (« Prayer mats »). Harmoniser en Title Case (style luxe) : `"Prayer Mats & Tasbih"`, `"Oud & Bakhoor"`, `"Abayas & Veils"` (déjà conformes) ; `filters.prayerMats` = `"Prayer Mats"` ou tout en casse de phrase, au choix, mais un seul style.

**EN-10** `en.sections.visit.cta`
- Actuel : `"Directions on Maps"` ; proposé : `"Directions on Google Maps"`.

**EN-11** `en.sections.reviews.title`
- Actuel : `"Trusted by our clients"` ; proposé : `"Trusted by our customers"`.
- Raison : « clients » est acceptable, mais « customers » est plus naturel pour une boutique en ligne (priorité basse).

**EN-12** `en.footer.terms`
- Actuel : `"Terms of use"` ; proposé : `"Terms of sale"` (voir X-04).

**EN-13** `produits.json > perfumes[id=sehr-lattafa].description.en`
- Actuel : `"… red fruits and saffron up top, …"` ; proposé : `"A bewitching oriental: red fruits and saffron in the opening, a heart of rose and vanilla, and a base of oud, amber and musk."`
- Raison : « up top » est trop familier pour un ton luxe.

**EN-14** `produits.json > perfumes[id=ana-abiyedh].variants` (voir X-03)
- `variants[id=rouge].name.en` : actuel `"Red"` ; proposé `"Rouge"`.
- `variants[id=poudree].name.en` : actuel `"Powdery"` ; proposé `"Poudrée"`.
- Raison : la description EN dit « Rouge, Powdery and White » alors que les variantes disent « Red ». Garder les noms officiels du flacon, ou aligner la description sur les variantes.

Points OK en anglais : tous les textes FAQ, panier, WhatsApp, formulaires. Orthographe britannique cohérente (catalogue, favourites, personalised). Pas de calque français supplémentaire détecté.

---

## 3. FRANÇAIS (11 corrections)

**FR-01** `fr.sections.featured.subtitle`
- Actuel : `"Six signatures à découvrir, à faire tourner du regard."` ; proposé : `"Six signatures à découvrir, l'une après l'autre."`
- Raison : la formule « à faire tourner du regard » est obscure. Le reste de la phrase est clair.

**FR-02** `fr.faq.items[6].a`
- Actuel : `"… envoyez-nous votre taille et votre hauteur sur WhatsApp : …"`
- Proposé : `"Chaque fiche indique les tailles disponibles. En cas de doute, envoyez-nous votre taille habituelle et votre hauteur sur WhatsApp : nous vous conseillons la coupe la plus juste."`
- Raison : en français, « taille » veut dire aussi « hauteur ». « Taille habituelle » (S/M/L) lève l'ambiguïté.

**FR-03** `fr.footer.terms`
- Actuel : `"Conditions générales d'utilisation"` ; proposé : `"Conditions générales de vente"`.
- Raison : voir X-04 (`fr.legal.cgu` dit « Conditions générales de vente »).

**FR-04** `fr.filters.incenseBurners`
- Actuel : `"Bakhouriyat (brûle-encens)"` ; proposé : `"Bakhouriyas (brûle-encens)"`.
- Raison : « Bakhouriyat » est le pluriel arabe. En français, on ajoute un « s » (voir aussi l'article « Bakhouriya à bouton pliable »).

**FR-05** Casse et esperluette des catégories
- `fr.categories.packs` : `"Packs & Coffrets"` devient `"Packs et coffrets"`.
- `fr.categories.abayas` : `"Abayas & Voiles"` devient `"Abayas et voiles"`.
- `fr.categories.prayer` : `"Tapis de prière & Tasbih"` devient `"Tapis de prière et tasbih"`.
- `fr.categories.oud` : `"Oud & Bakhour"` devient `"Oud et bakhour"`.
- Raison : en français, seul le premier mot prend la majuscule (« Packs et coffrets »). Les majuscules internes sont un usage anglo-saxon. Garder « & » est toléré en titre de menu court ; choisir un style et l'appliquer à toutes les catégories.

**FR-06** `fr.legal.mentions`
- Actuel : `"… (raison sociale, adresse, numéro d'immatriculation, contact)."`
- Proposé : `"Mentions légales : à compléter par la boutique (raison sociale, adresse, RC, ICE, contact)."`
- Raison : au Maroc, les identifiants légaux sont le RC et l'ICE.

**FR-07** Espaces insécables
- Partout où une espace précède `:`, `?`, `!`, `;` ou entoure `« »` (p. ex. `fr.faq.items[*].q`, `fr.whatsapp.orderTemplate`, `fr.faq.items[7].a`), utiliser une espace insécable (U+00A0). Idéalement faire la substitution dans `generer.py` plutôt que dans le JSON.
- Raison : éviter qu'un « ? » tombe seul en début de ligne sur mobile.

**FR-08** `fr.footer.copyright` (optionnel)
- Année « 2026 » codée en dur : prévoir un remplacement automatique par le développeur.

**FR-09** `produits.json > perfumes[id=ana-abiyedh].variants[id=white].name.fr`
- Actuel : `"White"` ; à confirmer. Les deux autres variantes sont en français (« Rouge », « Poudrée »). Proposé : `"Blanche"`, sauf si « White » est le nom officiel sur le flacon (alors le garder dans les trois langues).

**FR-10** Philos Messenger et tasbih (voir P-01 et AR-38)
- `perfumes[id=philos-messenger].description.fr` : voir P-01.
- `items[id=demo-tasbih-bois].description.fr` : `"33 perles polies, gland soyeux."`

**FR-11** `GUIDE-COMMERCANT.md`, dernier paragraphe
- Actuel : `"… remplacez-les dans l'administration (Articles, Liens, Réglages, Images)."`
- Proposé : `"… remplacez-les dans l'administration (Articles, Liens & contact, Logo & photos, Textes & FAQ)."`
- Raison : les onglets « Réglages » et « Images » n'existent pas dans la liste des onglets du guide. Ne pas modifier le guide sans accord de la technique ; à transmettre.

Points conformes : « Prix sur demande » (`cart.priceOnRequest`, `product.priceNull`, guide) est cohérent. « DH » est cohérent. Vouvoiement respecté partout (seule exception acceptable : le bouton « Poursuivre mes achats »). Majuscules des titres de section cohérentes.

---

## 4. COHÉRENCE ENTRE LES TROIS LANGUES

**X-01** `i18n.json` est en retard sur `i18n-data.js`
- Clés présentes seulement dans `i18n-data.js` : `nav.menu`, `nav.boutique`, `cart.waUnset`, `cart.note`, `hero.cta2`, `product.from`, `product.choose`, `product.noitem`, `product.variant`, `footer.toTop`, `footer.hours`, `footer.address`, et les blocs entiers `sound`, `profile`, `defaults`, `boutique`, `a11y`, `legal`.
- Valeur divergente : `en.meta.currency` (MAD contre DH).
- Si `generer.py` régénère `i18n-data.js` depuis `i18n.json` seul, ces clés disparaîtront. Vérifier `generer.py` : y ajouter ces clés (FR / EN / AR identiques à celles de `i18n-data.js`) avant toute régénération, avec les corrections ci-dessus.

**X-02** Données produit en français seulement
- `items[id=demo-voile-soie].colors` : `["noir","ivoire","beige"]`. Proposé, si le format l'accepte : `[{"fr":"noir","en":"black","ar":"أسود"},{"fr":"ivoire","en":"ivory","ar":"عاجي"},{"fr":"beige","en":"beige","ar":"بيج"}]`.
- `perfumes[*].size` (« 90 ml », « 100 ml ») : en arabe, afficher `"100 مل"` (le guide donne cet exemple pour les variantes).
- `perfumes[id=ateeq].concentration` : `"Extrait de parfum"` n'a pas de version EN (`"Extrait de parfum"` est acceptable) ni AR (proposé : `"خلاصة العطر"`). `"EDP"` peut rester.
- `perfumes[*].brand` (Cyrus Parfums, Lattafa, Fragrance World, Nusuk, Maison Alhambra) : marques, à garder en latin. OK.
- Donc à confirmer par la technique : comment ces champs sont rendus en AR/EN. Si le rendu est brut, du français ou du latin apparaîtra dans la fiche arabe.

**X-03** Variantes Ana Abiyedh
- FR « Rouge / Poudrée / White » ; EN variantes « Red / Powdery / White » mais description EN « Rouge, Powdery and White » ; AR « أحمر / بودري / أبيض ». Aligner (voir EN-14, FR-09). Choisir une règle : noms officiels du flacon dans les trois langues, ou traduction complète dans les trois.

**X-04** Conditions générales
- `footer.terms` : FR « Conditions générales d'utilisation », EN « Terms of use », AR « شروط الاستخدام ».
- `legal.cgu` : FR « Conditions générales de vente », EN « Terms of sale », AR « الشروط العامة للبيع ».
- Pour un site de vente, aligner `footer.terms` sur les conditions de vente dans les trois langues (FR-03, EN-12, AR-27).

**X-05** Chiffre « six » codé en dur
- `sections.featured.subtitle` (FR « Six », EN « Six », AR « ست ») : la page affiche autant de parfums que choisis dans l'admin (6 recommandés). Si ce nombre change, le texte ment. Proposé : retirer le nombre (« Nos signatures à découvrir »), ou le calculer.

**X-06** Ville
- `cart.city` existe (« Ville (facultatif) ») dans les trois langues, mais `whatsapp.orderTemplate` n'a que `{nom}` et `{adresse}`. La technique doit vérifier que la ville est ajoutée à l'adresse dans le message. Sinon le champ est collecté mais perdu.

**X-07** Textes présents dans les trois langues : OK
- Les 10 questions FAQ sont présentes et alignées en FR / EN / AR (même numéro de téléphone, mêmes conditions).
- Tous les articles de `produits.json` ont `name` et `description` en fr / en / ar. Aucun texte français n'est resté dans EN ou AR, hors X-02.
- Les notes olfactives (top / heart / base) sont présentes en trois langues pour les 10 parfums.
- Devise : FR/EN « DH », AR « درهم » (cohérent, hors EN-01).

**X-08** Prix et promos
- `GUIDE-COMMERCANT.md` indique « DH » en FR et EN, « درهم » en AR : conforme à `fmt()` dans `data.js`. Vérifier que l'espace entre le nombre et la devise est bien une espace insécable (le commentaire de `data.js` ligne 163 l'annonce, mais le code affiche une espace normale). À contrôler avec la technique : sinon « 1 250 / DH » peut se couper sur deux lignes.

**X-09** Statut du badge « Offre » / « Promo »
- FR « Promo », EN « Offer », AR « عرض » : sens équivalents. Catégorie FR « Promos », EN « Offers », AR « العروض ». OK.

**X-10** Prefix « Offre : »
- `items[id=demo-promo-*].name.fr` : `"Offre : parfum + bakhour"` (espace avant « : » : correct en français). EN `"Offer: perfume + bakhoor"`, AR `"عرض: عطر + بخور"` : conformes à la typographie de chaque langue.

### P-01 Description de Philos Messenger (toutes langues)
- `perfumes[id=philos-messenger].description.fr` / `.en` / `.ar` décrivent le flacon (vert profond, blanc et or) et non l'odeur. `notes.*` sont en revanche renseignées (provisoires).
- Proposé FR : `"Une eau de parfum de 100 ml, fraîche et aquatique : bergamote, pamplemousse et pomme, un cœur de rose et de jasmin, puis un fond de musc et de bois de santal."`
- Proposé EN : `"A fresh, aquatic 100 ml eau de parfum: bergamot, grapefruit and apple, a heart of rose and jasmine, settling into musk and sandalwood."`
- Proposé AR : voir AR-33.
- À valider avec le commerçant, car les notes de ce parfum sont provisoires (`provisional: true`).

---

## 5. Décompte

| Langue | Corrections proposées |
|---|---|
| Arabe | 38 (AR-01 à AR-38) |
| Anglais | 14 (EN-01 à EN-14) |
| Français | 11 (FR-01 à FR-11) |
| Cohérence inter-langues | 10 (X-01 à X-10) + 1 (P-01) |
| **Total** | **74** |

Les 10 translittérations ont été relues : 1 à corriger (Ana Abiyedh), 1 optionnelle (Glacier Bella), 8 correctes.
