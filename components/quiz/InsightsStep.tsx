"use client"

import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { QuizData } from "@/app/quiz/page"

interface InsightsStepProps {
  control: Control<QuizData>
  errors: FieldErrors<QuizData>
}

export default function InsightsStep({ control, errors }: InsightsStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Tell us about your business experience</h3>
        <p className="text-gray-600 mb-6">
          Share any previous business experience, side projects, or entrepreneurial attempts (even if they didn't
          succeed).
        </p>

        <Controller
          name="previousExperience"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              placeholder="e.g., I ran a small online store for 2 years, tried freelance consulting, worked in sales for 5 years..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          )}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's your biggest challenge or concern?</h3>
        <p className="text-gray-600 mb-6">
          What worries you most about starting a business? This helps us recommend niches that address your specific
          concerns.
        </p>

        <Controller
          name="challenges"
          control={control}
          rules={{ required: "Please share your main challenge or concern" }}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              placeholder="e.g., I'm worried about finding customers, I don't have much capital, I'm not sure how to market myself..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          )}
        />
        {errors.challenges && <p className="text-red-500 text-sm mt-2">{errors.challenges.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Market insights or observations</h3>
        <p className="text-gray-600 mb-6">
          Have you noticed any gaps in the market, problems that need solving, or trends you find interesting?
        </p>

        <Controller
          name="marketInsights"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              placeholder="e.g., I notice small businesses struggle with social media, there's a lack of eco-friendly options in my area..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          )}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What makes you unique?</h3>
        <p className="text-gray-600 mb-6">
          What unique combination of skills, experiences, or perspectives do you bring? What would make customers choose
          you?
        </p>

        <Controller
          name="uniqueValue"
          control={control}
          rules={{ required: "Please describe what makes you unique" }}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              placeholder="e.g., I have both technical and creative skills, I understand both corporate and startup environments..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          )}
        />
        {errors.uniqueValue && <p className="text-red-500 text-sm mt-2">{errors.uniqueValue.message}</p>}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
        <p className="text-blue-800 text-sm">
          The more detailed and honest you are in these responses, the better our AI can tailor niche recommendations
          specifically for your unique situation and goals.
        </p>
      </div>
    </div>
  )
}
