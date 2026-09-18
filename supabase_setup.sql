-- PLAYNBUILD DATABASE SETUP
-- 1) In Supabase, create your project.
-- 2) Create your own account under Authentication > Users.
-- 3) Replace YOUR_EMAIL below with the exact email of the only person who may edit.
-- 4) Run this entire script in SQL Editor.

create table if not exists public.challenges (
 id uuid primary key default gen_random_uuid(),
 title text not null, question text not null,
 option_a text not null, option_b text not null, option_c text, option_d text,
 correct_index integer not null default 0,
 difficulty text default 'EASY', category text default 'LOGIC',
 published boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.articles (
 id uuid primary key default gen_random_uuid(), title text not null, body text not null,
 published boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.facts (
 id uuid primary key default gen_random_uuid(), title text not null, body text not null,
 published boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.concepts (
 id uuid primary key default gen_random_uuid(), title text not null, body text not null, icon text,
 published boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.videos (
 id uuid primary key default gen_random_uuid(), title text not null, youtube_url text not null,
 description text, emoji text, published boolean not null default true, created_at timestamptz not null default now()
);

alter table public.challenges enable row level security;
alter table public.articles enable row level security;
alter table public.facts enable row level security;
alter table public.concepts enable row level security;
alter table public.videos enable row level security;

-- Public visitors can read published content only.
create policy "public read challenges" on public.challenges for select using (published = true);
create policy "public read articles" on public.articles for select using (published = true);
create policy "public read facts" on public.facts for select using (published = true);
create policy "public read concepts" on public.concepts for select using (published = true);
create policy "public read videos" on public.videos for select using (published = true);

-- ONLY YOUR EMAIL can create/update/delete.
-- Change YOUR_EMAIL in each policy below.
create policy "owner insert challenges" on public.challenges for insert with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner update challenges" on public.challenges for update using ((auth.jwt()->>'email') = 'YOUR_EMAIL') with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner delete challenges" on public.challenges for delete using ((auth.jwt()->>'email') = 'YOUR_EMAIL');

create policy "owner insert articles" on public.articles for insert with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner update articles" on public.articles for update using ((auth.jwt()->>'email') = 'YOUR_EMAIL') with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner delete articles" on public.articles for delete using ((auth.jwt()->>'email') = 'YOUR_EMAIL');

create policy "owner insert facts" on public.facts for insert with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner update facts" on public.facts for update using ((auth.jwt()->>'email') = 'YOUR_EMAIL') with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner delete facts" on public.facts for delete using ((auth.jwt()->>'email') = 'YOUR_EMAIL');

create policy "owner insert concepts" on public.concepts for insert with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner update concepts" on public.concepts for update using ((auth.jwt()->>'email') = 'YOUR_EMAIL') with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner delete concepts" on public.concepts for delete using ((auth.jwt()->>'email') = 'YOUR_EMAIL');

create policy "owner insert videos" on public.videos for insert with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner update videos" on public.videos for update using ((auth.jwt()->>'email') = 'YOUR_EMAIL') with check ((auth.jwt()->>'email') = 'YOUR_EMAIL');
create policy "owner delete videos" on public.videos for delete using ((auth.jwt()->>'email') = 'YOUR_EMAIL');

-- IMPORTANT:
-- Never put a Supabase service_role key in this website.
-- The anon/public key belongs in config.js; RLS is what protects your content.
