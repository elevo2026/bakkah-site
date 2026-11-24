/* GENERE par contenu/generer.py depuis contenu/produits.json : catalogue par defaut (articles marques demo = exemples). */
window.BK_CATALOG = {
 "categories": [
  {
   "id": "parfums",
   "nom": "Parfums",
   "nom_en": "Perfumes",
   "nom_ar": "العطور",
   "icone": "bottle",
   "visible": true,
   "ordre": 0,
   "sous_filtres": true
  },
  {
   "id": "packs",
   "nom": "Packs et coffrets",
   "nom_en": "Gift Sets",
   "nom_ar": "الباقات وعلب الهدايا",
   "icone": "box",
   "visible": true,
   "ordre": 1
  },
  {
   "id": "abayas",
   "nom": "Abayas et voiles",
   "nom_en": "Abayas & Veils",
   "nom_ar": "العبايات والحجاب",
   "icone": "abaya",
   "visible": true,
   "ordre": 2
  },
  {
   "id": "qamis",
   "nom": "Qamis",
   "nom_en": "Qamis",
   "nom_ar": "القمصان الرجالية",
   "icone": "qamis",
   "visible": true,
   "ordre": 3
  },
  {
   "id": "montres",
   "nom": "Montres",
   "nom_en": "Watches",
   "nom_ar": "الساعات",
   "icone": "watch",
   "visible": true,
   "ordre": 4
  },
  {
   "id": "tapis",
   "nom": "Tapis de prière et tasbih",
   "nom_en": "Prayer Mats & Tasbih",
   "nom_ar": "سجادات الصلاة والمسابح",
   "icone": "rug",
   "visible": true,
   "ordre": 5
  },
  {
   "id": "oud",
   "nom": "Oud et bakhour",
   "nom_en": "Oud & Bakhoor",
   "nom_ar": "العود والبخور",
   "icone": "incense",
   "visible": true,
   "ordre": 6
  },
  {
   "id": "promos",
   "nom": "Promos",
   "nom_en": "Offers",
   "nom_ar": "العروض",
   "icone": "box",
   "visible": true,
   "ordre": 7,
   "auto": true
  }
 ],
 "products": [
  {
   "id": "officer",
   "nom": "Officer",
   "nom_en": "Officer",
   "nom_ar": "أوفيسر",
   "categorie": "parfums",
   "genre": "homme",
   "marque": "Cyrus",
   "contenance": "90 ml",
   "concentration": "EDP",
   "prix": 380,
   "prix_promo": 320,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": true,
   "vedette_ordre": 0,
   "couleur1": "#1E3FA8",
   "couleur2": "#000000",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/officer.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 0,
   "notes": {
    "tete": "bergamote, citron, baies roses, chocolat, fruits",
    "coeur": "lavande, cardamome, jasmin, ananas, lys",
    "fond": "bois, ambre, fève tonka, mousse de chêne, musc"
   },
   "description": "Un aromatique gourmand et racé : l'éclat des agrumes, la lavande veloutée, puis un fond ambré et boisé d'une belle présence.",
   "notes_en": {
    "tete": "bergamot, lemon, pink berries, chocolate, fruits",
    "coeur": "lavender, cardamom, jasmine, pineapple, lily",
    "fond": "woods, amber, tonka bean, oakmoss, musk"
   },
   "description_en": "A refined, gourmand aromatic: bright citrus and velvety lavender settling into a warm, woody-amber base with real presence.",
   "notes_ar": {
    "tete": "برغموت, ليمون, توت وردي, شوكولاتة, فواكه",
    "coeur": "لافندر, هيل, ياسمين, أناناس, زنبق",
    "fond": "أخشاب, عنبر, فول التونكا, طحلب البلوط, مسك"
   },
   "description_ar": "عطر من الفصيلة العطرية (أروماتيك) راقٍ بلمسة شهية: إشراقة الحمضيات ونعومة اللافندر، ثم قاعدة عنبرية خشبية دافئة بحضور لافت."
  },
  {
   "id": "asad-elixir",
   "nom": "Asad Elixir",
   "nom_en": "Asad Elixir",
   "nom_ar": "أسد إليكسير",
   "categorie": "parfums",
   "genre": "homme",
   "marque": "Lattafa",
   "contenance": "100 ml",
   "concentration": "EDP",
   "prix": 420,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": true,
   "vedette_ordre": 1,
   "couleur1": "#3B2416",
   "couleur2": "#C9A24A",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/asad-elixir.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 1,
   "notes": {
    "tete": "pamplemousse, safran, baies roses",
    "coeur": "vanille, cèdre, tabac",
    "fond": "ambre sec, cachemire, oliban (encens), patchouli"
   },
   "description": "Le lion en version élixir : safran et tabac vanillé, puis un sillage d'ambre sec, d'encens et de patchouli, intense et solennel.",
   "notes_en": {
    "tete": "grapefruit, saffron, pink berries",
    "coeur": "vanilla, cedar, tobacco",
    "fond": "dry amber, cashmere, frankincense, patchouli"
   },
   "description_en": "The lion in elixir form: saffron and vanilla-tinged tobacco, then a trail of dry amber, incense and patchouli, intense and regal.",
   "notes_ar": {
    "tete": "جريب فروت, زعفران, توت وردي",
    "coeur": "فانيليا, خشب الأرز, تبغ",
    "fond": "عنبر جاف, كشمير, لبان, باتشولي"
   },
   "description_ar": "الأسد في صورة إكسير: زعفران وتبغ بلمسة فانيليا، يتبعهما أثر من العنبر الجاف واللبان والباتشولي، كثيف ومهيب."
  },
  {
   "id": "nudo-green-iris",
   "nom": "Nudo Green Iris",
   "nom_en": "Nudo Green Iris",
   "nom_ar": "نودو غرين آيريس",
   "categorie": "parfums",
   "genre": "femme",
   "marque": "Fragrance World",
   "contenance": "100 ml",
   "concentration": "EDP",
   "prix": 350,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": true,
   "vedette_ordre": 2,
   "couleur1": "#0F5A3F",
   "couleur2": "#C9A24A",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/nudo-green-iris.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 2,
   "notes": {
    "tete": "mandarine, citron",
    "coeur": "iris, violette",
    "fond": "notes boisées, ambre, musc, vanille"
   },
   "description": "Un iris poudré et lumineux, nuancé de violette et rafraîchi d'agrumes, qui s'adoucit en un fond boisé, musqué et vanillé. Élégant et délicat.",
   "notes_en": {
    "tete": "mandarin, lemon",
    "coeur": "iris, violet",
    "fond": "woody notes, amber, musk, vanilla"
   },
   "description_en": "A luminous, powdery iris with a touch of violet, freshened with citrus and softening into a woody, musky and vanilla base. Elegant and delicate.",
   "notes_ar": {
    "tete": "يوسفي, ليمون",
    "coeur": "سوسن, بنفسج",
    "fond": "نفحات خشبية, عنبر, مسك, فانيليا"
   },
   "description_ar": "سوسن مضيء وبودري بلمسة بنفسج، تنعشه الحمضيات، ثم يلين في قاعدة خشبية ومسكية بلمسة فانيليا. أنيق ورقيق."
  },
  {
   "id": "najdia",
   "nom": "Najdia",
   "nom_en": "Najdia",
   "nom_ar": "نجدية",
   "categorie": "parfums",
   "genre": "mixte",
   "marque": "Lattafa",
   "contenance": "100 ml",
   "concentration": "EDP",
   "prix": 320,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": true,
   "vedette_ordre": 3,
   "couleur1": "#6B3E26",
   "couleur2": "#E8A0A8",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/najdia.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 3,
   "notes": {
    "tete": "lavande, pomme, agrumes",
    "coeur": "rose, cèdre, jasmin",
    "fond": "bois d'oud, ambre, musc"
   },
   "description": "Une rose et un jasmin posés sur un oud ambré : fraîcheur fruitée à l'ouverture, puis une chaleur orientale douce et enveloppante.",
   "notes_en": {
    "tete": "lavender, apple, citrus",
    "coeur": "rose, cedar, jasmine",
    "fond": "oud wood, amber, musk"
   },
   "description_en": "Rose and jasmine resting on amber-tinged oud: a fruity, fresh opening that gives way to a soft, enveloping oriental warmth.",
   "notes_ar": {
    "tete": "لافندر, تفاح, حمضيات",
    "coeur": "ورد, خشب الأرز, ياسمين",
    "fond": "خشب العود, عنبر, مسك"
   },
   "description_ar": "ورد وياسمين على عود عنبري: افتتاحية منعشة بلمسة فاكهية، ثم دفء شرقي ناعم يلفّك."
  },
  {
   "id": "launo-intense-blue",
   "nom": "Launo Intense Blue",
   "nom_en": "Launo Intense Blue",
   "nom_ar": "لانو إنتنس بلو",
   "categorie": "parfums",
   "genre": "homme",
   "marque": "Fragrance World",
   "contenance": "100 ml",
   "concentration": "EDP",
   "prix": 290,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": true,
   "vedette_ordre": 4,
   "couleur1": "#2F7FD0",
   "couleur2": "#C9A24A",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/launo-intense-blue.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 4,
   "notes": {
    "tete": "menthe, citron, pamplemousse",
    "coeur": "notes marines, fleur d'oranger, lavande",
    "fond": "musc, bois, ambre"
   },
   "description": "Un bleu vif et marin : menthe et agrumes glacés, lavande et fleur d'oranger, sur un fond de musc et de bois ambrés.",
   "notes_en": {
    "tete": "mint, lemon, grapefruit",
    "coeur": "marine notes, orange blossom, lavender",
    "fond": "musk, woods, amber"
   },
   "description_en": "A vivid marine blue: icy mint and citrus, lavender and orange blossom, resting on musky, amber-woody depths.",
   "notes_ar": {
    "tete": "نعناع, ليمون, جريب فروت",
    "coeur": "نفحات بحرية, زهر البرتقال, لافندر",
    "fond": "مسك, أخشاب, عنبر"
   },
   "description_ar": "أزرق نابض ببحرٍ منعش: نعناع وحمضيات باردة ولافندر وزهر البرتقال، على قاعدة من المسك والخشب العنبري."
  },
  {
   "id": "ana-abiyedh",
   "nom": "Ana Abiyedh",
   "nom_en": "Ana Abiyedh",
   "nom_ar": "أنا الأبيض",
   "categorie": "parfums",
   "genre": "mixte",
   "marque": "Lattafa",
   "contenance": "60 ml",
   "concentration": "EDP",
   "prix": 300,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "Version",
   "variante_label_en": "Version",
   "variante_label_ar": "النسخة",
   "variantes": [
    {
     "label": "Blanc",
     "label_en": "White",
     "label_ar": "أبيض",
     "prix": 300,
     "notes": {
      "tete": "bergamote, orange",
      "coeur": "vanille, poire",
      "fond": "musc, ambre"
     },
     "notes_en": {
      "tete": "bergamot, orange",
      "coeur": "vanilla, pear",
      "fond": "musk, amber"
     },
     "notes_ar": {
      "tete": "برغموت, برتقال",
      "coeur": "فانيليا, كمثرى",
      "fond": "مسك, عنبر"
     }
    },
    {
     "label": "Rouge",
     "label_en": "Rouge",
     "label_ar": "روج",
     "prix": 300,
     "notes": {
      "tete": "poire nashi, kumquat, bergamote",
      "coeur": "caramel, géranium",
      "fond": "ambre gris, musc, mousse de chêne"
     },
     "notes_en": {
      "tete": "nashi pear, kumquat, bergamot",
      "coeur": "caramel, geranium",
      "fond": "ambergris, musk, oakmoss"
     },
     "notes_ar": {
      "tete": "كمثرى ناشي, كمكوات, برغموت",
      "coeur": "كراميل, جيرانيوم",
      "fond": "عنبر رمادي, مسك, طحلب البلوط"
     }
    },
    {
     "label": "Poudrée",
     "label_en": "Poudrée",
     "label_ar": "بودري",
     "prix": 300,
     "notes": {
      "tete": "fleur d'oranger, jasmin, rose",
      "coeur": "ambroxan, musc, notes poudrées",
      "fond": "vanille, musc"
     },
     "notes_en": {
      "tete": "orange blossom, jasmine, rose",
      "coeur": "ambroxan, musk, powdery notes",
      "fond": "vanilla, musk"
     },
     "notes_ar": {
      "tete": "زهر البرتقال, ياسمين, ورد",
      "coeur": "أمبروكسان, مسك, نفحات بودرية",
      "fond": "فانيليا, مسك"
     }
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#C98A2B",
   "couleur2": "#8E1B1B",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/ana-abiyedh.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 5,
   "notes": {
    "tete": "bergamote, orange",
    "coeur": "vanille, poire",
    "fond": "musc, ambre"
   },
   "description": "Une signature Lattafa en trois versions, Blanc, Rouge et Poudrée, pour choisir son humeur : lumineuse, intense ou tendre. Les notes varient selon la version choisie.",
   "notes_en": {
    "tete": "bergamot, orange",
    "coeur": "vanilla, pear",
    "fond": "musk, amber"
   },
   "description_en": "A Lattafa signature in three versions, White, Rouge and Poudrée, so you can choose your mood: luminous, intense or tender. The notes vary with the version you choose.",
   "notes_ar": {
    "tete": "برغموت, برتقال",
    "coeur": "فانيليا, كمثرى",
    "fond": "مسك, عنبر"
   },
   "description_ar": "بصمة من لطافة (Lattafa) بثلاث نسخ: أبيض وروج وبودري، لتختار مزاجك بين الإشراق والكثافة والرقة. وتختلف النفحات بحسب النسخة المختارة."
  },
  {
   "id": "philos-messenger",
   "nom": "Philos Messenger",
   "nom_en": "Philos Messenger",
   "nom_ar": "فيلوس ميسنجر",
   "categorie": "parfums",
   "genre": "mixte",
   "marque": "Maison Alhambra",
   "contenance": "100 ml",
   "concentration": "EDP",
   "prix": 330,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#1F6B5C",
   "couleur2": "#F5EFE0",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/philos-messenger.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 6,
   "notes": {
    "tete": "pamplemousse, bergamote, gingembre",
    "coeur": "jasmin, magnolia, iris",
    "fond": "musc, ambre, cèdre, patchouli"
   },
   "description": "Une eau de parfum fraîche et élégante : pamplemousse, bergamote et gingembre pétillants, un cœur floral de jasmin, de magnolia et d'iris, puis un fond de musc, d'ambre, de cèdre et de patchouli.",
   "notes_en": {
    "tete": "grapefruit, bergamot, ginger",
    "coeur": "jasmine, magnolia, iris",
    "fond": "musk, amber, cedar, patchouli"
   },
   "description_en": "A fresh, elegant eau de parfum: sparkling grapefruit, bergamot and ginger, a floral heart of jasmine, magnolia and iris, settling into musk, amber, cedar and patchouli.",
   "notes_ar": {
    "tete": "جريب فروت, برغموت, زنجبيل",
    "coeur": "ياسمين, ماغنوليا, سوسن",
    "fond": "مسك, عنبر, خشب الأرز, باتشولي"
   },
   "description_ar": "ماء عطر منعش وأنيق: جريب فروت وبرغموت وزنجبيل، قلب زهري من الياسمين والماغنوليا والسوسن، وقاعدة من المسك والعنبر وخشب الأرز والباتشولي."
  },
  {
   "id": "ateeq",
   "nom": "Ateeq",
   "nom_en": "Ateeq",
   "nom_ar": "عتيق",
   "categorie": "parfums",
   "genre": "mixte",
   "marque": "Nusuk",
   "contenance": "100 ml",
   "concentration": "Extrait de parfum",
   "prix": 350,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#8A4B3A",
   "couleur2": "#E9D8C4",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/ateeq.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 7,
   "notes": {
    "tete": "miel, cannelle, ambre, pamplemousse, citron vert",
    "coeur": "tabac, lavande, jasmin",
    "fond": "fève tonka, cèdre, coumarine, orchidée vanille, musc"
   },
   "description": "Un extrait de parfum chaleureux et addictif : miel, cannelle et agrumes, un cœur de tabac, de lavande et de jasmin, puis un fond de fève tonka, de vanille et de musc d'une grande tenue.",
   "notes_en": {
    "tete": "honey, cinnamon, amber, grapefruit, lime",
    "coeur": "tobacco, lavender, jasmine",
    "fond": "tonka bean, cedar, coumarin, vanilla orchid, musk"
   },
   "description_en": "A warm, addictive extrait de parfum: honey, cinnamon and citrus, a heart of tobacco, lavender and jasmine, settling into tonka bean, vanilla and musk with great staying power.",
   "notes_ar": {
    "tete": "عسل, قرفة, عنبر, جريب فروت, ليمون أخضر",
    "coeur": "تبغ, لافندر, ياسمين",
    "fond": "فول التونكا, خشب الأرز, كومارين, أوركيد الفانيليا, مسك"
   },
   "description_ar": "خلاصة عطرية دافئة وآسرة: عسل وقرفة وحمضيات، قلب من التبغ واللافندر والياسمين، ثم قاعدة من فول التونكا والفانيليا والمسك تدوم طويلًا."
  },
  {
   "id": "sehr-lattafa",
   "nom": "Sehr Lattafa",
   "nom_en": "Sehr Lattafa",
   "nom_ar": "سحر لطافة",
   "categorie": "parfums",
   "genre": "mixte",
   "marque": "Lattafa",
   "contenance": "100 ml",
   "concentration": "EDP",
   "prix": 380,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#121212",
   "couleur2": "#C9A24A",
   "notes_a_confirmer": false,
   "notes_provisoires": false,
   "photos": [
    "assets/img/produits/sehr-lattafa.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 8,
   "notes": {
    "tete": "amande amère, cannelle",
    "coeur": "jasmin, Pomarose, Akigalawood",
    "fond": "vanille absolue, ambre, fève tonka"
   },
   "description": "Un oriental gourmand et envoûtant : amande amère et cannelle à l'ouverture, un cœur de jasmin, de Pomarose et d'Akigalawood, puis un fond de vanille absolue, d'ambre et de fève tonka.",
   "notes_en": {
    "tete": "bitter almond, cinnamon",
    "coeur": "jasmine, Pomarose, Akigalawood",
    "fond": "vanilla absolute, amber, tonka bean"
   },
   "description_en": "A bewitching, gourmand oriental: bitter almond and cinnamon in the opening, a heart of jasmine, Pomarose and Akigalawood, and a base of vanilla absolute, amber and tonka bean.",
   "notes_ar": {
    "tete": "لوز مر, قرفة",
    "coeur": "ياسمين, بوماروز, أكيغالاوود",
    "fond": "فانيليا أبسولو, عنبر, فول التونكا"
   },
   "description_ar": "عطر شرقي شهي وآسر: لوز مر وقرفة في الافتتاحية، قلب من الياسمين والبوماروز والأكيغالاوود، وقاعدة من الفانيليا أبسولو والعنبر وفول التونكا."
  },
  {
   "id": "glacier-bella",
   "nom": "Glacier Bella",
   "nom_en": "Glacier Bella",
   "nom_ar": "غلاسيير بيلا",
   "categorie": "parfums",
   "genre": "femme",
   "marque": "Maison Alhambra",
   "contenance": "100 ml",
   "concentration": "EDP",
   "prix": 300,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": false,
   "vedette": true,
   "vedette_ordre": 9,
   "couleur1": "#7A1020",
   "couleur2": "#A9D3C2",
   "notes_a_confirmer": false,
   "notes_provisoires": true,
   "photos": [
    "assets/img/produits/glacier-bella.jpg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 9,
   "notes": {
    "tete": "poire, mandarine",
    "coeur": "rose, fleur d'oranger",
    "fond": "vanille, ambre, musc"
   },
   "description": "Une rose gourmande et lumineuse : poire et mandarine pétillantes, fleur d'oranger, puis un fond de vanille ambrée et de musc.",
   "notes_en": {
    "tete": "pear, mandarin",
    "coeur": "rose, orange blossom",
    "fond": "vanilla, amber, musk"
   },
   "description_en": "A luminous, gourmand rose: sparkling pear and mandarin, orange blossom, then a base of amber vanilla and musk.",
   "notes_ar": {
    "tete": "كمثرى, يوسفي",
    "coeur": "ورد, زهر البرتقال",
    "fond": "فانيليا, عنبر, مسك"
   },
   "description_ar": "ورد شهي ومشرق: كمثرى ويوسفي منعشان، زهر البرتقال، ثم قاعدة من الفانيليا العنبرية والمسك."
  },
  {
   "id": "demo-pack-prestige",
   "nom": "Coffret Prestige",
   "nom_en": "Prestige Gift Set",
   "nom_ar": "علبة بريستيج",
   "categorie": "packs",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 1200,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Un parfum et son oud, présentés dans un écrin noir et or.",
   "description_en": "A perfume and its oud, presented in a black and gold case.",
   "description_ar": "عطر مع عود، في علبة أنيقة بالأسود والذهبي.",
   "photos": [
    "assets/img/articles/coffret-prestige.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 10
  },
  {
   "id": "demo-pack-couple",
   "nom": "Coffret Duo",
   "nom_en": "Duo Gift Set",
   "nom_ar": "علبة الثنائي",
   "categorie": "packs",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 850,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Deux fragrances assorties, pour offrir ou se faire plaisir.",
   "description_en": "Two matching fragrances, to give or to treasure.",
   "description_ar": "عطران متناسقان، للإهداء أو للاقتناء.",
   "photos": [
    "assets/img/articles/coffret-duo.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 11
  },
  {
   "id": "demo-abaya-noire",
   "nom": "Abaya noire brodée or",
   "nom_en": "Black abaya with gold embroidery",
   "nom_ar": "عباية سوداء بتطريز ذهبي",
   "categorie": "abayas",
   "genre": "",
   "souscat": "abayas",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 690,
   "prix_promo": 590,
   "provisoire": true,
   "variante_label": "Taille",
   "variante_label_en": "Size",
   "variante_label_ar": "المقاس",
   "variantes": [
    {
     "label": "S",
     "label_en": "S",
     "label_ar": "S",
     "prix": null
    },
    {
     "label": "M",
     "label_en": "M",
     "label_ar": "M",
     "prix": null
    },
    {
     "label": "L",
     "label_en": "L",
     "label_ar": "L",
     "prix": null
    },
    {
     "label": "XL",
     "label_en": "XL",
     "label_ar": "XL",
     "prix": null
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Coupe fluide et broderie dorée délicate.",
   "description_en": "A flowing cut with delicate gold embroidery.",
   "description_ar": "قصّة انسيابية وتطريز ذهبي رقيق.",
   "photos": [
    "assets/img/articles/abaya-noire.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 12
  },
  {
   "id": "demo-abaya-taupe",
   "nom": "Abaya taupe satinée",
   "nom_en": "Satin taupe abaya",
   "nom_ar": "عباية ساتان بلون التاوب",
   "categorie": "abayas",
   "genre": "",
   "souscat": "abayas",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 550,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "Taille",
   "variante_label_en": "Size",
   "variante_label_ar": "المقاس",
   "variantes": [
    {
     "label": "S",
     "label_en": "S",
     "label_ar": "S",
     "prix": null
    },
    {
     "label": "M",
     "label_en": "M",
     "label_ar": "M",
     "prix": null
    },
    {
     "label": "L",
     "label_en": "L",
     "label_ar": "L",
     "prix": null
    },
    {
     "label": "XL",
     "label_en": "XL",
     "label_ar": "XL",
     "prix": null
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Un tombé soyeux, sobre et élégant.",
   "description_en": "A silky drape, understated and elegant.",
   "description_ar": "سقوط حريري بتصميم هادئ وأنيق.",
   "photos": [
    "assets/img/articles/abaya-taupe.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 13
  },
  {
   "id": "demo-voile-soie",
   "nom": "Voile en mousseline",
   "nom_en": "Chiffon veil",
   "nom_ar": "حجاب شيفون",
   "categorie": "abayas",
   "genre": "",
   "souscat": "veils",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 120,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "Couleur",
   "variante_label_en": "Colour",
   "variante_label_ar": "اللون",
   "variantes": [
    {
     "label": "Noir",
     "label_en": "Black",
     "label_ar": "أسود",
     "prix": null
    },
    {
     "label": "Ivoire",
     "label_en": "Ivory",
     "label_ar": "عاجي",
     "prix": null
    },
    {
     "label": "Beige",
     "label_en": "Beige",
     "label_ar": "بيج",
     "prix": null
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Léger, doux et facile à draper.",
   "description_en": "Light, soft and easy to drape.",
   "description_ar": "خفيف وناعم وسهل التنسيق.",
   "photos": [
    "assets/img/articles/voile-soie.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 14
  },
  {
   "id": "demo-qamis-blanc",
   "nom": "Qamis blanc classique",
   "nom_en": "Classic white qamis",
   "nom_ar": "قميص رجالي أبيض كلاسيكي",
   "categorie": "qamis",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 350,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "Taille",
   "variante_label_en": "Size",
   "variante_label_ar": "المقاس",
   "variantes": [
    {
     "label": "S",
     "label_en": "S",
     "label_ar": "S",
     "prix": null
    },
    {
     "label": "M",
     "label_en": "M",
     "label_ar": "M",
     "prix": null
    },
    {
     "label": "L",
     "label_en": "L",
     "label_ar": "L",
     "prix": null
    },
    {
     "label": "XL",
     "label_en": "XL",
     "label_ar": "XL",
     "prix": null
    },
    {
     "label": "XXL",
     "label_en": "XXL",
     "label_ar": "XXL",
     "prix": null
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Une coupe nette et un tissu confortable.",
   "description_en": "A clean cut in a comfortable fabric.",
   "description_ar": "قصّة أنيقة وقماش مريح.",
   "photos": [
    "assets/img/articles/qamis-blanc.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 15
  },
  {
   "id": "demo-qamis-noir",
   "nom": "Qamis noir col brodé",
   "nom_en": "Black qamis with embroidered collar",
   "nom_ar": "قميص رجالي أسود بياقة مطرزة",
   "categorie": "qamis",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 420,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "Taille",
   "variante_label_en": "Size",
   "variante_label_ar": "المقاس",
   "variantes": [
    {
     "label": "S",
     "label_en": "S",
     "label_ar": "S",
     "prix": null
    },
    {
     "label": "M",
     "label_en": "M",
     "label_ar": "M",
     "prix": null
    },
    {
     "label": "L",
     "label_en": "L",
     "label_ar": "L",
     "prix": null
    },
    {
     "label": "XL",
     "label_en": "XL",
     "label_ar": "XL",
     "prix": null
    },
    {
     "label": "XXL",
     "label_en": "XXL",
     "label_ar": "XXL",
     "prix": null
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Sobre, avec un détail brodé discret.",
   "description_en": "Understated, with a discreet embroidered detail.",
   "description_ar": "تصميم هادئ بتطريز خفيف على الياقة.",
   "photos": [
    "assets/img/articles/qamis-noir.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 16
  },
  {
   "id": "demo-montre-or",
   "nom": "Montre dorée cadran noir",
   "nom_en": "Gold watch with black dial",
   "nom_ar": "ساعة ذهبية بواجهة سوداء",
   "categorie": "montres",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 890,
   "prix_promo": 690,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Un classique noir et or, à offrir ou à porter.",
   "description_en": "A black and gold classic, to give or to wear.",
   "description_ar": "ساعة كلاسيكية بالأسود والذهبي، للإهداء أو للارتداء.",
   "photos": [
    "assets/img/articles/montre-or.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 17
  },
  {
   "id": "demo-montre-argent",
   "nom": "Montre argentée bracelet acier",
   "nom_en": "Silver watch with steel bracelet",
   "nom_ar": "ساعة فضية بسوار فولاذي",
   "categorie": "montres",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 650,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Épurée et intemporelle.",
   "description_en": "Clean and timeless.",
   "description_ar": "تصميم بسيط وخالد.",
   "photos": [
    "assets/img/articles/montre-argent.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 18
  },
  {
   "id": "demo-tapis-velours",
   "nom": "Tapis de prière en velours",
   "nom_en": "Velvet prayer mat",
   "nom_ar": "سجادة صلاة مخملية",
   "categorie": "tapis",
   "genre": "",
   "souscat": "prayerMats",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 280,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Épais et doux, aux motifs dorés.",
   "description_en": "Thick and soft, with golden patterns.",
   "description_ar": "سميكة وناعمة بزخارف ذهبية.",
   "photos": [
    "assets/img/articles/tapis-velours.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 19
  },
  {
   "id": "demo-tasbih-bois",
   "nom": "Tasbih en bois précieux",
   "nom_en": "Precious wood tasbih",
   "nom_ar": "مسبحة من خشب نفيس",
   "categorie": "tapis",
   "genre": "",
   "souscat": "tasbih",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 120,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "33 perles polies, gland soyeux.",
   "description_en": "33 polished beads with a silky tassel.",
   "description_ar": "33 حبة مصقولة وشرّابة حريرية.",
   "photos": [
    "assets/img/articles/tasbih-bois.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 20
  },
  {
   "id": "demo-tasbih-cristal",
   "nom": "Tasbih en cristal",
   "nom_en": "Crystal tasbih",
   "nom_ar": "مسبحة كريستال",
   "categorie": "tapis",
   "genre": "",
   "souscat": "tasbih",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 180,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Des perles translucides, un cadeau délicat.",
   "description_en": "Translucent beads, a delicate gift.",
   "description_ar": "حبات شفافة، هدية رقيقة.",
   "photos": [
    "assets/img/articles/tasbih-cristal.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 21
  },
  {
   "id": "demo-oud-cambodge",
   "nom": "Oud Cambodge",
   "nom_en": "Cambodian Oud",
   "nom_ar": "عود كمبودي",
   "categorie": "oud",
   "genre": "",
   "souscat": "oudScents",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 280,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "Senteur",
   "variante_label_en": "Scent",
   "variante_label_ar": "الرائحة",
   "variantes": [
    {
     "label": "Oud boisé",
     "label_en": "Woody oud",
     "label_ar": "عود خشبي",
     "prix": 280
    },
    {
     "label": "Oud ambré",
     "label_en": "Amber oud",
     "label_ar": "عود عنبري",
     "prix": 300
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Un oud profond, boisé et chaleureux.",
   "description_en": "A deep, woody and warm oud.",
   "description_ar": "عود عميق خشبي دافئ.",
   "photos": [
    "assets/img/articles/oud-cambodge.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 22
  },
  {
   "id": "demo-bakhour-rose",
   "nom": "Bakhour aux senteurs variées",
   "nom_en": "Bakhoor in assorted scents",
   "nom_ar": "بخور بروائح متنوعة",
   "categorie": "oud",
   "genre": "",
   "souscat": "bakhour",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 70,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "Senteur",
   "variante_label_en": "Scent",
   "variante_label_ar": "الرائحة",
   "variantes": [
    {
     "label": "Rose",
     "label_en": "Rose",
     "label_ar": "ورد",
     "prix": 70
    },
    {
     "label": "Musc",
     "label_en": "Musk",
     "label_ar": "مسك",
     "prix": 80
    },
    {
     "label": "Ambre",
     "label_en": "Amber",
     "label_ar": "عنبر",
     "prix": 90
    },
    {
     "label": "Oud",
     "label_en": "Oud",
     "label_ar": "عود",
     "prix": 150
    }
   ],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Plusieurs senteurs au choix pour parfumer la maison.",
   "description_en": "Several scents to choose from, to perfume your home.",
   "description_ar": "عدة روائح للاختيار لتعطير البيت.",
   "photos": [
    "assets/img/articles/bakhour-rose.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 23
  },
  {
   "id": "demo-bakhouriya-pliable",
   "nom": "Brûle-encens (bakhouriya) avec bouton pliable",
   "nom_en": "Incense burner (bakhoor burner) with folding button",
   "nom_ar": "مبخرة بزر قابل للطي",
   "categorie": "oud",
   "genre": "",
   "souscat": "incenseBurners",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 250,
   "prix_promo": null,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Un brûle-encens compact : son bouton se plie pour un rangement facile.",
   "description_en": "A compact incense burner with a folding button, easy to store.",
   "description_ar": "مبخرة صغيرة الحجم بزر يُطوى لسهولة التخزين.",
   "photos": [
    "assets/img/articles/bakhouriya-pliable.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 24
  },
  {
   "id": "demo-promo-duo-parfum",
   "nom": "Offre : parfum + bakhour",
   "nom_en": "Offer: perfume + bakhoor",
   "nom_ar": "عرض: عطر + بخور",
   "categorie": "promos",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 520,
   "prix_promo": 450,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Un parfum et un bakhour à prix réduit.",
   "description_en": "A perfume and a bakhoor at a reduced price.",
   "description_ar": "عطر وبخور بسعر مخفّض.",
   "photos": [
    "assets/img/articles/offre-parfum-bakhour.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 25
  },
  {
   "id": "demo-promo-tasbih-tapis",
   "nom": "Offre : tapis de prière + tasbih",
   "nom_en": "Offer: prayer mat + tasbih",
   "nom_ar": "عرض: سجادة صلاة + مسبحة",
   "categorie": "promos",
   "genre": "",
   "souscat": "",
   "marque": "",
   "contenance": "",
   "concentration": "",
   "prix": 480,
   "prix_promo": 400,
   "provisoire": true,
   "variante_label": "",
   "variante_label_en": "",
   "variante_label_ar": "",
   "variantes": [],
   "badge": "",
   "badge_en": "",
   "badge_ar": "",
   "demo": true,
   "vedette": false,
   "vedette_ordre": 99,
   "couleur1": "#2a1f0a",
   "couleur2": "#e6c066",
   "notes": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_en": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "notes_ar": {
    "tete": "",
    "coeur": "",
    "fond": ""
   },
   "description": "Un ensemble de prière, idéal pour offrir.",
   "description_en": "A prayer set, ideal as a gift.",
   "description_ar": "طقم صلاة مثالي للإهداء.",
   "photos": [
    "assets/img/articles/offre-tasbih-tapis.svg"
   ],
   "dispo": true,
   "stock": null,
   "ordre": 26
  }
 ]
};
