"use client"

import { motion } from "framer-motion"

interface NicheScoreChartProps {
  profitPotential: number
  marketDemand: number
  competitionScore: number
  overallScore: number
}

export default function NicheScoreChart({
  profitPotential,
  marketDemand,
  competitionScore,
  overallScore,
}: NicheScoreChartProps) {
  const metrics = [
    { label: "Profit", value: profitPotential, color: "bg-green-500" },
    { label: "Demand", value: marketDemand, color: "bg-blue-500" },
    { label: "Low Competition", value: competitionScore, color: "bg-purple-500" },
  ]

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 min-w-[250px]">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-1">{overallScore}</div>
        <div className="text-sm text-gray-600">Overall Score</div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">{metric.label}</span>
              <span className="text-gray-900">{metric.value}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${metric.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${(metric.value / 5) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
