"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, CheckCircle, ExternalLink, Play } from "lucide-react"

interface ActionPlanProps {
  actionSteps: string[]
  resources: string[]
  nicheName: string
}

export default function ActionPlan({ actionSteps, resources, nicheName }: ActionPlanProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-between w-full text-left">
        <div className="flex items-center space-x-3">
          <Play className="h-6 w-6 text-blue-600" />
          <h4 className="text-lg font-semibold text-gray-900">Action Plan: Get Started with {nicheName}</h4>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-600" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-6"
          >
            {/* Action Steps */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Next Steps</h5>
              <div className="space-y-3">
                {actionSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <button
                      onClick={() => toggleStep(index)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                        completedSteps.includes(index)
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      {completedSteps.includes(index) && <CheckCircle className="h-4 w-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <span
                        className={`text-sm ${
                          completedSteps.includes(index) ? "line-through text-gray-500" : "text-gray-700"
                        }`}
                      >
                        <span className="font-medium">Step {index + 1}:</span> {step}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resources */}
            {/*<div>
              <h5 className="font-semibold text-gray-900 mb-4">Helpful Resources</h5>
              <div className="grid md:grid-cols-2 gap-3">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{resource}</span>
                  </motion.div>
                ))}
              </div>
            </div>*/}

            {/* Progress */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Progress: {completedSteps.length}/{actionSteps.length} steps completed
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSteps.length / actionSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
