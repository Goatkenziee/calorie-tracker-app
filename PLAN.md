# Calorie Tracker App – Technical Plan

## Goal
Build a modern, mobile-first calorie tracking app with food-photo capture, manual logging, real-time tracking, and a clean, easy-to-read UI.

## Stack
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** TailwindCSS 3
- **State:** Zustand (lightweight)
- **Photo Capture:** Native HTML5 `<input type="file">` + Canvas preview
- **AI Recognition:** Cloudinary or simple placeholder (can upgrade to Clarifai/Google Vision later)
- **Storage:** Browser localStorage (persists across sessions)
- **Deploy:** Vercel

## File Tree
- `package.json` — dependencies + scripts
- `tsconfig.json` — TypeScript config
- `tailwind.config.ts` — TailwindCSS config
- `postcss.config.js` — PostCSS config
- `next.config.mjs` — Next.js config
- `app/layout.tsx` — root layout + provider
- `app/globals.css` — base styles + Tailwind directives
- `app/page.tsx` — home/dashboard (main tracker)
- `app/log-meal/page.tsx` — meal logging (manual entry + photo)
- `components/CalorieTracker.tsx` — real-time progress display
- `components/MealList.tsx` — today's meals in a clean list
- `components/FoodPhotoCapture.tsx` — camera input + preview
- `components/GoalSettings.tsx` — set daily calorie target
- `lib/store.ts` — Zustand store (meals, goal, theme)
- `lib/utils.ts` — helper functions (calorie math, localStorage)
- `README.md` — setup & usage

## Data / API
- **localStorage:** Stores daily meals, calorie goal, user preferences
- **No external API required initially** (photo recognition can be mocked; upgrade path exists)
- **Photo handling:** File input + Canvas for preview; can be sent to Cloudinary or stored as base64

## Open Questions (Defaults Chosen)
1. **Daily calorie goal?** → Default 2000 kcal (user can adjust in app)
2. **Photo recognition?** → Placeholder mode (user estimates calories); can integrate Clarifai/Google Vision later
3. **Meal categories?** → Breakfast, Lunch, Dinner, Snacks (predefined in UI)
4. **Dark mode?** → Yes, toggle in header (default: dark)
5. **Mobile-first?** → Yes, responsive for all screen sizes
