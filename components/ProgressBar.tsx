'use client'

interface ProgressBarProps {
  current: number
  goal: number
  label: string
  color?: string
}

export function ProgressBar({ current, goal, label, color = 'bg-green-500' }: ProgressBarProps) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0
  const isOverGoal = current > goal

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-semibold ${isOverGoal ? 'text-red-600' : 'text-gray-600'}`}>
          {Math.round(current)} / {goal}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color} ${isOverGoal ? 'bg-red-500' : color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
