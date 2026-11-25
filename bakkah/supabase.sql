-- =========================================================
-- Base de données du site BAKKAH
-- A coller dans Supabase -> SQL Editor -> Run (NON exécuté pour l'instant).
-- Toutes les données sont stockées en JSON (colonne "data") : ajouter un champ
-- dans l'espace vendeur ne demande aucune modification de la base.
-- Ex. : le champ "visible" (booléen, dans data des produits ; absent = visible)
-- masque un article de la boutique. Aucune migration nécessaire.
-- =========================================================

-- Réglages du site (une seule ligne, id = 1) : textes, liens, WhatsApp, devise, FAQ, images...
create table if not exists public.reglages (
  id   integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb
);
insert into public.reglages (id) values (1) on conflict do nothing;

-- Catégories
create table if not exists public.categories (
  id    text primary key,
  ordre integer not null default 0,
  data  jsonb not null default '{}'::jsonb
);

-- Articles
create table if not exists public.produits (
  id         text primary key,
  ordre      integer not null default 0,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Inscriptions newsletter (facultatif)
create table if not exists public.newsletter (
  id         bigint generated always as identity primary key,
  email      text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_email_format check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' and char_length(email) between 6 and 254)
);
-- Si la table existe déjà : alter table public.newsletter add constraint newsletter_email_format check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' and char_length(email) between 6 and 254) not valid;

-- Sécurité : tout le monde LIT le site, seul le vendeur connecté MODIFIE
alter table public.reglages   enable row level security;
alter table public.categories enable row level security;
alter table public.produits   enable row level security;
alter table public.newsletter enable row level security;

drop policy if exists "lecture publique" on public.reglages;
drop policy if exists "gestion vendeur"  on public.reglages;
create policy "lecture publique" on public.reglages for select using (true);
create policy "gestion vendeur"  on public.reglages for all to authenticated using (true) with check (true);

drop policy if exists "lecture publique" on public.categories;
drop policy if exists "gestion vendeur"  on public.categories;
create policy "lecture publique" on public.categories for select using (true);
create policy "gestion vendeur"  on public.categories for all to authenticated using (true) with check (true);

drop policy if exists "lecture publique" on public.produits;
drop policy if exists "gestion vendeur"  on public.produits;
create policy "lecture publique" on public.produits for select using (true);
create policy "gestion vendeur"  on public.produits for all to authenticated using (true) with check (true);

-- Newsletter : tout visiteur peut s'inscrire, seul le vendeur lit la liste
drop policy if exists "inscription publique" on public.newsletter;
drop policy if exists "lecture vendeur"      on public.newsletter;
create policy "inscription publique" on public.newsletter for insert with check (true);
create policy "lecture vendeur"      on public.newsletter for select to authenticated using (true);

-- Photos (logo, boutique, articles)
insert into storage.buckets (id, name, public) values ('photos', 'photos', true) on conflict (id) do nothing;
drop policy if exists "photos lecture publique" on storage.objects;
drop policy if exists "photos envoi vendeur" on storage.objects;
drop policy if exists "photos suppression vendeur" on storage.objects;
create policy "photos lecture publique"    on storage.objects for select using (bucket_id = 'photos');
create policy "photos envoi vendeur"       on storage.objects for insert to authenticated with check (bucket_id = 'photos');
create policy "photos suppression vendeur" on storage.objects for delete to authenticated using (bucket_id = 'photos');

-- Compte vendeur : à créer dans Supabase -> Authentication -> Users (e-mail + mot de passe choisis par le vendeur).
