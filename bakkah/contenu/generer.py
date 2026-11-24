#!/usr/bin/env python3
"""Genere ../i18n-data.js et ../catalog-data.js a partir de i18n.json et produits.json.
Usage : cd clients/bakkah/contenu && python3 generer.py
(les fichiers .js sont charges par index.html et admin.html : aucun fetch, donc compatible file:// ou hebergement statique)"""
import json, os
here = os.path.dirname(os.path.abspath(__file__)); out = os.path.dirname(here)
i18n = json.load(open(os.path.join(here, "i18n.json"), encoding="utf-8"))
prod = json.load(open(os.path.join(here, "produits.json"), encoding="utf-8"))

# Devise : le client demande "DH" aussi en anglais (i18n.json proposait MAD)
i18n["en"]["meta"]["currency"] = "DH"

def X(fr, en, ar): return {"fr": fr, "en": en, "ar": ar}
extra = {
 "nav": {"menu": X("Menu","Menu","القائمة"), "boutique": X("La boutique","The boutique","المتجر")},
 "sound": {"label": X("Son","Sound","الصوت"), "on": X("ON","ON","تشغيل"), "off": X("OFF","OFF","إيقاف")},
 "hero": {"cta2": X("Voir le catalogue","View the catalogue","تصفح الكتالوج")},
 "profile": {"bg1": X("ESSENCE","ESSENCE","جوهر"), "bg2": X("SILLAGE","TRAIL","أثر")},
 "product": {"from": X("À partir de","From","ابتداءً من"), "choose": X("Choisir","Choose","اختر"), "noitem": X("Aucun article dans cette catégorie.","No item in this category.","لا توجد منتجات في هذا القسم."), "variant": X("Version","Version","النسخة")},
 "footer": {"toTop": X("Retour en haut","Back to top","للأعلى"), "hours": X("Horaires","Hours","أوقات العمل"), "address": X("Adresse","Address","العنوان")},
 "defaults": {"address": X("Maroc","Morocco","المغرب"), "hours": X("Lun–Sam 10h–21h","Mon–Sat 10am–9pm","الإثنين–السبت 10ص–9م")},
 "boutique": {"title": X("Notre boutique","Our boutique","متجرنا"), "kicker": X("Venez nous voir","Come and see us","زورونا")},
 "cart": {"waUnset": X("Le numéro WhatsApp de la boutique n'est pas encore configuré.","The shop's WhatsApp number is not set yet.","رقم واتساب المتجر غير مضبوط بعد."), "note": X("Note (facultatif)","Note (optional)","ملاحظة (اختياري)")},
 "a11y": {"canvas": X("Flacons de parfum Bakkah en 3D","Bakkah perfume bottles in 3D","قوارير عطور بكة ثلاثية الأبعاد"), "home": X("BAKKAH, accueil","BAKKAH, home","بكة، الرئيسية")},
 "legal": {
  "mentions": X("Mentions légales : à compléter par la boutique (raison sociale, adresse, numéro d'immatriculation, contact).","Legal notice: to be completed by the shop (company name, address, registration number, contact).","الإشعارات القانونية: تُستكمل من طرف المتجر (الاسم التجاري، العنوان، رقم التسجيل، وسيلة التواصل)."),
  "cgu": X("Conditions générales de vente : à compléter par la boutique (commande via WhatsApp, paiement, livraison, retours).","Terms of sale: to be completed by the shop (ordering via WhatsApp, payment, delivery, returns).","الشروط العامة للبيع: تُستكمل من طرف المتجر (الطلب عبر واتساب، الأداء، التوصيل، الإرجاع)."),
  "privacy": X("Politique de confidentialité : à compléter par la boutique. Les données saisies pour la commande ne sont utilisées que pour traiter votre demande.","Privacy policy: to be completed by the shop. The data entered for an order is only used to process your request.","سياسة الخصوصية: تُستكمل من طرف المتجر. البيانات المدخلة في الطلب لا تُستعمل إلا لمعالجة طلبك.")}
}
for L in ("fr","en","ar"):
    for g, d in extra.items():
        i18n[L].setdefault(g, {})
        for k, v in d.items(): i18n[L][g].setdefault(k, v[L])  # v5 : i18n.json fait foi (extra = valeurs par defaut seulement)

# --- v5 : espaces insecables en francais (FR-07) et annee du copyright (FR-08) ---
import re, datetime
def _nb(o):
    if isinstance(o, str):
        o = re.sub(r"(?<=\S) ([?!;:»])", "\u00a0\\1", o)
        return o.replace("« ", "«\u00a0")
    if isinstance(o, list): return [_nb(x) for x in o]
    if isinstance(o, dict): return {k: (v if k in ("dir", "langName") else _nb(v)) for k, v in o.items()}
    return o
i18n["fr"] = _nb(i18n["fr"])
for _L in ("fr", "en", "ar"):
    _c = i18n[_L].get("footer", {}).get("copyright")
    if _c: i18n[_L]["footer"]["copyright"] = re.sub(r"\b20\d\d\b", str(datetime.date.today().year), _c)

js = "/* GENERE par contenu/generer.py depuis contenu/i18n.json : ne pas modifier a la main (modifier le JSON puis relancer). */\nwindow.BK_I18N = " + json.dumps(i18n, ensure_ascii=False, indent=1) + ";\n"
open(os.path.join(out, "i18n-data.js"), "w", encoding="utf-8").write(js)

# ---- catalogue par defaut ----
CATMAP = {"perfumes":"parfums","packs":"packs","abayas":"abayas","qamis":"qamis","watches":"montres","prayer":"tapis","oud":"oud","promos":"promos"}
ICON = {"parfums":"bottle","packs":"box","abayas":"abaya","qamis":"qamis","montres":"watch","tapis":"rug","oud":"incense","promos":"box"}
cats = []
for i,(k,cid) in enumerate(CATMAP.items()):
    n = {L: i18n[L]["categories"][k] for L in ("fr","en","ar")}
    c = {"id":cid,"nom":n["fr"],"nom_en":n["en"],"nom_ar":n["ar"],"icone":ICON[cid],"visible":True,"ordre":i}
    if cid=="parfums": c["sous_filtres"]=True
    if cid=="promos": c["auto"]=True
    cats.append(c)
GEN = {"men":"homme","women":"femme","unisex":"mixte",None:""}
def J(a): return ", ".join(a)
SIZE = X("Taille","Size","المقاس"); COL = X("Couleur","Colour","اللون"); SCENT = i18n and X(i18n["fr"]["filters"]["scentFilter"],i18n["en"]["filters"]["scentFilter"],i18n["ar"]["filters"]["scentFilter"])
COLORS = {"noir":X("Noir","Black","أسود"),"ivoire":X("Ivoire","Ivory","عاجي"),"beige":X("Beige","Beige","بيج")}
products = []
for n,p in enumerate(prod["perfumes"]):
    o = {"id":p["id"],"nom":p["name"]["fr"],"nom_en":p["name"]["en"],"nom_ar":p["name"]["ar"],"categorie":"parfums","genre":GEN[p["gender"]],
      "marque":p.get("brand") or "","contenance":p.get("size") or "","concentration":p.get("concentration") or "","prix":p["price"],"prix_promo":p.get("promoPrice"),"provisoire":bool(p.get("provisional") or p.get("price") is not None),
      "variante_label":"","variante_label_en":"","variante_label_ar":"","variantes":[],"badge":"","badge_en":"","badge_ar":"","demo":False,
      "vedette":bool(p.get("featured")),"vedette_ordre":n if p.get("featured") else 99,"couleur1":p["colors"]["primary"],"couleur2":p["colors"]["secondary"],
      "notes_a_confirmer":bool(p.get("notesToConfirm")),"notes_provisoires":bool(p.get("provisional")),
      "photos":["assets/img/produits/%s.jpg"%p["id"]],"dispo":True,"stock":None,"ordre":n}
    for L,suf in (("fr",""),("en","_en"),("ar","_ar")):
        o["notes"+suf] = {k: ("" if p["notesToConfirm"] else J(p["notes"][k][L])) for k in ("top","heart","base")}
        o["notes"+suf] = {"tete":o["notes"+suf]["top"],"coeur":o["notes"+suf]["heart"],"fond":o["notes"+suf]["base"]}
        o["description"+suf] = p["description"][L]
    if p.get("variants"):
        o["variante_label"],o["variante_label_en"],o["variante_label_ar"] = X("Version","Version","النسخة").values()
        def _var(v):  # v5 : notes propres a une variante (optionnelles)
            d = {"label":v["name"]["fr"],"label_en":v["name"]["en"],"label_ar":v["name"]["ar"],"prix":v.get("price")}
            if v.get("notes"):
                for L,suf in (("fr",""),("en","_en"),("ar","_ar")):
                    d["notes"+suf] = {"tete":J(v["notes"]["top"][L]),"coeur":J(v["notes"]["heart"][L]),"fond":J(v["notes"]["base"][L])}
            return d
        o["variantes"] = [_var(v) for v in p["variants"]]
    products.append(o)
for it in prod["items"]:
    n = len(products)
    cid = CATMAP[it["category"]]
    o = {"id":it["id"],"nom":it["name"]["fr"],"nom_en":it["name"]["en"],"nom_ar":it["name"]["ar"],"categorie":cid,"genre":"","souscat":it.get("subcategory") or "",
      "marque":"","contenance":"","concentration":"","prix":it.get("price"),"prix_promo":it.get("promoPrice"),"provisoire":it.get("price") is not None,
      "variante_label":"","variante_label_en":"","variante_label_ar":"","variantes":[],
      "badge":"","badge_en":"","badge_ar":"","demo":True,"vedette":False,"vedette_ordre":99,"couleur1":"#2a1f0a","couleur2":"#e6c066",
      "notes":{"tete":"","coeur":"","fond":""},"notes_en":{"tete":"","coeur":"","fond":""},"notes_ar":{"tete":"","coeur":"","fond":""},
      "description":it["description"]["fr"],"description_en":it["description"]["en"],"description_ar":it["description"]["ar"],
      "photos":[it["image"]] if it.get("image") else [],"dispo":True,"stock":None,"ordre":n}
    def setv(lab, vs):
        o["variante_label"],o["variante_label_en"],o["variante_label_ar"] = lab["fr"],lab["en"],lab["ar"]
        o["variantes"] = vs
    if it.get("sizes"): setv(SIZE,[{"label":s,"label_en":s,"label_ar":s,"prix":None} for s in it["sizes"]])
    if it.get("colors"): setv(COL,[{"label":COLORS[c]["fr"],"label_en":COLORS[c]["en"],"label_ar":COLORS[c]["ar"],"prix":None} for c in it["colors"]])
    if it.get("scents"): setv(SCENT,[{"label":s["fr"],"label_en":s["en"],"label_ar":s["ar"],"prix":s.get("price")} for s in it["scents"]])
    products.append(o)
js = "/* GENERE par contenu/generer.py depuis contenu/produits.json : catalogue par defaut (articles marques demo = exemples). */\nwindow.BK_CATALOG = " + json.dumps({"categories":cats,"products":products}, ensure_ascii=False, indent=1) + ";\n"
open(os.path.join(out, "catalog-data.js"), "w", encoding="utf-8").write(js)
print(len(products), "produits;", len(cats), "categories")
