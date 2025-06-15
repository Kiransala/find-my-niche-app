"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { ChevronLeft, ChevronRight, Target } from "lucide-react"
import ProgressBar from "@/components/ProgressBar"
import InterestsStep from "@/components/quiz/InterestsStep"
import SkillsStep from "@/components/quiz/SkillsStep"
import BusinessStep from "@/components/BusinessStep"
import MarketStep from "@/components/MarketStep"
import PersonalStep from "@/components/quiz/PersonalStep"
import InsightsStep from "@/components/quiz/InsightsStep"

export interface QuizData {
  interests: string[]
  customInterest: string
  skills: string[]
  experienceLevel: string
  budget: string
  businessModel: string[]
  timeline: string
  targetAudience: string[]
  competitionTolerance: string
  workingHours: string
  riskTolerance: string
  previousExperience: string
  motivations: string[]
  challenges: string
  marketInsights: string
  uniqueValue: string
  geographicPreference: string
}

const steps = [
  { title: "Interests", component: InterestsStep },
  { title: "Skills", component: SkillsStep },
  { title: "Business", component: BusinessStep },
  { title: "Market", component: MarketStep },
  { title: "Personal", component: PersonalStep },
  { title: "Insights", component: InsightsStep },
]

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<QuizData>({
    defaultValues: {
      interests: [],
      customInterest: "",
      skills: [],
      experienceLevel: "",
      budget: "",
      businessModel: [],
      timeline: "",
      targetAudience: [],
      competitionTolerance: "",
      workingHours: "",
      riskTolerance: "",
      previousExperience: "",
      motivations: [],
      challenges: "",
      marketInsights: "",
      uniqueValue: "",
      geographicPreference: "",
    },
  })

  const nextStep = async () => {
    const isValid = await trigger()
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: QuizData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze-niche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()

      if (!result || !Array.isArray(result)) {
        throw new Error("Invalid response format")
      }

      sessionStorage.setItem("nicheResults", JSON.stringify(result))
      router.push("/results")
    } catch (error) {
      console.error("Error analyzing niche:", error)
      alert("Sorry, there was an error analyzing your responses. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#d1e7ff" }}>
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-blue-300/20 to-purple-300/30"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">NicheFinder</span>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-md bg-white/95 rounded-3xl border border-white/20 shadow-2xl p-8 mt-8"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Step {currentStep + 1}: {steps[currentStep].title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CurrentStepComponent control={control} errors={errors} />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors backdrop-blur-sm bg-white/50 rounded-full"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Previous
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isLoading ? "Analyzing..." : "Discover My Niches"}
                    {!isLoading && <ChevronRight className="ml-2 h-5 w-5" />}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    Next
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
