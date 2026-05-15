'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface NutritionChartProps {
  protein: number
  carbs: number
  fat: number
}

export function NutritionChart({ protein, carbs, fat }: NutritionChartProps) {
  // Convert grams to calories
  const proteinCals = protein * 4
  const carbsCals = carbs * 4
  const fatCals = fat * 9

  const data = [
    { name: 'Protein', value: proteinCals, percentage: Math.round((proteinCals / (proteinCals + carbsCals + fatCals)) * 100) || 0 },
    { name: 'Carbs', value: carbsCals, percentage: Math.round((carbsCals / (proteinCals + carbsCals + fatCals)) * 100) || 0 },
    { name: 'Fat', value: fatCals, percentage: Math.round((fatCals / (proteinCals + carbsCals + fatCals)) * 100) || 0 },
  ]

  const COLORS = ['#EF4444', '#FBBF24', '#8B5CF6']

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${Math.round(value as number)} kcal`, '']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="text-center">
            <div
              className="inline-block w-4 h-4 rounded-full mb-2"
              style={{ backgroundColor: COLORS[index] }}
            />
            <p className="text-sm font-semibold text-gray-700">{item.name}</p>
            <p className="text-lg font-bold" style={{ color: COLORS[index] }}>
              {item.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
