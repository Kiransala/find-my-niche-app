"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Target,
  ArrowLeft,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NicheScoreChart from "@/components/NicheScoreChart"
import ActionPlan from "@/components/ActionPlan"

interface NicheRecommendation {
  name: string
  description: string
  profitPotential: number
  marketDemand: number
  competitionLevel: string
  competitionScore: number
  targetAudience: string
  startupCost: string
  timeToProfit: string
  keyStrategies: string[]
  marketSize: string
  growthTrend: string
  barriers: string[]
  opportunities: string[]
  overallScore: number
  reasoning: string
  actionSteps: string[]
  resources: string[]
}

export default function ResultsPage() {
  const [results, setResults] = useState<NicheRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedResults = sessionStorage.getItem("nicheResults")
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        setResults(parsedResults)
      } catch (error) {
        console.error("Error parsing results:", error)
        router.push("/quiz")
      }
    } else {
      router.push("/quiz")
    }
    setLoading(false)
  }, [router])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-blue-600 bg-blue-100"
    if (score >= 40) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getCompetitionColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#d1e7ff" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-blue-300/20 to-purple-300/30"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center backdrop-blur-md bg-white/20 rounded-3xl border border-white/30 p-12 shadow-2xl">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-800 text-xl font-semibold">Analyzing your perfect niches...</p>
            <p className="text-gray-700 mt-2">Our AI is discovering the best opportunities for you</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#d1e7ff" }}>
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-blue-300/20 to-purple-300/30"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">NicheFinder</span>
            </div>
            <Link
              href="/quiz"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors backdrop-blur-sm bg-white/20 rounded-full px-4 py-2 border border-white/30"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              New Analysis
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-12">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-yellow-500 mr-3" />
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                  Your Perfect
                  <span className="italic underline decoration-orange-400 decoration-4 underline-offset-8 ml-3">
                    Niche Matches
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Based on your detailed analysis, here are AI-discovered business niches with comprehensive market
                insights and success roadmaps.
              </p>
            </div>
          </motion.div>

          {/* Results Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 text-center shadow-xl">
              <div className="flex items-center space-x-3 mb-4 justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <h3 className="font-bold text-gray-800 text-lg">Analysis Complete</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{results.length}</div>
              <p className="text-gray-700 text-sm">Personalized recommendations based on your unique profile</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 text-center shadow-xl">
              <div className="flex items-center space-x-3 mb-4 justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h3 className="font-bold text-gray-800 text-lg">High Potential</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {Math.round(results.reduce((acc, r) => acc + r.overallScore, 0) / results.length)}
              </div>
              <p className="text-gray-700 text-sm">Average opportunity score out of 100</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 text-center shadow-xl">
              <div className="flex items-center space-x-3 mb-4 justify-center">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                <h3 className="font-bold text-gray-800 text-lg">Success Ready</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {results.reduce((acc, r) => acc + r.actionSteps.length, 0)}
              </div>
              <p className="text-gray-700 text-sm">Actionable steps to get started</p>
            </div>
          </motion.div>

          {/* Niche Recommendations */}
          <div className="space-y-8">
            {results.map((niche, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-md bg-white/95 rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{niche.name}</h3>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(niche.overallScore)}`}
                        >
                          {niche.overallScore}/100
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 text-lg leading-relaxed">{niche.description}</p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Profit Potential:</span>
                          <div className="flex">{renderStars(niche.profitPotential)}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Market Demand:</span>
                          <div className="flex">{renderStars(niche.marketDemand)}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Competition:</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getCompetitionColor(niche.competitionLevel)}`}
                          >
                            {niche.competitionLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:ml-8 mt-4 lg:mt-0">
                      <NicheScoreChart
                        profitPotential={niche.profitPotential}
                        marketDemand={niche.marketDemand}
                        competitionScore={5 - niche.competitionScore}
                        overallScore={niche.overallScore}
                      />
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">Target Audience</div>
                        <div className="font-bold text-gray-900">{niche.targetAudience}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">Startup Cost</div>
                        <div className="font-bold text-gray-900">{niche.startupCost}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">Time to Profit</div>
                        <div className="font-bold text-gray-900">{niche.timeToProfit}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">Market Size</div>
                        <div className="font-bold text-gray-900">{niche.marketSize}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                          <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                          Key Opportunities
                        </h4>
                        <ul className="space-y-3">
                          {niche.opportunities.map((opportunity, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                          <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                          Potential Challenges
                        </h4>
                        <ul className="space-y-3">
                          {niche.barriers.map((barrier, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{barrier}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Success Strategies</h4>
                        <div className="flex flex-wrap gap-2">
                          {niche.keyStrategies.map((strategy, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                            >
                              {strategy}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Why This Niche?</h4>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                          <p className="text-gray-700 leading-relaxed">{niche.reasoning}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Growth Trend</h4>
                        <div className="flex items-center space-x-3 bg-green-50 rounded-2xl p-4 border border-green-100">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                          <span className="text-gray-700 font-semibold">{niche.growthTrend}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Plan */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <ActionPlan actionSteps={niche.actionSteps} resources={niche.resources} nicheName={niche.name} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Launch Your Niche?</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Take the first step towards building your perfect business with our AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quiz"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 font-semibold rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  Discover More Niches
                </Link>
                {/*<button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-full hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-lg">
                  Download Full Report
                  <ExternalLink className="ml-2 h-5 w-5" />
                </button>*/}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
