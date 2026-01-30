# Next.js 16 Migration Complete

This Next.js app has been successfully migrated from Pages Router to App Router with Next.js 16 support.

## Environment Variables

Create a `.env.local` file in `apps/isaacyakl-web/` with the following variables:

```bash
# Google Analytics Measurement ID (e.g., G-XXXXXXXXXX)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id-here

# Site URL
NEXT_PUBLIC_SITE_URL=https://isaacyakl.com
```

## Vercel Deployment

Add these environment variables in your Vercel project settings:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_SITE_URL`

## Key Changes Made

### App Router Structure
- Converted from `pages/` to `app/` directory structure
- All page components now use `page.tsx` naming convention
- Dynamic routes now use `[id]` folder structure with `page.tsx`

### Metadata API
- Replaced `next/head` `<Head>` component with Next.js 16 Metadata API
- Each page exports metadata using `export const metadata: Metadata = {...}`
- Dynamic metadata uses `generateMetadata()` function

### Client Components
- Added `"use client"` directive to components using:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (window, document)
  - Event handlers (onClick, onChange)
  - Third-party libraries requiring client-side rendering

### Router Updates
- Replaced `useRouter` from `next/router` with `usePathname` and `useSearchParams` from `next/navigation`
- Used `Suspense` boundaries for components using `useSearchParams()`

### Static Generation
- Replaced `getStaticProps` and `getStaticPaths` with `generateStaticParams()`
- Work detail pages are statically generated at build time

### Error Handling
- Created `error.tsx` for runtime errors (replaces 500 page)
- Created `not-found.tsx` for 404 errors

### Tailwind CSS v4
- Updated to use `@theme` directive for custom colors in CSS
- Configured colors using CSS custom properties instead of tailwind.config.js

### Configuration Updates
- Removed `i18n` config (not supported in App Router)
- Updated next.config.js to remove Pages Router specific options
- Fixed data directory path for markdown files

## Build & Development

```bash
# Development
npx nx serve isaacyakl-web

# Production build
npx nx build isaacyakl-web

# Production preview
npx nx preview isaacyakl-web
```

## File Structure

```
apps/isaacyakl-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts & analytics
│   │   ├── page.tsx             # Homepage
│   │   ├── error.tsx            # Error boundary
│   │   ├── not-found.tsx        # 404 page
│   │   ├── more/
│   │   │   └── page.tsx         # /more route
│   │   ├── resume/
│   │   │   └── page.tsx         # /resume route
│   │   └── work/
│   │       ├── page.tsx         # /work listing
│   │       ├── WorkIndexClient.tsx
│   │       └── [id]/
│   │           └── page.tsx     # /work/[id] detail pages
│   ├── components/              # Reusable components
│   ├── data/                    # Static data & markdown files
│   ├── lib/                     # Utility functions
│   └── types/                   # TypeScript definitions
└── public/                      # Static assets
```

## Notes

- All pages are statically generated at build time for optimal performance
- Google Analytics is loaded only on the client side
- Search functionality on /work page uses client-side URL params with Suspense
- Images are optimized using Next.js Image component
