# Supabase Setup

This project can now work on free static hosting by storing admin products in Supabase.

## 1. Create `.env.local`

Copy `.env.example` to `.env.local` and fill in your own values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_luP6S90j6O7B4p3RTwwkTA_CHdb7CKI
VITE_SUPABASE_ADMIN_EMAIL=ulypkhandauryenai@gmail.com
VITE_SUPABASE_STORAGE_BUCKET=product-images
```

Notes:

- Use the publishable key only.
- Do not put the secret key into the frontend.
- `VITE_SUPABASE_ADMIN_EMAIL` should match the admin user you create in Supabase Auth.

## 2. Create the database and storage rules

1. Open Supabase.
2. Go to `SQL Editor`.
3. Run everything from `supabase/setup.sql`.

This creates:

- `products` table
- `product-images` storage bucket
- RLS policies for public read and authenticated admin write access

## 3. Create the admin user

1. Go to `Authentication` -> `Users`.
2. Add one admin user manually.
3. Use the same email that you put into `VITE_SUPABASE_ADMIN_EMAIL`.
4. Set the admin password there.

Recommended:

- Disable public sign-ups in Supabase Auth so random users cannot create accounts.

## 4. Restart the project locally

```powershell
npm run dev
```

## 5. How login works now

- Client side reads products directly from Supabase.
- The hidden admin button signs in with Supabase Auth.
- Admin-added products are saved to the `products` table.
- Product photos are uploaded to the `product-images` bucket.
- Clients see the same shared catalog immediately.

## 6. Free hosting

After this setup, you can host the frontend on free static hosting such as Vercel or Netlify.
Because product data lives in Supabase, refresh and redeploy will not remove admin-added products.