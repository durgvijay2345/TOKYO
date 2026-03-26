# TOKYO PULSE 🌆 : Engineering Intelligence Dashboard

TOKYO PULSE is a production-grade, AI-powered Engineering Intelligence Dashboard. It analyzes GitHub repositories to provide deep, actionable insights into team productivity, code health, and engineering patterns. 

Rather than relying on basic heuristics, TOKYO PULSE integrates directly with **Google Gemini 2.5** to evaluate code diffs, semantically classify commits, and calculate the true impact of developer contributions.

## ✨ Features

- **AI Commit Classification**: Uses Gemini 2.5 to automatically classify commits natively based on code changes (Feature, Bug Fix, Refactor, Documentation).
- **Intelligent Impact Scoring**: Computes the true impact of a commit by analyzing the complexity of the diff, not just lines of code.
- **Engineering Health Metrics**: Calculates Overall Health, Contribution Balance, Commit Quality, and Activity Consistency.
- **Bus Factor Analysis**: Identifies critical dependencies on specific developers within the repository.
- **Code Churn Detection**: Highlights files that are frequently modified and rewritten.
- **Automated Insights**: Generates English-language actionable insights about architectural risks and workflow bottlenecks.
- **Premium UI**: Sleek, dark-mode React interface with interactive Recharts, custom SVG gauges, and smooth animations.

## 🏗️ Architecture

The application is built on a strictly decoupled **MVC (Model-View-Controller)** architecture.

### Technology Stack
- **Frontend**: React (Vite), Recharts, Vanilla CSS
- **Backend API**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **AI/ML Engine**: Google Gemini API (`@google/generative-ai`)

### Backend Structure
- `server/models/`: Strongly-typed Mongoose Subdocument Schemas (`Analysis`, `Commit`, `Contributor`, `Insight`).
- `server/controllers/`: Business logic and parameter extraction.
- `server/routes/`: Declarative RESTful API endpoint mapping.
- `server/services/`: Core logic (GitHub API fetching, Gemini orchestration, In-Memory caching).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB daemon running locally (`localhost:27017`) or a MongoDB Atlas URI
- GitHub Personal Access Token (optional, but recommended to avoid rate limits)
- Google Gemini API Key

### Installation

1. **Clone the repository**
2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # API Keys
   GITHUB_TOKEN=your_github_personal_access_token
   GEMINI_API_KEY=your_google_gemini_api_key

   # Database
   MONGODB_URI=mongodb://localhost:27017/tokyo_pulse

   # Server
   PORT=3001
   ```

### Running the App

Start both the backend server and frontend Vite application concurrently:
```bash
npm run dev
```

- **Frontend UI**: `http://localhost:5173`
- **Backend API**: `http://localhost:3001`

## 📊 How It Works
1. When a user queries a repository, the **GitHub Service** fetches up to 100 commits, PR data, and contributor histories.
2. The orchestrator batches the top 50 detailed code diffs and sends them to the **Gemini AI Service**.
3. Gemini processes the diffs with strict JSON enforcement, assigning impact scores and plain-English summaries.
4. The **Analyzer Service** correlates the AI results with developer profiles to compute Health Scores and Bus Factors.
5. The final aggregate report is cached in **MongoDB** natively using the Mongoose models and served instantly on subsequent requests.
