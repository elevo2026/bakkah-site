/* =========================================================
   CONFIGURATION DU SITE - BAKKAH
   Laisser supabaseUrl vide = MODE LOCAL : le site marche sans serveur, avec le catalogue
   par défaut. Les modifications faites dans admin.html sont alors enregistrées seulement
   dans CE navigateur (localStorage).
   Pour que les modifications soient visibles par tous les clients :
   créer un projet Supabase, exécuter supabase.sql, puis remplir ci-dessous
   (Project Settings -> API). La clé "anon public" est faite pour être publique.
   Ne jamais écrire de mot de passe ici.
   ========================================================= */
window.SITE_CONFIG = {
  supabaseUrl: "",      // ex. "https://abcdefgh.supabase.co"
  supabaseAnonKey: "",  // clé "anon public"
  /* URL publique ABSOLUE du site (avec dossier, terminée par /), ex. "https://bakkah.example/clients/bakkah/".
     Sert à fabriquer l'URL absolue de og:image / og:url (aperçu WhatsApp, Facebook).
     Vide = chemins relatifs (le site marche quand même ; seul l'aperçu de partage en pâtit). */
  siteUrl: "",
  ogImage: "assets/img/produits/officer.jpg"   // image de partage (chemin relatif à siteUrl)
};
