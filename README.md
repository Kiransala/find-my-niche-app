# 🚀 NicheFinder — AI-Powered Business Niche Discovery

**NicheFinder** helps aspiring entrepreneurs discover profitable business ideas tailored to their personal strengths, skills, market preferences, and goals — all powered by AI.

Built with **Next.js**, **TailwindCSS**, and advanced **LLM-based backend analysis** (via Groq API), this tool reduces risk and increases clarity when launching a new venture.

---

## 🌟 Features

- **AI-Powered Niche Recommendations**  
  Personalized business niche suggestions based on user input and real market signals.

- **Multi-Step Interactive Quiz**  
  Captures user preferences, interests, skills, goals, and constraints in a beautiful step-by-step form.

- **Detailed Market Insights**  
  Each recommendation includes profit potential, competition level, startup cost, audience, key strategies, and more.

- **Action Plan Generator**  
  Practical steps and curated resources for turning a niche into a real business.

- **Elegant UI/UX**  
  Built with TailwindCSS and Radix UI, featuring framer-motion animations and responsive design.

---

## 🧠 How It Works

1. User completes a detailed quiz about their skills, interests, experience, budget, timeline, and goals.
2. Data is sent to the backend via an API route (`/api/analyze-niche`) which uses Groq's LLaMA 4 model to analyze and generate business niches.
3. AI returns 3–4 niche recommendations in structured JSON format.
4. Recommendations are displayed with charts, metrics, and an action plan on the results page.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS, shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form
- **API:** Groq LLaMA-4 API
- **Language:** TypeScript

---

## 📁 Project Structure

```bash
kiransala-find-my-niche-app/
├── app/                 # Main routes and pages
│   ├── quiz/            # Multi-step quiz page
│   ├── results/         # Results + recommendations
│   └── api/             # API routes (analyze-niche)
├── components/          # Reusable components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── public/              # Static assets
├── styles/              # Global styles
├── tailwind.config.js   # TailwindCSS config
└── package.json         # Project dependencies
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/kiransala-find-my-niche-app.git
cd kiransala-find-my-niche-app
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set Environment Variable

Create a `.env.local` file and add:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the App

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it live.

---

## 🧪 Development Tips

- To test without Groq API, mock data is automatically used as fallback.
- Customize quiz steps via `/app/quiz/page.tsx` and `components/quiz/`.
- Enhance niche logic in `/app/api/analyze-niche/route.ts`.

---

## 📦 Deployment

You can deploy on **Vercel**, **Netlify**, or **Render**. For Vercel:

```bash
vercel deploy
```

Set your environment variable `GROQ_API_KEY` in the dashboard before deploying.

---

## 🧑‍💻 Author

**Kiran Sala**  

---
