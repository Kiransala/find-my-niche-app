"use client"

import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { QuizData } from "@/app/quiz/page"

interface SkillsStepProps {
  control: Control<QuizData>
  errors: FieldErrors<QuizData>
}

const skillOptions = [
  "Digital Marketing",
  "SEO & Content Marketing",
  "Social Media Marketing",
  "Email Marketing",
  "Sales & Business Development",
  "Customer Service",
  "Writing & Copywriting",
  "Content Creation",
  "Graphic Design",
  "Web Design",
  "UI/UX Design",
  "Programming & Development",
  "Data Analysis",
  "Project Management",
  "Team Leadership",
  "Public Speaking",
  "Teaching & Training",
  "Photography",
  "Video Production",
  "Audio Production",
  "Accounting & Finance",
  "Legal & Compliance",
  "Operations Management",
  "Supply Chain Management",
  "Product Management",
  "Research & Analysis",
  "Consulting",
  "Negotiation",
  "Event Planning",
  "Translation & Languages",
]

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-2 years)" },
  { value: "intermediate", label: "Intermediate (2-5 years)" },
  { value: "advanced", label: "Advanced (5+ years)" },
  { value: "expert", label: "Expert (10+ years)" },
]

export default function SkillsStep({ control, errors }: SkillsStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What skills do you have or want to develop?</h3>
        <p className="text-gray-600 mb-6">Select your existing skills and those you're interested in learning.</p>

        <Controller
          name="skills"
          control={control}
          rules={{ required: "Please select at least one skill" }}
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={skill}
                    checked={field.value.includes(skill)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange([...field.value, skill])
                      } else {
                        field.onChange(field.value.filter((item) => item !== skill))
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-full text-center py-2 rounded-md transition-colors ${
                      field.value.includes(skill)
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {skill}
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills.message}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's your overall business experience level?</h3>

        <Controller
          name="experienceLevel"
          control={control}
          rules={{ required: "Please select your experience level" }}
          render={({ field }) => (
            <div className="space-y-3">
              {experienceLevels.map((level) => (
                <label
                  key={level.value}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="radio"
                    value={level.value}
                    checked={field.value === level.value}
                    onChange={() => field.onChange(level.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full flex items-center space-x-3 ${
                      field.value === level.value ? "text-blue-800" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
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
        {errors.experienceLevel && <p className="text-red-500 text-sm mt-2">{errors.experienceLevel.message}</p>}
      </div>
    </div>
  )
}
