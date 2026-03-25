# Micro Tool Lab

Mobile-first app for organizing, rating, and iterating on micro-tool ideas.

## What it does

- Groups ideas by industry category
- Opens a detail sheet on tap
- Rates each idea with 1 to 3 stars
- Hides 1-star ideas from the main list automatically
- Filters to 2-star only or 3-star only views
- Lets you add or edit ideas
- Supports a random one-at-a-time review mode that auto-advances after rating
- Saves to Supabase with anonymous access when env vars are set

## Local setup

1. Create a Supabase project.
2. Apply `supabase/migrations/0001_create_micro_tool_ideas.sql`.
3. Copy `.env.example` to `.env` and fill in:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Install dependencies if needed.
5. Run `npm run dev`.

If the Supabase env vars are missing, the app falls back to local storage so the UI still works.

## Deploying to Vercel

This app is ready to deploy as a standalone Vite project.

1. In Vercel, import the `micro-tool-lab` folder as the project root.
2. Use these settings if Vercel does not auto-detect them:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add these environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy.

The included `vercel.json` keeps the app deployable as a single-page web app from this folder, which avoids pulling in the sibling projects in the parent workspace.
