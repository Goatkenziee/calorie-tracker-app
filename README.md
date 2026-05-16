# 🔥 Calorie Tracker App

A modern, easy-to-read calorie tracking application with food photo capture support. Built with Next.js 14, React 18, TypeScript, and TailwindCSS.

## ✨ Features

- **📸 Food Photo Capture** – Take photos or upload images of your meals for quick logging
- **📊 Real-time Calorie Tracking** – Visual circular progress tracker showing daily intake vs. goal
- **🎯 Customizable Daily Goals** – Set and adjust your calorie target with preset options (1200, 1500, 2000, 2500 kcal)
- **📋 Meal Categorization** – Organize meals by type (Breakfast, Lunch, Dinner, Snack)
- **🌙 Dark/Light Mode** – Toggle between dark and light themes for comfortable viewing any time
- **💾 Local Data Persistence** – All meals stored in browser localStorage (no cloud needed)
- **📱 Mobile-First Design** – Fully responsive on phones, tablets, and desktops
- **⚡ Instant Meal Logging** – Quick entry page with meal name, calories, and category
- **🗑️ Edit/Delete Meals** – Remove meals if you made a mistake
- **📈 Calorie Status Indicators** – Clear visual feedback on whether you're under, on-track, or over your goal

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Modern web browser with localStorage support

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd calorie-tracker-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
calorie-tracker-app/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main dashboard page
│   ├── log-meal/
│   │   └── page.tsx         # Quick meal logging page
│   └── globals.css          # Global styles
├── components/
│   ├── CalorieTracker.tsx   # Main tracker with circular progress
│   ├── MealList.tsx         # Display today's meals grouped by category
│   ├── FoodPhotoCapture.tsx # Photo upload with calorie estimation
│   └── GoalSettings.tsx     # Goal and theme settings
├── lib/
│   ├── store.ts            # Zustand state management
│   └── utils.ts            # Helper functions for calorie math
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.mjs
```

## 🎨 UI/UX Highlights

### Dashboard
- **Circular progress indicator** showing % of daily goal consumed
- **Three stat cards** displaying: Consumed, Remaining, Goal
- **Motivational messages** based on current calorie status
- **Sticky header** with date and quick "Log Meal" button
- **Settings panel** for goal adjustment and theme toggle

### Photo Capture
- **Camera/upload buttons** for easy access
- **Image preview** before committing
- **Calorie slider** for portion-size adjustment (50–2000 kcal range)
- **Smart defaults** (300 kcal) to speed up logging

### Meal Logging Page
- **Clean form layout** with meal name, calories, category
- **Emoji-coded categories** for quick visual reference
- **Helpful tips section** with calorie reference data
- **Backend suggestions** for common foods (Apple, Banana, Chicken, etc.)

### Meal List
- **Category grouping** (Breakfast, Lunch, Dinner, Snack)
- **Time stamps** for each meal
- **Photo thumbnails** if captured from camera
- **One-click delete** with visual confirmation
- **Empty state message** when no meals logged

## 🔧 Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| UI Library | React 18 |
| Styling | TailwindCSS 3.4 |
| State Mgmt | Zustand 4.5 |
| Build Tool | Next.js built-in |
| Deployment | Vercel |

## 📱 Data Model

### Meal Object
```typescript
interface Meal {
  id: string                    // Unique identifier (timestamp-based)
  name: string                  // e.g., "Grilled Chicken Salad"
  calories: number              // Total calories
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  timestamp: number             // Milliseconds since epoch
  photoUrl?: string             // Base64 or URL of captured image (optional)
}
```

### Store State
```typescript
{
  meals: Meal[]                 // All meals logged
  dailyGoal: number             // Target calories (default: 2000)
  darkMode: boolean             // Theme preference
}
```

## 🎯 How to Use

### 1. Set Your Daily Goal
- Open **Settings** panel
- Use preset buttons (1200, 1500, 2000, 2500) or enter a custom value
- Goal is saved automatically

### 2. Log a Meal
**Option A: Quick Photo**
- Click "📸 Capture Food Photo"
- Take a photo or upload an image
- Adjust calorie estimate with slider
- Click "Add to Log"

**Option B: Manual Entry**
- Click "+ Log Meal" in header
- Enter meal name (e.g., "2 slices pizza")
- Enter calorie amount
- Select meal category
- Click "Add to Log"

### 3. Track Your Progress
- Dashboard shows real-time circular progress
- Remaining calories calculated automatically
- Visual status indicator (under/on-track/over goal)

### 4. Review & Edit
- All meals appear in "Today's Meals" section
- Grouped by category for easy scanning
- Click delete icon to remove a meal

### 5. Change Theme
- Click sun/moon icon in Settings to toggle dark mode
- Preference saved for next session

## 💾 Data Storage

All data is stored in **browser localStorage** under the key `calorieStore`:
```json
{
  "meals": [ ... ],
  "dailyGoal": 2000,
  "darkMode": true
}
```

**Privacy**: No data is sent to any server. Everything stays on your device.

### Export Your Data
To back up your data, open browser DevTools and run:
```javascript
JSON.parse(localStorage.getItem('calorieStore'))
```

## 🔮 Future Enhancements

- **AI-powered food recognition** – Analyze food photos with computer vision APIs
- **Nutrition breakdown** – Track protein, carbs, fats, fiber
- **Weekly/monthly reports** – Trend analysis and calorie history
- **Barcode scanner** – Quick lookup of packaged foods
- **Meal templates** – Save favorite meals for fast re-logging
- **Multi-day sync** – Cloud backup and cross-device sync
- **Reminders** – Notification prompts to log meals
- **Integration with fitness apps** – Sync with Apple Health, Google Fit

## 🐛 Known Limitations

- **Photo recognition is manual** – You set the calorie estimate, not AI (future enhancement)
- **Mobile camera support** – Works best on recent iOS/Android with HTML5 file input
- **No cloud sync** – Data is per-device; clearing browser cache deletes all meals
- **No user accounts** – Single-device use only

## 📄 License

MIT – Feel free to use, modify, and distribute.

## 🙋 Support & Feedback

Found a bug or have a feature request? Please open an issue on GitHub.

---

**Happy tracking! 🎉 Remember: consistency beats perfection.**
