# Architecture

## Overview

A strictly decoupled 3-tier MVC architecture: React frontend, Node/Express.js backend, and a robust MongoDB Data Layer heavily integrated with Google Gemini LLMs.

## Data Flow

```text
User enters repo URL
       |
       v
  React App          POST /api/analyze       Express Router
  (Vite)          ---------------------->     (routes/api.js)
       ^                                        |
       |                                        v
       |                                  analysisController.js
       |                                        |
       |                                  Check Cache (cache.js)
       |                                  Memory -> MongoDB
       |                                        |  miss
       |                                        v
       |                                  GitHub Service (github.js)
       |                                  (paginated fetch)
       |                                        |
       |                                        v
       |                                  Analysis Engine (analyzer.js)
       |                                        |--> ai/gemini.js (Google Gemini API)
       |                                        |--> ai/insights.js
       |        JSON Response                   |
       | <------------------------------  Store in DB (database.js -> models/Analysis.js)
```

## Backend MVC Structure

### Models (`/models/`)
- Mongoose Subdocument schemas enforcing strict typing: `Analysis.js`, `Commit.js`, `Contributor.js`, `Insight.js`.

### Controllers (`/controllers/`)
- Pure business logic stripping out URL request handling: `analysisController.js`, `commitController.js`, `contributorController.js`, `insightController.js`.

### Routes (`/routes/`)
- Declarative mapping layer: `api.js`, `commits.js`, `contributors.js`, `insights.js`.

### Services (`/services/`)
- Workhorses of the API: `github.js` (fetching bounds), `database.js` (MongoDB ORM wrapped), `analyzer.js` (orchestration), `cache.js` (in-memory L1 buffer).

## AI Module
- **gemini.js** — Replaced all legacy heuristic ML code. Directly requests structured JSON outputs from `gemini-2.5-flash` natively to semantically classify commits and grade their impact value based on true code complexity.
- **insights.js** — Synthesizes mathematical distributions (churn ratios, bus factor arrays) into human-readable action-items.
