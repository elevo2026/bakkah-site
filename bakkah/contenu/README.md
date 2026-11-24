# Contenus trilingues BAKKAH (FR / EN / AR)

## Fichiers
- `i18n.json` : textes de l'interface, `{ "fr": {...}, "en": {...}, "ar": {...} }`, mêmes clés dans les trois langues.
- `produits.json` : `perfumes` (10 parfums : 7 réels + Ateeq, Sehr Lattafa, Glacier Bella provisoires) et `items` (articles de démonstration, `demo: true`).
- `README.md` : ce document.

## Clés de `i18n.json`
`meta` (langName, dir `ltr`/`rtl`, currency, title, description SEO), `nav`, `buttons`, `cart`, `loader`, `hero` (h1 SEO, scrollHint), `sections` (titres et sous-titres), `olfactive` (libellés des notes), `commitments.c1..c4` (`crossed` = étiquette barrée, `title` = H2, `text`), `signature` (mot-signe), `categories`, `filters`, `product`, `signatureScents`, `faq.items[]` (10 couples `q`/`a`), `newsletter`, `footer`, `whatsapp`, `admin`.

Message WhatsApp : `whatsapp.orderTemplate` avec `{articles}`, `{total}`, `{nom}`, `{adresse}`. Chaque ligne d'article utilise `whatsapp.lineTemplate` avec `{nom}`, `{quantite}`, `{prix}`. `whatsapp.notProvided` remplace un nom ou une adresse vides. En arabe, le gabarit est écrit en MSA ; le navigateur doit encoder le texte avec `encodeURIComponent` pour `wa.me/212671501152`.

Notes d'intégration :
- `meta.dir` indique la direction : mettre `dir="rtl"` sur `<html>` en arabe.
- En arabe, `signature.word` est « بكة » et `signature.arabic` « BAKKAH » (inversé par rapport au FR/EN) : le grand mot-signe est donc dans la langue active, avec l'autre graphie en complément.
- `meta.currency` : DH (FR), MAD (EN), درهم (AR).

## Structure de `produits.json`
Parfum : `id`, `category`, `gender` (`men` / `women` / `unisex` / `null` si inconnu), `name{fr,en,ar}`, `brand`, `size`, `concentration`, `notes{top,heart,base}{fr[],en[],ar[]}`, `notesToConfirm`, `description{fr,en,ar}`, `colors{primary,secondary}`, `price`, `promoPrice`, `provisional`, `featured` (6 vedettes 3D : Officer, Asad, Nudo, Najdia, Launo, Glacier Bella). `variants` pour Ana Abiyedh.
Articles de démo : `id`, `category` (clés de `i18n.categories`), `subcategory` (clés de `i18n.filters`), `name`, `description`, `sizes`/`scents`/`foldableButton`, `price`, `promoPrice`, `image`, `demo: true`.

## Valeurs PROVISOIRES (v3, autorisées par le client, à remplacer via l'admin)
- **Prix** : tous les articles ont un prix en DH (marché marocain) : champ `price` (+ `promoPrice` optionnel, doit être < `price`). Dans `scents[]` et `variants[]`, `price` optionnel par senteur/version. Promos actuelles : Officer, Abaya noire, Montre dorée, Offre parfum + bakhour. Si un prix est vide, « Prix sur demande » s'affiche encore.
- **Genres** : Officer, Asad Elixir, Launo = `men` ; Ana Abiyedh = `women` ; Philos Messenger, Nudo, Najdia = `unisex`. Contenance manquante = 100 ml ; marque de Launo et Philos = « Fragrance World » (`brandProvisional`).
- **Notes d'Ana Abiyedh et Philos Messenger** : notes plausibles publiques, `provisional: true` (`notesToConfirm: false` : aucun « à confirmer » côté client).
- **Adresse / horaires** : par défaut « Maroc » / « Lun–Sam 10h–21h » (clés `defaults.address`, `defaults.hours`, 3 langues, générées par generer.py ; surchargeables dans l'admin).
- **Liens** : Avis Google et Itinéraire = recherches Google / Google Maps génériques ; Facebook = recherche ; Snapchat vide (masqué). Seuls https:, http:, tel:, mailto: sont acceptés.
- **Images des articles hors parfums** : illustrations originales SVG (or sur noir) dans `assets/img/articles/`, générées par `contenu/generer_images.py` (champ `image` de chaque article).

## Régénération
`cd contenu && python3 generer.py` (JS) ; `python3 generer_images.py` (illustrations).

## À confirmer par le client
- **Prix réels** (voir ci-dessus), **vraies photos** des articles hors parfums, notes réelles d'Ana Abiyedh et Philos Messenger, marque réelle de Philos.
- Arabe des noms latins (Officer, Nudo, Launo, Philos…) : translittérations proposées, à valider.
- **Liens Google (avis) et Maps (itinéraire)** exacts, adresse et horaires réels.
- **FAQ** : réponses prudentes. À confirmer : paiement à la livraison, délais, retours, horaires.
- **Mentions légales, CGU, confidentialité** : seuls les libellés sont fournis.
- **Articles `demo: true`** : exemples à remplacer par le vrai catalogue.
- L'arabe a été rédigé en arabe standard accessible ; relecture par un locuteur marocain conseillée.

## v4
- Parfums ajoutés (valeurs PROVISOIRES, `provisional: true`) : **Ateeq** (Nusuk, extrait de parfum 100 ml, mixte, 350 DH), **Sehr Lattafa** (Lattafa, EDP 100 ml, mixte, 380 DH), **Glacier Bella** (Maison Alhambra, EDP 100 ml, femme, 300 DH). Notes et descriptions plausibles à confirmer.
- Vedettes 3D : Glacier Bella remplace Ana Abiyedh (photo propre, palette rouge/vert d'eau distincte des autres).
- Offre tapis + tasbih : prix 480 DH, promo 400 DH. Variantes d'Ana Abiyedh traduites (Red/Powdery/White, أحمر/بودري/أبيض).
