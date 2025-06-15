"use client"

import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { QuizData } from "@/app/quiz/page"

interface InterestsStepProps {
  control: Control<QuizData>
  errors: FieldErrors<QuizData>
}

const interestOptions = [
  "Technology & Software",
  "Artificial Intelligence",
  "Health & Wellness",
  "Mental Health",
  "Finance & Investing",
  "Cryptocurrency & Blockchain",
  "Education & Training",
  "Online Learning",
  "Travel & Tourism",
  "Food & Nutrition",
  "Cooking & Recipes",
  "Fashion & Style",
  "Sustainable Fashion",
  "Home & Interior Design",
  "Real Estate",
  "Sports & Fitness",
  "Outdoor Activities",
  "Arts & Crafts",
  "Digital Art & Design",
  "Music & Audio",
  "Photography & Video",
  "Gaming & Esports",
  "Pets & Animals",
  "Environment & Sustainability",
  "Beauty & Skincare",
  "Parenting & Family",
  "Senior Care",
  "Productivity & Organization",
  "Personal Development",
  "Spirituality & Mindfulness",
  "Automotive",
  "DIY & Home Improvement",
  "Gardening & Plants",
  "Books & Literature",
  "History & Culture",
  "Science & Research",
]

export default function InterestsStep({ control, errors }: InterestsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What are your main interests and passions?</h3>
        <p className="text-gray-600 mb-6">
          Select all that apply. This helps us understand what you're genuinely passionate about.
        </p>

        <Controller
          name="interests"
          control={control}
          rules={{ required: "Please select at least one interest" }}
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {interestOptions.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={interest}
                    checked={field.value.includes(interest)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, interest])
                      } else {
                        field.onChange(field.value.filter((item) => item !== interest))
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-full text-center py-2 rounded-md transition-colors ${
                      field.value.includes(interest)
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {interest}
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.interests && <p className="text-red-500 text-sm mt-2">{errors.interests.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Any other interests not listed above?</label>
        <Controller
          name="customInterest"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="e.g., Sustainable living, Cryptocurrency, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        />
      </div>
    </div>
  )
}
