"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, TrendingUp, Users, Sparkles, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#d1e7ff" }}>
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-blue-300/20 to-purple-300/30"></div>

      {/* Glass Container */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {/* Glass Morphism Main Container */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
            {/* Header */}
            <header className="flex items-center justify-between mb-16">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">NicheFinder</span>
              </div>

              {/*<nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#process" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Process
                </a>
                <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">
                  About
                </a>
              </nav>*/}

              <Link
                href="/quiz"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </header>

            {/* Free Consultation Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-800 font-medium">Free Analysis</span>
                <span className="text-gray-700">We'll discover your perfect business niche and opportunities</span>
              </div>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                AI for Business:
                <br />
                <span className="italic underline decoration-orange-400 decoration-4 underline-offset-8">
                  Discover Niches
                </span>
                <br />& <span className="italic">Increase Profits</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Find Profitable Opportunities & Reduce Risk by Up to 80% with
                <br />
                AI-Powered Niche Discovery & Smart Market Insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/*<button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300">
                  See Our Process
                </button>*/}
                <Link
                  href="/quiz"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Start Free Analysis</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            {/* Floating Cards */}
            <div className="relative">
              {/* Success Metrics Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -left-4 md:left-8 top-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform -rotate-3 max-w-xs"
              >
                <h3 className="font-bold text-gray-800 mb-2">Market Analysis</h3>
                <div className="text-3xl font-bold text-green-600 mb-1">+85%</div>
                <p className="text-gray-600 text-sm">Success Rate Improvement</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 5 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute -right-4 md:right-8 top-20 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform rotate-3 max-w-xs"
              >
                <h3 className="font-bold text-gray-800 mb-2">Risk Reduction</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">-70%</div>
                <p className="text-gray-600 text-sm">Business Failure Risk</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute left-1/2 transform -translate-x-1/2 top-40 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-xs"
              >
                <h3 className="font-bold text-gray-800 mb-2">Profit Potential</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">+120%</div>
                <p className="text-gray-600 text-sm">Revenue Growth Potential</p>
              </motion.div>

              {/* Central Process Visualization */}
              <div className="flex justify-center items-center mt-32 mb-16">
                <div className="relative">
                  {/* Process Flow */}
                  <div className="flex items-center space-x-8">
                    {/* Step 1 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 text-center"
                    >
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-gray-800 font-semibold mb-2">Profile Analysis</h4>
                      <p className="text-gray-700 text-sm">Understand your strengths</p>
                    </motion.div>

                    {/* Arrow */}
                    <ArrowRight className="h-6 w-6 text-gray-600" />

                    {/* Central Logo */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.3 }}
                      className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl"
                    >
                      <Target className="h-10 w-10 text-white" />
                    </motion.div>

                    {/* Arrow */}
                    <ArrowRight className="h-6 w-6 text-gray-600" />

                    {/* Step 2 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 text-center"
                    >
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-gray-800 font-semibold mb-2">AI Discovery</h4>
                      <p className="text-gray-700 text-sm">Find perfect niches</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 text-center shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Market Intelligence</h3>
              <p className="text-gray-700">
                Advanced AI analysis of market trends, competition, and profit potential for each niche opportunity.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 text-center shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personalized Matching</h3>
              <p className="text-gray-700">
                Tailored recommendations based on your unique skills, interests, and business goals.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 text-center shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Success Roadmap</h3>
              <p className="text-gray-700">
                Step-by-step action plans with resources and strategies to launch your chosen niche successfully.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
