"use client"

import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { QuizData } from "@/app/quiz/page"

interface MarketStepProps {
  control: Control<QuizData>
  errors: FieldErrors<QuizData>
}

const audienceOptions = [
  "Young Adults (18-25)",
  "Millennials (26-40)",
  "Gen X (41-55)",
  "Baby Boomers (56+)",
  "Parents",
  "Professionals",
  "Students",
  "Entrepreneurs",
  "Retirees",
  "Small Business Owners",
  "Freelancers",
  "Tech Enthusiasts",
]

const competitionLevels = [
  { value: "low", label: "Low Competition - I prefer less crowded markets" },
  { value: "medium", label: "Medium Competition - Balanced opportunity and competition" },
  { value: "high", label: "High Competition - I can compete in saturated markets" },
  { value: "any", label: "Any Level - Competition doesn't concern me" },
]

export default function MarketStep({ control, errors }: MarketStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Who would you like to serve as customers?</h3>
        <p className="text-gray-600 mb-6">Select your preferred target audiences.</p>

        <Controller
          name="targetAudience"
          control={control}
          rules={{ required: "Please select at least one target audience" }}
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {audienceOptions.map((audience) => (
                <label
                  key={audience}
                  className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={audience}
                    checked={field.value.includes(audience)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, audience])
                      } else {
                        field.onChange(field.value.filter((item) => item !== audience))
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-full text-center py-2 rounded-md transition-colors ${
                      field.value.includes(audience)
                        ? "bg-purple-100 text-purple-800 border-purple-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {audience}
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.targetAudience && <p className="text-red-500 text-sm mt-2">{errors.targetAudience.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">How do you feel about competition?</h3>
        <p className="text-gray-600 mb-6">This helps us recommend niches with the right competition level for you.</p>

        <Controller
          name="competitionTolerance"
          control={control}
          rules={{ required: "Please select your competition preference" }}
          render={({ field }) => (
            <div className="space-y-3">
              {competitionLevels.map((level) => (
                <label
                  key={level.value}
                  className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="radio"
                    value={level.value}
                    checked={field.value === level.value}
                    onChange={() => field.onChange(level.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full flex items-start space-x-3 ${
                      field.value === level.value ? "text-blue-800" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                        field.value === level.value ? "border-blue-600 bg-blue-600" : "border-gray-300"
                      }`}
                    >
                      {field.value === level.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{level.label}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.competitionTolerance && (
          <p className="text-red-500 text-sm mt-2">{errors.competitionTolerance.message}</p>
        )}
      </div>
    </div>
  )
}
