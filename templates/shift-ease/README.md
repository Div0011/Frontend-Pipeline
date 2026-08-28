# ShiftEase by Sheetal

A modern, high-performance packers-and-movers business directory and direct service booking platform built with Next.js 14+.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **Animations:** Framer Motion
- **Forms & Validation:** React Hook Form and Zod
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** NextAuth.js
- **CMS/Admin:** Custom Admin Dashboard at `/admin`
- **Deployment:** Vercel
- **Maps:** Google Maps API or Mapbox
- **Communication:** Resend (email) and Twilio (SMS)
- **Analytics:** Vercel Analytics and Google Analytics 4

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required values
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3460](http://localhost:3460) in your browser.

## Project Structure

```
shift-ease/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with header, footer, and WhatsApp button
│   ├── page.tsx            # Homepage
│   ├── cities/             # City landing pages
│   ├── directory/          # Business directory with search and filters
│   ├── quote/              # Multi-step instant quote calculator
│   ├── list-your-business/ # Vendor onboarding form
│   ├── blog/               # SEO content hub
│   ├── about/              # Company story
│   ├── contact/            # Contact form and info
│   ├── privacy-policy/     # Privacy policy page
│   ├── terms-of-service/   # Terms of service page
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   └── sitemap.ts          # Auto-generated sitemap
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, Footer, WhatsAppButton
│   ├── sections/           # Page sections (Hero, TrustBar, etc.)
│   └── shared/             # Reusable components (BusinessCard, SEOHead, etc.)
├── lib/                    # Utility functions, data, and validations
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with parallax hero, trust bar, how-it-works, city cards, reviews |
| `/cities/[city-slug]` | Dynamic city landing pages with price guides and company listings |
| `/directory` | Searchable business directory with filters |
| `/quote` | Multi-step instant quote calculator |
| `/list-your-business` | Vendor onboarding application |
| `/blog` | SEO content hub |
| `/about` | Company story and values |
| `/contact` | Contact form and support |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |
| `/admin` | Admin dashboard for approvals and lead management |

## SEO & Performance

- Unique titles and meta descriptions on every page
- Open Graph and Twitter Card tags
- Auto-generated sitemap
- Schema.org markup (LocalBusiness, FAQPage, Review, BreadcrumbList)
- Next.js Image optimization (WebP/AVIF)
- Lazy loading for images
- WCAG 2.1 AA accessibility compliance
- Target Lighthouse scores of 90+

## Database Schema

- **Users:** id, email, phone, role, created_at
- **Cities:** id, slug, name, state, image_url, avg_price_1bhk_local
- **Companies:** id, slug, name, owner_name, gstin, city_id, address, phone, email, website, years_in_business, services, logo_url, cover_url, is_verified, status, created_at
- **Reviews:** id, company_id, user_id, rating, text, move_date, is_verified, created_at
- **Quotes:** id, from_city, to_city, home_size, inventory, move_date, customer_name, email, phone, estimated_price_min, estimated_price_max, status
- **Leads:** id, company_id, name, email, phone, message, created_at

## Seed Data

The project includes seed data with:
- 3 cities: Delhi, Mumbai, Bangalore
- 5 verified companies per city (15 total)

## License

ISC
