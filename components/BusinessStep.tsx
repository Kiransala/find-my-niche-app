"\"use client"

import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { QuizData } from "@/app/quiz/page"

interface BusinessStepProps {
  control: Control<QuizData>
  errors: FieldErrors<QuizData>
}

const budgetOptions = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 - $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "over-25k", label: "Over $25,000" },
]

const businessModels = [
  "E-commerce",
  "Service-based",
  "Digital Products",
  "Subscription",
  "Affiliate Marketing",
  "Consulting",
  "Online Courses",
  "SaaS",
  "Physical Products",
  "Dropshipping",
]

const timelineOptions = [
  { value: "1-3months", label: "1-3 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "6-12months", label: "6-12 months" },
  { value: "1-2years", label: "1-2 years" },
  { value: "over-2years", label: "Over 2 years" },
]

export default function BusinessStep({ control, errors }: BusinessStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's your startup budget?</h3>
        <p className="text-gray-600 mb-6">How much are you willing to invest initially?</p>

        <Controller
          name="budget"
          control={control}
          rules={{ required: "Please select your budget range" }}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetOptions.map((budget) => (
                <label
                  key={budget.value}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="radio"
                    value={budget.value}
                    checked={field.value === budget.value}
                    onChange={() => field.onChange(budget.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full flex items-center space-x-3 ${
                      field.value === budget.value ? "text-blue-800" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        field.value === budget.value ? "border-blue-600 bg-blue-600" : "border-gray-300"
                      }`}
                    >
                      {field.value === budget.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{budget.label}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.budget && <p className="text-red-500 text-sm mt-2">{errors.budget.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Which business models interest you?</h3>
        <p className="text-gray-600 mb-6">Select all that you'd consider pursuing.</p>

        <Controller
          name="businessModel"
          control={control}
          rules={{ required: "Please select at least one business model" }}
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {businessModels.map((model) => (
                <label
                  key={model}
                  className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={model}
                    checked={field.value.includes(model)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, model])
                      } else {
                        field.onChange(field.value.filter((item) => item !== model))
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-full text-center py-2 rounded-md transition-colors ${
                      field.value.includes(model)
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {model}
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.businessModel && <p className="text-red-500 text-sm mt-2">{errors.businessModel.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">When do you want to start seeing profits?</h3>

        <Controller
          name="timeline"
          control={control}
          rules={{ required: "Please select your timeline" }}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {timelineOptions.map((timeline) => (
                <label
                  key={timeline.value}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="radio"
                    value={timeline.value}
                    checked={field.value === timeline.value}
                    onChange={() => field.onChange(timeline.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full flex items-center space-x-3 ${
                      field.value === timeline.value ? "text-blue-800" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        field.value === timeline.value ? "border-blue-600 bg-blue-600" : "border-gray-300"
                      }`}
                    >
                      {field.value === timeline.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{timeline.label}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.timeline && <p className="text-red-500 text-sm mt-2">{errors.timeline.message}</p>}
      </div>
    </div>
  )
}
