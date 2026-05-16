import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calorie Tracker | Food Photo Recognition',
  description: 'Modern calorie tracking app with food photo capture and real-time tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
