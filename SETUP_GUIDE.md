# PlayNBuild V2 — publishing & private editing

This version gives you:
- A public PlayNBuild website.
- A private `/admin/` dashboard.
- Email/password login.
- Database-backed challenges, science articles, facts, concepts and YouTube links.
- Row Level Security so only your authorised email can add/delete content.

## A. Create the database
1. Create a free Supabase project.
2. Go to Authentication > Users and create your own email/password account.
3. Open SQL Editor.
4. Open `supabase_setup.sql`.
5. Replace every `YOUR_EMAIL` with the exact email you use for your admin account.
6. Run the SQL.

## B. Connect the website
1. In Supabase open Project Settings > API.
2. Copy the Project URL and the public/anon key.
3. Put them in `config.js`:
   SUPABASE_URL: "..."
   SUPABASE_ANON_KEY: "..."
4. Do NOT use the service_role key.

## C. Test it
Open `index.html`. It will use the database when config.js has real values.
Open `admin/index.html`. Sign in with your Supabase account.
Create a challenge. Refresh the public page: the challenge should appear.

## D. Publish it
Upload the whole folder to a static host such as Netlify, Vercel, Cloudflare Pages or GitHub Pages.
Your public address can then use a custom domain such as playnbuild.com.
The `/admin/` URL remains private because database write permissions require your authenticated email.

## E. Important security note
The public website can show published content, and the Supabase anon key can be visible in browser code. That is normal for Supabase. The security boundary is Row Level Security. Never expose the service_role key.

## What to build next
- Image upload for posts
- YouTube thumbnail importing
- Edit existing posts (currently create/delete; update can be added)
- Draft/published toggle
- Categories and search
- Visitor scores and leaderboards
- Analytics
- SEO pages for individual challenges/articles
