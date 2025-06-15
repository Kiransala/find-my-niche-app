import { type NextRequest, NextResponse } from "next/server"

interface QuizData {
  interests: string[]
  customInterest: string
  skills: string[]
  experienceLevel: string
  budget: string
  businessModel: string[]
  timeline: string
  targetAudience: string[]
  competitionTolerance: string
  // New enhanced fields
  workingHours: string
  riskTolerance: string
  previousExperience: string
  motivations: string[]
  challenges: string
  marketInsights: string
  uniqueValue: string
  geographicPreference: string
}

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

export async function POST(request: NextRequest) {
  try {
    const data: QuizData = await request.json()

    // Validate required fields
    if (!data.interests?.length || !data.skills?.length) {
      return NextResponse.json({ error: "Missing required fields: interests and skills" }, { status: 400 })
    }

    const recommendations = await analyzeWithGroq(data)
    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error analyzing niche:", error)
    return NextResponse.json({ error: "Failed to analyze niche data. Please try again." }, { status: 500 })
  }
}

async function analyzeWithGroq(data: QuizData): Promise<NicheRecommendation[]> {
  // Use the environment variable for the API key
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    console.warn("GROQ_API_KEY not found in environment variables, using fallback data")
    return generateEnhancedMockRecommendations(data)
  }

  const prompt = createSophisticatedPrompt(data)

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are an expert business consultant and market analyst. Provide structured business niche recommendations in valid JSON format only. Do not include any text outside the JSON response.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
        top_p: 1,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Groq API error ${response.status}:`, errorText)
      throw new Error(`Groq API error: ${response.status}`)
    }

    const result = await response.json()

    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error("Invalid response structure from Groq API")
    }

    return parseGroqResponse(result.choices[0].message.content)
  } catch (error) {
    console.error("Groq API error:", error)
    // Fallback to enhanced mock data if API fails
    return generateEnhancedMockRecommendations(data)
  }
}

function createSophisticatedPrompt(data: QuizData): string {
  return `Analyze this user profile and provide exactly 3 business niche recommendations as a JSON array.

USER PROFILE:
- Interests: ${data.interests.slice(0, 8).join(", ")}${data.customInterest ? `, ${data.customInterest}` : ""}
- Skills: ${data.skills.slice(0, 6).join(", ")}
- Experience: ${data.experienceLevel}
- Budget: ${data.budget}
- Business Models: ${data.businessModel.slice(0, 4).join(", ")}
- Timeline: ${data.timeline}
- Target Audience: ${data.targetAudience.slice(0, 4).join(", ")}
- Competition Tolerance: ${data.competitionTolerance}
- Working Hours: ${data.workingHours || "Flexible"}
- Risk Tolerance: ${data.riskTolerance || "Medium"}
- Motivations: ${data.motivations?.slice(0, 3).join(", ") || "Success"}

Return ONLY a valid JSON array with exactly this structure:
[
  {
    "name": "Niche Name",
    "description": "Brief description under 120 characters",
    "profitPotential": 4,
    "marketDemand": 4,
    "competitionLevel": "Medium",
    "competitionScore": 3,
    "targetAudience": "Primary audience",
    "startupCost": "$X,XXX - $X,XXX",
    "timeToProfit": "X-X months",
    "keyStrategies": ["Strategy 1", "Strategy 2", "Strategy 3"],
    "marketSize": "$XXB market",
    "growthTrend": "Growing X% annually",
    "barriers": ["Barrier 1", "Barrier 2"],
    "opportunities": ["Opportunity 1", "Opportunity 2"],
    "overallScore": 85,
    "reasoning": "Why this niche fits under 150 characters",
    "actionSteps": ["Step 1", "Step 2", "Step 3"],
    "resources": ["Resource 1", "Resource 2"]
  }
]

Requirements:
- All scores must be integers 1-5
- overallScore must be integer 1-100
- All arrays must have 2-4 items
- Keep descriptions concise
- Focus on profitable, realistic niches based on user profile`
}

function parseGroqResponse(content: string): NicheRecommendation[] {
  try {
    // Clean the content - remove any markdown formatting or extra text
    const cleanContent = content.trim()

    // Find JSON array in the response
    const jsonStart = cleanContent.indexOf("[")
    const jsonEnd = cleanContent.lastIndexOf("]") + 1

    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("No JSON array found in response")
    }

    const jsonString = cleanContent.substring(jsonStart, jsonEnd)
    const parsed = JSON.parse(jsonString)

    // Validate the structure
    if (!Array.isArray(parsed)) {
      throw new Error("Response is not an array")
    }

    // Ensure each item has required fields
    const validated = parsed.map((item, index) => ({
      name: item.name || `Niche ${index + 1}`,
      description: item.description || "Business opportunity description",
      profitPotential: Math.min(Math.max(item.profitPotential || 3, 1), 5),
      marketDemand: Math.min(Math.max(item.marketDemand || 3, 1), 5),
      competitionLevel: item.competitionLevel || "Medium",
      competitionScore: Math.min(Math.max(item.competitionScore || 3, 1), 5),
      targetAudience: item.targetAudience || "General audience",
      startupCost: item.startupCost || "$1,000 - $5,000",
      timeToProfit: item.timeToProfit || "3-6 months",
      keyStrategies: Array.isArray(item.keyStrategies)
        ? item.keyStrategies.slice(0, 5)
        : ["Digital marketing", "Customer service"],
      marketSize: item.marketSize || "$1B+ market",
      growthTrend: item.growthTrend || "Stable growth",
      barriers: Array.isArray(item.barriers) ? item.barriers.slice(0, 3) : ["Competition", "Market entry"],
      opportunities: Array.isArray(item.opportunities)
        ? item.opportunities.slice(0, 3)
        : ["Growing demand", "Digital transformation"],
      overallScore: Math.min(Math.max(item.overallScore || 70, 1), 100),
      reasoning: item.reasoning || "Good fit based on your profile",
      actionSteps: Array.isArray(item.actionSteps)
        ? item.actionSteps.slice(0, 5)
        : ["Research market", "Create business plan"],
      resources: Array.isArray(item.resources) ? item.resources.slice(0, 4) : ["Industry reports", "Online courses"],
    }))

    return validated.slice(0, 4) // Limit to 4 recommendations
  } catch (error) {
    console.error("Error parsing Groq response:", error)
    console.log("Raw content:", content)
    // Return fallback data
    throw new Error("Failed to parse AI response")
  }
}

function generateEnhancedMockRecommendations(data: QuizData): NicheRecommendation[] {
  return [
    {
      name: "AI-Powered Local Business Optimization",
      description:
        "Help small businesses leverage AI tools to optimize operations, customer service, and marketing strategies.",
      profitPotential: 5,
      marketDemand: 5,
      competitionLevel: "Medium",
      competitionScore: 3,
      targetAudience: "Small Business Owners",
      startupCost: "$2,000 - $5,000",
      timeToProfit: "3-6 months",
      keyStrategies: [
        "AI tool integration consulting",
        "Custom automation solutions",
        "Performance analytics dashboards",
        "Staff training programs",
        "Ongoing optimization services",
      ],
      marketSize: "$50B+ (SMB software market)",
      growthTrend: "Rapidly growing (25% YoY)",
      barriers: ["Technical expertise required", "Client education needed"],
      opportunities: ["AI adoption acceleration", "Remote work optimization", "Cost reduction focus"],
      overallScore: 87,
      reasoning: "High demand for AI integration with low barrier to entry for skilled consultants.",
      actionSteps: [
        "Learn popular AI business tools (ChatGPT, Zapier, etc.)",
        "Create case studies with local businesses",
        "Develop service packages and pricing",
        "Build a portfolio website",
        "Network with local business associations",
      ],
      resources: ["AI tool certifications", "Business automation courses", "Local networking groups"],
    },
    {
      name: "Sustainable Living Subscription Service",
      description: "Curated monthly boxes of eco-friendly products with educational content and community features.",
      profitPotential: 4,
      marketDemand: 4,
      competitionLevel: "Medium",
      competitionScore: 3,
      targetAudience: "Environmentally Conscious Consumers",
      startupCost: "$10,000 - $25,000",
      timeToProfit: "6-12 months",
      keyStrategies: [
        "Product curation partnerships",
        "Educational content creation",
        "Community building platform",
        "Influencer collaborations",
        "Corporate sustainability partnerships",
      ],
      marketSize: "$15B+ (sustainable products market)",
      growthTrend: "Strong growth (15% YoY)",
      barriers: ["Inventory management", "Supplier relationships", "Customer acquisition costs"],
      opportunities: ["Corporate ESG initiatives", "Gen Z purchasing power", "Climate awareness"],
      overallScore: 78,
      reasoning: "Growing market with strong consumer demand and subscription model provides recurring revenue.",
      actionSteps: [
        "Research sustainable product suppliers",
        "Validate concept with target audience",
        "Develop MVP subscription box",
        "Create content strategy",
        "Launch pre-order campaign",
      ],
      resources: ["Sustainable product directories", "Subscription platform tools", "Content creation tools"],
    },
  ]
}
