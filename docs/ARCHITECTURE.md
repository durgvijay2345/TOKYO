# Architecture

## Overview

3-tier architecture: React frontend, Express.js API with AI module, MongoDB + GitHub API data layer.

## Data Flow

```
User enters repo URL
       |
       v
  React App          POST /api/analyze       Express API
  (Vite)          ---------------------->     Server
       ^                                        |
       |                                        v
       |                                  Check Cache
       |                                  Memory -> MongoDB
       |                                        |  miss
       |                                        v
       |                                  GitHub Service
       |                                  (paginated fetch)
       |                                        |
       |                                        v
       |                                  Analysis Engine
       |                                  -> classifier.js
       |                                  -> impact.js
       |        JSON Response             -> insights.js
       | <------------------------------        |
       |                                  Store in cache + DB
```

## Modules

### Frontend
- **App.jsx** — App shell, state routing (landing/loading/dashboard)
- **Dashboard.jsx** — Composes visualization components
- **ContributionChart.jsx** — Recharts bar + pie
- **CommitTimeline.jsx** — Stacked area chart
- **ActivityHeatmap.jsx** — Custom SVG heatmap
- **ContributorCard.jsx** — Profile cards with stats
- **HealthIndicators.jsx** — SVG gauge charts + bus factor
- **InsightsPanel.jsx** — Insight cards + churn table
- **AnalysisHistory.jsx** — Past analyses from MongoDB

### Backend
- **routes/api.js** — REST endpoints with cache lookup
- **services/github.js** — GitHub API client, pagination, rate limiting
- **services/analyzer.js** — Analysis pipeline orchestrator
- **services/cache.js** — node-cache wrapper, 10-min TTL
- **services/database.js** — MongoDB via Mongoose (analyses collection)

### AI Module
- **classifier.js** — Conventional prefix detection + weighted keyword matching
- **impact.js** — Impact model: `(log2(1+changes)*2 + breadth) * critical * class`
- **insights.js** — 7 pattern detectors (workload, bus factor, churn, health, etc.)

## Cache Strategy

```
Request -> Memory Cache (10 min TTL)
               | hit -> return
               | miss
          MongoDB (persistent)
               | hit (< 10 min) -> return + refresh memory
               | miss
          GitHub API -> Analyze -> Store in both
```

## Health Score

| Component | Weight | Formula |
|-----------|--------|---------|
| Contribution balance | 35% | `100 - avg_deviation * 50` |
| Commit quality | 35% | `100 - other_ratio * 60` |
| Activity consistency | 30% | `(active_days / span) * 200` capped at 100 |
