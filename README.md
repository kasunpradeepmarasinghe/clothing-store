# ELARA Clothing Store

Minimal Next.js clothing store with dark luxury aesthetic. Inspired by Bayleee.com.

## Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: AWS Amplify
- **Images**: AWS S3 + CloudFront
- **Email**: AWS SES (future)

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Supabase
1. Go to https://supabase.com and create a free project
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Copy your Project URL and anon key from Settings → API

### 3. Environment variables
```bash
cp .env.local.example .env.local
```
Fill in your values in `.env.local`

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Deploy to AWS Amplify

1. Push your code to GitHub
2. Go to AWS Amplify console → New App → Host Web App
3. Connect your GitHub repo
4. Amplify auto-detects Next.js and uses `amplify.yml`
5. Add environment variables in Amplify console → Environment variables
6. Deploy!

---

## Adding Real Products

Replace mock data in `src/lib/mock-data.ts` OR connect Supabase:

In `src/app/shop/page.tsx`, swap mock data with:
```ts
const { data: products } = await supabase.from('products').select('*')
```

## AWS S3 for Images

1. Create S3 bucket in `ap-south-1` (cheapest for Sri Lanka)
2. Enable public access for product images
3. Upload images and use the URL in your product records
4. Update `NEXT_PUBLIC_S3_BUCKET_URL` in env

---

## Cost Breakdown (< 1,000 visitors/month)
| Service | Cost |
|---|---|
| AWS Amplify | ~$1-3/mo |
| Supabase | Free (500MB) |
| S3 + CloudFront | < $1/mo |
| Route 53 | $0.50/mo |
| **Total** | **~$3-5/mo** |

## Pages
- `/` — Homepage with hero + featured products
- `/shop` — All products with category filter
- `/shop/[slug]` — Product detail with size guide + WhatsApp order
- `/cart` — Cart review + checkout with COD
