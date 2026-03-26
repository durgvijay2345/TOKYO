# 🚀 TOKYO PULSE — Engineering Intelligence Dashboard

## 📌 Project Overview
TOKYO PULSE is a full-stack AI-powered system that analyzes any GitHub repository and provides deep insights into team contributions, engineering patterns, and project health.

The system integrates GitHub APIs, machine learning (LLM-based analysis), and interactive visualizations to help teams understand code quality, collaboration patterns, and risk factors.

---

## 🧠 Key Features
* 📊 **Contribution breakdown** (who contributed what)
* 🧾 **Commit classification** (Feature, Bug Fix, Refactor)
* 👥 **Contributor profiling** (impact, activity)
* ⚠️ **AI-generated insights and warnings**
* 📈 **Engineering health metrics** (Bus Factor, Balance Score)
* 🔥 **Activity heatmaps & timelines**

---

## 🏗️ Architecture Overview

```text
Frontend (React + Vite)
 ⬇
Backend API (Node.js + Express)
 ⬇
Services Layer (GitHub API + Analyzer + Cache)
 ⬇
AI Layer (Google Gemini API)
 ⬇
Database (MongoDB)
```

---

## ⚙️ Tech Stack

### Frontend
* React.js
* Vite
* Recharts (Data Visualization)

### Backend
* Node.js
* Express.js
* MongoDB (Mongoose)

### AI / ML
* Google Gemini API (LLM-based analysis)

---

## 🔄 System Workflow
1. User enters GitHub repository URL.
2. Backend fetches commit + contributor data via GitHub API.
3. Analyzer processes raw data.
4. Gemini AI classifies commits and generates insights.
5. Metrics (bus factor, churn, contribution balance) are calculated.
6. Results stored in MongoDB (with caching).
7. Frontend displays insights via charts and dashboards.

---

## 🤖 AI / ML Component (IMPORTANT)
The system strictly uses LLM (Google Gemini 2.5) for:

### 1. Commit Classification
Each commit message and diff is analyzed and classified into:
* Feature
* Bug Fix
* Refactor
* Documentation

### 2. Impact Scoring
Impact is calculated using semantic analysis of:
* Lines added/deleted
* File importance
* Commit frequency

### 3. Insight Generation
The AI natively generates:
* Risk alerts (e.g., "High dependency on single contributor")
* Code quality patterns
* Team productivity insights

---

## 📊 Engineering Metrics
* **Bus Factor** → Risk to the project if a key dev leaves
* **Contribution Balance** → Fairness in distributions
* **Code Churn** → Frequency of code rewrites
* **Impact Score** → Importance of multi-file contributions

---

## 🔌 API Endpoints
All endpoints are strictly decoupled into controllers for an enterprise MVC structure.
* **`POST /api/analyze`** → Analyze repository bounds
* **`GET /api/commits/:id`** → Get parsed commit data
* **`GET /api/contributors/:id`** → Get contributor graphs
* **`GET /api/insights/:id`** → Get ML insights warning data

---

## 👥 Team Roles

| Member | Contribution |
|--------|--------------|
| **Member 1** | Frontend UI + Dashboard |
| **Member 2** | Charts + Visualization |
| **Member 3** | Backend APIs |
| **Member 4** | AI + Analyzer Logic |

---

## ⚠️ Challenges Faced
* **Handling GitHub API rate limits**: Built intelligent pagination and conditional fetching (only detailing the top 50 diffs).
* **Designing meaningful AI prompts**: Stripped large JSON arrays (like reasoning vectors) to massively reduce latency from 30 seconds to 3 seconds.
* **Managing large commit datasets**: Split the payloads between rapid GitHub Statistics endpoints and heavy analysis arrays.
* **Ensuring clean architecture**: Swapped JSON file storage for strict Mongoose Subdocuments (`Commit`, `Contributor`, `Insight`) and built a strictly logicless router layer.

---

## 🔧 Improvements (Future Work)
* Real-time analysis via GitHub Webhooks
* More advanced ML models
* CI/CD integration
* Performance optimization

---

## 🧪 How to Run

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

*(Alternatively, run `npm run dev` at the root folder to spin up both concurrently!)*

---

## 📌 Key Design Decisions
* **Used strict MVC architecture** (`models`, `controllers`, `routes`) for enterprise scalability.
* **Separated services layer** for clean external logic.
* **Used multi-stage caching** (in-memory L1 cache buffer + durable L2 MongoDB lookup) to improve API performance.
* **Used LLM instead of rule-based classification**: Completely deleted regex-based heuristic analysis (`classifier.js`, `impact.js`) to strictly parse true semantics.

---

## 🎯 Conclusion
TOKYO PULSE demonstrates a real-world engineering intelligence system combining full-stack development with practical generative AI/ML integration, focusing on clarity, scalability, and meaningful development insights.
