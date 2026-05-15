import type { Metadata } from 'next'
import { Zap, Home, BarChart3, Utensils, Settings } from 'lucide-react'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'CalorieMate - Track Your Nutrition',
  description: 'Modern calorie and nutrition tracker with AI food recognition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex flex-col min-h-screen">
          {/* Main Content */}
          <main className="flex-1 pb-24 md:pb-0">
            {children}
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
            <div className="flex justify-around items-center h-20">
              <Link href="/" className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50 transition-colors">
                <Home size={24} />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link href="/add-food" className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50 transition-colors bg-green-50">
                <Zap size={24} className="text-green-500" />
                <span className="text-xs mt-1">Add Food</span>
              </Link>
              <Link href="/history" className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50 transition-colors">
                <Utensils size={24} />
                <span className="text-xs mt-1">History</span>
              </Link>
              <Link href="/nutritional-breakdown" className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50 transition-colors">
                <BarChart3 size={24} />
                <span className="text-xs mt-1">Analytics</span>
              </Link>
              <Link href="/settings" className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-50 transition-colors">
                <Settings size={24} />
                <span className="text-xs mt-1">Settings</span>
              </Link>
            </div>
          </nav>

          {/* Desktop Header */}
          <header className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="text-green-500" size={28} />
                <h1 className="text-2xl font-bold text-gray-900">CalorieMate</h1>
              </div>
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/add-food" className="text-gray-600 hover:text-gray-900 transition-colors">Add Food</Link>
                <Link href="/history" className="text-gray-600 hover:text-gray-900 transition-colors">History</Link>
                <Link href="/nutritional-breakdown" className="text-gray-600 hover:text-gray-900 transition-colors">Analytics</Link>
                <Link href="/settings" className="text-gray-600 hover:text-gray-900 transition-colors">Settings</Link>
              </nav>
            </div>
          </header>
        </div>
      </body>
    </html>
  )
}
