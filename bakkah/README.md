# Client : BAKKAH — boutique de luxe (parfums, abayas, cadeaux)

Site e-commerce one-page : expérience 3D scrollée (flacons de parfum procéduraux three.js, GSAP, Lenis), catalogue en **niches en arche** (mur d'étagères), panier et **commande par WhatsApp**, plus un **espace vendeur** qui gère tout le contenu.

| Fichier | Rôle |
|---|---|
| `index.html` | Le site que voient les clients (structure) |
| `css/style.css` | Thème noir & or, niches en arche, responsive |
| `js/main.js` | Loader, scroll Lenis, timeline GSAP (11 étapes adaptées), HUD, menu, entrées (drag, wheel, tactile) |
| `js/scene.js` | Scène three.js : flacons (verre physique, liquide teinté, bouchon or), podiums or, spots, bloom, teinte d'environnement |
| `js/fx.js` | Fonds animés (fumée d'oud + poussière dorée) teintés à la couleur du parfum |
| `js/audio.js` | Sons synthétisés en Web Audio (aucun fichier audio, désactivés par défaut) |
| `js/shop.js` | Catalogue, panier, commande WhatsApp, FAQ, newsletter, footer |
| `admin.html` | Espace vendeur (articles, catégories, promos, vedettes 3D, textes FR/AR, FAQ, logo/photos, liens, WhatsApp, devise, sauvegarde) |
| `data.js` | Couche de données (Supabase ou mode local), langues, prix « sur demande », format DH |
| `i18n-data.js`, `catalog-data.js` | **Générés** depuis `contenu/i18n.json` et `contenu/produits.json` par `contenu/generer.py` (textes 3 langues, 10 parfums + articles démo) |
| `contenu/` | Source des textes trilingues et des produits (Communication) + `generer.py`. Après modification d'un JSON : `cd contenu && python3 generer.py` |
| `config.js` | Connexion Supabase (vide = mode local), `siteUrl` / `ogImage` pour l'URL absolue de l'aperçu de partage |
| `supabase.sql` | Base de données Supabase (**non exécuté**) |
| `GUIDE-COMMERCANT.md` | Mode d'emploi du vendeur |
| `assets/img/` | Logo, photos de la boutique (compressées), favicons |
| `assets/img/produits/` | Visuels des 10 parfums (captures Instagram recadrées ; Ateeq, Sehr Lattafa et Glacier Bella détourés depuis une capture vidéo, sans personne) |

## Tester en local
```
cd clients/bakkah
python3 -m http.server 8000
```
Site : http://localhost:8000/index.html — Espace vendeur : http://localhost:8000/admin.html  
(Il faut un serveur HTTP : les modules ES ne fonctionnent pas en `file://`. Internet est nécessaire pour les CDN three / GSAP / Lenis / polices.)  
Option de test : `index.html?lp=1` force le mode « basse puissance » (sans verre transmissif ni post-traitement), `?lp=0` force le mode complet.

## Mode local (actuel)
`config.js` est vide : tout fonctionne sans serveur avec des données de démonstration. Les modifications de l'espace vendeur sont enregistrées dans le navigateur (localStorage) et se reflètent sur le site ouvert dans le même navigateur (la page se recharge automatiquement). Pas adapté à la vraie boutique : il faut Supabase pour que les clients voient les changements.
Mot de passe de l'espace vendeur en mode local : choisi à la première visite de `admin.html` (haché dans le navigateur, **aucun mot de passe n'est écrit dans les fichiers**). C'est une protection légère, pas une vraie sécurité.

## Mise en ligne réelle (à faire plus tard, avec l'accord du client — règle 8)
1. Créer un projet Supabase (région Europe).
2. SQL Editor : coller `supabase.sql` puis Run.
3. Authentication → Users : créer le compte du vendeur ; désactiver les inscriptions libres.
4. Copier l'URL et la clé `anon public` dans `config.js`.
5. Héberger le dossier (site statique).
6. Se connecter à `admin.html` (e-mail + mot de passe du compte Supabase).

## Langues (v2)
Arabe (RTL complet), anglais, français. Sélecteur AR / EN / FR dans la barre de navigation et le menu mobile. Choix mémorisé (`localStorage bk_lang`) ; sans choix, langue du navigateur (repli français). `?lang=ar|en|fr` force la langue (utile pour partager un lien). Le changement de langue **recharge la page** (la scène 3D et les étiquettes de flacons sont reconstruites dans la bonne langue). Tous les textes (y compris panier, boutons, WhatsApp, FAQ) sont modifiables dans l'espace vendeur en 3 champs ; articles et catégories ont nom + description en 3 langues (repli sur le français si vide). L'espace vendeur est en français.

## Données du client (v2)
WhatsApp `212671501152`, téléphone `+212 6 71 50 11 52`, devise « DH » (« درهم » en arabe ; l'anglais affiche aussi « DH » alors que `contenu/i18n.json` proposait « MAD »), Instagram `b.bakka1`, TikTok `@b.bakka1`. **Facebook : lien provisoire** `https://www.facebook.com/search/top?q=BAKKAH` (recherche) en attendant l'URL exacte de la page. Snapchat, Avis Google et Itinéraire : vides, donc masqués. Tous les prix sont vides : le site affiche « Prix sur demande » et le message WhatsApp indique « prix à confirmer ». Les articles hors parfums sont des exemples (`demo`, badge « Exemple ») issus de `contenu/produits.json` ; les anciens articles de démo de la v1 (prix en euros inventés) ont été retirés. Notes d'Ana Abiyedh et de Philos Messenger : « à confirmer ».

## Hébergement statique (GitHub Pages, raw.githack, jsDelivr)
Tous les chemins sont relatifs ; aucun serveur spécial. Les modules ES exigent un vrai HTTP(S) (pas `file://`). Pour l'aperçu WhatsApp/Facebook, renseigner l'URL absolue du site dans `config.js > siteUrl` et remplacer `og:image` dans `index.html` (les robots de partage ne lisent pas le JavaScript). Les données locales de la v1 (clés `bk_*`) sont ignorées : la v2 utilise `bk2_*`.

## Reste à fournir par le client
Prix et stocks réels, URL exacte de la page Facebook, lien Avis Google et Itinéraire Maps (facultatifs), adresse et horaires, mentions légales / CGV / confidentialité, relecture de l'arabe par un locuteur marocain, notes olfactives manquantes, photos des articles hors parfums, réponses FAQ à confirmer (paiement à la livraison, délais, retours).

## Choix techniques notables
- Aucun asset de la marque Ciao Energy : flacons 100 % procéduraux, environnement `RoomEnvironment`, sons synthétisés, fonds animés générés.
- Le scroll ne bouge pas le DOM : 8 espaceurs (125svh) + couches fixes affichées par ScrollTrigger ; une timeline GSAP en pause pilote caméra/flacons.
- Après le packshot, la section boutique (catalogue, FAQ, footer) défile **normalement** ; le canvas 3D est mis en pause. Pas de boucle infinie (voir écarts dans le rapport).
- Bascule AR / EN / FR par rechargement de page (RTL pour l'arabe) ; tous les textes éditables dans l'espace vendeur.

## Version 3 (valeurs provisoires)
Prix DH provisoires sur tous les articles (promos : Officer, Abaya noire, Montre dorée, Offre parfum + bakhour), genres des parfums, notes provisoires Ana Abiyedh/Philos, illustrations SVG originales (`assets/img/articles/`, script `contenu/generer_images.py`), liens filtrés (https/http/tel/mailto), newsletter anti-abus (honeypot + délai 3 s + contrainte SQL), correctifs HUD/slogan/cibles tactiles. Tout est remplaçable via admin.html.
