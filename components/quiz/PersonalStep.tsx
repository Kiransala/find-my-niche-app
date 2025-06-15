"use client"

import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { QuizData } from "@/app/quiz/page"

interface PersonalStepProps {
  control: Control<QuizData>
  errors: FieldErrors<QuizData>
}

const workingHoursOptions = [
  { value: "part-time", label: "Part-time (10-20 hours/week)" },
  { value: "full-time", label: "Full-time (40+ hours/week)" },
  { value: "flexible", label: "Flexible schedule" },
  { value: "evenings-weekends", label: "Evenings & weekends only" },
]

const riskToleranceOptions = [
  { value: "low", label: "Low - I prefer stable, predictable returns" },
  { value: "medium", label: "Medium - I'm comfortable with moderate risk for better returns" },
  { value: "high", label: "High - I'm willing to take significant risks for high rewards" },
  { value: "very-high", label: "Very High - I thrive on high-risk, high-reward opportunities" },
]

const motivationOptions = [
  "Financial Freedom",
  "Creative Expression",
  "Helping Others",
  "Building Something Meaningful",
  "Work-Life Balance",
  "Being My Own Boss",
  "Making a Social Impact",
  "Learning & Growth",
  "Recognition & Status",
  "Solving Problems",
]

const geographicOptions = [
  { value: "local", label: "Local/Regional focus" },
  { value: "national", label: "National market" },
  { value: "global", label: "Global/International" },
  { value: "online", label: "Online-only (location independent)" },
]

export default function PersonalStep({ control, errors }: PersonalStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">How much time can you dedicate to your business?</h3>

        <Controller
          name="workingHours"
          control={control}
          rules={{ required: "Please select your time availability" }}
          render={({ field }) => (
            <div className="space-y-3">
              {workingHoursOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full flex items-center space-x-3 ${
                      field.value === option.value ? "text-blue-800" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        field.value === option.value ? "border-blue-600 bg-blue-600" : "border-gray-300"
                      }`}
                    >
                      {field.value === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.workingHours && <p className="text-red-500 text-sm mt-2">{errors.workingHours.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's your risk tolerance?</h3>

        <Controller
          name="riskTolerance"
          control={control}
          rules={{ required: "Please select your risk tolerance" }}
          render={({ field }) => (
            <div className="space-y-3">
              {riskToleranceOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full flex items-start space-x-3 ${
                      field.value === option.value ? "text-green-800" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                        field.value === option.value ? "border-green-600 bg-green-600" : "border-gray-300"
                      }`}
                    >
                      {field.value === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.riskTolerance && <p className="text-red-500 text-sm mt-2">{errors.riskTolerance.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What motivates you most?</h3>
        <p className="text-gray-600 mb-6">Select all that apply to understand your core drivers.</p>

        <Controller
          name="motivations"
          control={control}
          rules={{ required: "Please select at least one motivation" }}
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {motivationOptions.map((motivation) => (
                <label
                  key={motivation}
                  className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={motivation}
                    checked={field.value?.includes(motivation) || false}
                    onChange={(e) => {
                      const currentValue = field.value || []
                      if (e.target.checked) {
                        field.onChange([...currentValue, motivation])
                      } else {
                        field.onChange(currentValue.filter((item) => item !== motivation))
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-full text-center py-2 rounded-md transition-colors ${
                      field.value?.includes(motivation)
                        ? "bg-purple-100 text-purple-800 border-purple-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {motivation}
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.motivations && <p className="text-red-500 text-sm mt-2">{errors.motivations.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Geographic Preference</h3>

        <Controller
          name="geographicPreference"
          control={control}
          rules={{ required: "Please select your geographic preference" }}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {geographicOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full flex items-center space-x-3 ${
                      field.value === option.value ? "text-blue-800" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        field.value === option.value ? "border-blue-600 bg-blue-600" : "border-gray-300"
                      }`}
                    >
                      {field.value === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.geographicPreference && (
          <p className="text-red-500 text-sm mt-2">{errors.geographicPreference.message}</p>
        )}
      </div>
    </div>
  )
}
