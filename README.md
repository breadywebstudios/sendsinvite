# Invitation Studio

A website for sending animated invitations and collecting RSVPs. Hosts sign in, build an invitation
from one of twelve occasion themes and share a link. Guests open the link and reply with no account.

## Layout

- `public/` is the website. Everything in it is served as is, with no build step on the server.
- `public/config.js` holds the Supabase project address and publishable key. Both are safe to publish:
  the access rules in the database decide what each visitor may do.
- `supabase/schema.sql` sets up the database: tables, access rules, guest functions and photo storage.
- `src/` (the app) and `site/site.js` (sign-in, saving and uploads for the open web) are the source.
- `art/out/` holds the artwork that the build copies into `public/art/`.

## Deploying

Every push to `main` that changes `public/` publishes the site to GitHub Pages through
`.github/workflows/pages.yml`. In the repository settings, Pages must use "GitHub Actions" as its source.

After the first deploy, set the Site URL under Authentication, URL Configuration in Supabase to the
website address, so sign-up and password reset emails link back to the site.

## Changing the app

Edit `src/app.js`, `src/app.css` or `site/site.js`, then rebuild `public/`:

```
python3 build_site.py
```

This needs Python 3 with Pillow. An existing `public/config.js` is kept.

## How it works

- Hosts create an account with email and password. Each host sees only their own invitations and replies.
- A guest link looks like `https://your-site/#i-abc123`. Anyone with the link can open that one invitation.
- A guest's reply is tied to a private key kept in their browser, so they can change it later from the same device.
- Photos a host uploads are scaled down in the browser and stored in the `inv-photos` storage bucket.
- Library photos are free to use under the Unsplash and Pexels licences. Sources are in `public/photos/CREDITS.md`.
