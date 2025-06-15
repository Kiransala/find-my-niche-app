"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 p-6 shadow-xl">
      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium text-gray-800">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-800">{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index <= currentStep ? "bg-orange-400 shadow-lg" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
