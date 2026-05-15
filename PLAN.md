# Calorie Tracker App — MVP Build Plan

## Goal
Build a modern, feature-rich calorie tracking app with food photo recognition, daily logs, nutritional breakdowns, and real-time analytics.

## Stack
- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS v3
- **Image Recognition:** Clarifai API or placeholder for demo (can be upgraded to OpenAI Vision or Google Cloud Vision)
- **Storage:** Browser localStorage (can upgrade to Firebase/Supabase)
- **Charts:** Recharts for data visualization
- **Forms:** React Hook Form + Zod validation
- **Styling:** Tailwind + Lucide React icons
- **Deploy:** Vercel

## File Tree
- `app/layout.tsx` — root layout + navigation
- `app/globals.css` — Tailwind directives
- `app/page.tsx` — dashboard home with daily summary
- `app/add-food/page.tsx` — food entry with camera/upload + AI recognition
- `app/history/page.tsx` — daily/weekly/monthly food log
- `app/nutritional-breakdown/page.tsx` — macros pie chart, nutrient breakdown
- `app/settings/page.tsx` — daily calorie goal, dietary restrictions, profile
- `components/FoodCard.tsx` — reusable food log entry card
- `components/NutritionChart.tsx` — pie/bar chart for macros
- `components/ProgressBar.tsx` — visual daily progress
- `components/Camera.tsx` — camera capture UI
- `lib/foodDatabase.ts` — hardcoded food calorie data (demo)
- `lib/storage.ts` — localStorage wrapper
- `lib/calculations.ts` — macro/calorie math utilities
- `types/index.ts` — TypeScript interfaces
- `package.json` — dependencies (Next.js, React, Tailwind, Recharts, React Hook Form, Zod, Lucide)

## Data / API
- **Food Database:** Local JSON + hardcoded high-frequency foods (demo phase)
- **Image Recognition:** Placeholder for Clarifai/OpenAI Vision (can integrate later)
- **Storage:** Browser localStorage for user entries + settings
- **No backend required** for MVP (can add Firebase/Supabase later)

## Open Questions & Defaults
- **Image Recognition Service:** Using placeholder demo → User can later connect Clarifai/OpenAI Vision API keys
- **Database:** Browser localStorage → Can upgrade to Firebase
- **Auth:** No authentication → Can add Firebase Auth later
- **Serving:** Pre-loaded food database with 200+ common foods → User can add custom entries

---

**Next Steps:** Write package.json → tsconfig → build the app structure → add features incrementally.
