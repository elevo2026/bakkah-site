# Votre espace vendeur BAKKAH — mode d'emploi

Ouvrez **votre-site/admin.html** (sur téléphone ou ordinateur). La première fois, choisissez un mot de passe et gardez-le précieusement. Touchez **Voir le site** pour contrôler le résultat.

## Les onglets
**Articles** — tout votre catalogue.
- **+ Nouvel article** : nom et description en **3 langues** (FR / EN / AR ; un champ EN ou AR vide reprend le français), catégorie, marque, contenance, prix, photos, notes olfactives en 3 langues. **Prix vide = « Prix sur demande »** sur le site et dans le message WhatsApp. Sans photo, un visuel or & noir est affiché. La case « Article d'exemple » affiche le badge « Exemple » : décochez-la (ou supprimez l'article) pour vos vrais produits.
- **Variantes** : taille (S, M, L…), senteur, contenance… Une variante par ligne : `français | anglais | arabe | prix` (tout sauf le français est facultatif), ex. `100 ml | 100 ml | 100 مل | 129`.
- **Prix promo** : remplissez-le (ou un % de réduction) : le prix barré et l'étiquette -% apparaissent, et l'article entre dans « Promos ».
- **Disponible** : décochez pour marquer un article indisponible. **Stock** : limite les quantités commandables.
- Flèches ↑ ↓ : ordre d'affichage.

**Catégories** — renommer (FR / EN / AR), réordonner, masquer, ajouter. « Promos » se remplit toute seule. Pour les parfums, les filtres Homme / Femme / Mixte sont automatiques.

**Promos** — tableau rapide pour mettre ou retirer des promotions.

**Parfums vedettes 3D** — choisissez les parfums (6 recommandés) qui tournent en 3D en haut du site. Pour chacun : couleur primaire et secondaire (elles colorent tout le site) et les notes de tête / cœur / fond.

**Textes & FAQ** — tous les titres et textes du site (accueil, engagements, catalogue, pied de page, mentions légales) **en arabe, anglais et français** (3 champs par texte, y compris le panier, les boutons, le message WhatsApp, le pied de page), et la foire aux questions. Un champ de recherche permet de retrouver un texte. Videz un champ pour retrouver le texte d'origine de cette langue.

**Logo & photos** — logo, image de partage et 5 photos de la boutique.

**Liens & contact** — **numéro WhatsApp qui reçoit les commandes** (indicatif pays, sans + ni espaces : `212671501152`), devise (laisser vide : « DH » en français/anglais, « درهم » en arabe), téléphone, adresse, horaires, Instagram, TikTok, Snapchat, Facebook, Avis Google, Itinéraire. Un lien laissé vide disparaît du site. Le lien Facebook actuel est provisoire (recherche « BAKKAH ») : remplacez-le par l'adresse exacte de votre page.

**Données & sécurité** — sauvegarde/restauration, liste des inscrits à la newsletter, changement de mot de passe.

## Recevoir les commandes
Le client choisit sa langue (AR / EN / FR) en haut du site, remplit son panier et touche **Commander via WhatsApp** : un message déjà rédigé (articles, variantes, quantités, prix en DH ou « prix sur demande », total, nom et adresse s'il les a indiqués) dans la langue du client arrive sur votre WhatsApp. Répondez-lui pour confirmer le paiement et la livraison.

## Bon à savoir
- Après chaque modification, touchez **Enregistrer** de l'onglet.
- Utilisez des photos légères (le site les réduit automatiquement).
- Tant que la base de données en ligne n'est pas branchée, les modifications ne sont visibles que sur l'appareil où vous les faites. Votre développeur doit brancher Supabase pour la mise en ligne.

## Valeurs provisoires (version 3)
Les **prix**, les notes de Glacier Bella, l'adresse (« Maroc »), les horaires (« Lun–Sam 10h–21h »), les liens Avis Google / Itinéraire et les **illustrations** des articles hors parfums sont **provisoires** : remplacez-les dans l'administration (Articles, Liens & contact, Logo & photos, Textes & FAQ). Seuls les liens commençant par https://, http://, tel: ou mailto: sont acceptés.
