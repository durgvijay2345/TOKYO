# TOKYO PULSE — API Documentation

Base URL: `http://localhost:3001/api`

---

## Endpoints

### `GET /health`

Health check and module status.

**Response** `200 OK`
```json
{
  "status": "ok",
  "service": "TOKYO PULSE API",
  "version": "2.0.0",
  "timestamp": "2026-03-25T17:00:00.000Z",
  "modules": [
    "github",
    "analyzer",
    "ai-classifier",
    "ai-impact",
    "ai-insights",
    "database",
    "cache"
  ]
}
```

---

### `POST /analyze`

Analyze a GitHub repository. Returns comprehensive intelligence report.

**Request Body**
```json
{
  "repoUrl": "https://github.com/expressjs/express",
  "token": "ghp_optional_github_token"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `repoUrl` | string | ✅ | GitHub repository URL |
| `token` | string | ❌ | Personal Access Token (increases rate limit from 60 to 5000 req/hr) |

**Response** `200 OK`
```json
{
  "repository": {
    "name": "expressjs/express",
    "description": "Fast, unopinionated, minimalist web framework for Node.js",
    "stars": 65000,
    "forks": 16000,
    "language": "JavaScript",
    "createdAt": "2010-05-27T00:00:00Z",
    "updatedAt": "2026-03-25T00:00:00Z",
    "openIssues": 200
  },
  "summary": {
    "totalCommits": 500,
    "totalContributors": 50,
    "totalPullRequests": 300,
    "totalLinesChanged": 150000
  },
  "contributors": [
    {
      "login": "developer1",
      "avatarUrl": "https://avatars.githubusercontent.com/...",
      "commits": 200,
      "additions": 50000,
      "deletions": 20000,
      "linesChanged": 70000,
      "filesChanged": 150,
      "pullRequests": 45,
      "impactScore": 12.5,
      "totalImpact": 2500.0,
      "role": "Core Developer",
      "classifications": {
        "Feature": 80,
        "Bug Fix": 50,
        "Refactor": 30,
        "Documentation": 20,
        "Other": 20
      },
      "topAreas": [
        { "path": "lib/router", "count": 30 }
      ],
      "hourlyActivity": [0, 0, 0, 1, 2, 5, 10, "..."],
      "dailyActivity": [5, 30, 35, 40, 35, 20, 5]
    }
  ],
  "commits": [
    {
      "sha": "abc1234",
      "message": "Add middleware support for async handlers",
      "author": "developer1",
      "date": "2026-03-20T15:30:00Z",
      "classification": "Feature",
      "classificationConfidence": 0.85,
      "classificationReasoning": "Matched keywords: [add, support] (score: 1.10)",
      "additions": 150,
      "deletions": 30,
      "filesChanged": 5,
      "impact": 15.2,
      "impactBreakdown": {
        "baseScore": 14.34,
        "breadthBonus": 2.5,
        "criticalMultiplier": 1.0,
        "classificationMultiplier": 1.2
      }
    }
  ],
  "classificationDistribution": {
    "Feature": 150,
    "Bug Fix": 120,
    "Refactor": 80,
    "Documentation": 50,
    "Other": 100
  },
  "timeline": {
    "daily": [{ "date": "2026-03-20", "total": 5, "Feature": 2, "Bug Fix": 1, "..." : "..." }],
    "weekly": [{ "date": "2026-03-17", "total": 25, "..." : "..." }]
  },
  "busFactor": {
    "value": 3,
    "critical": [
      { "login": "dev1", "commitShare": 25, "avatarUrl": "..." }
    ],
    "totalContributors": 50
  },
  "healthScore": {
    "overall": 72,
    "contributionBalance": 65,
    "commitQuality": 80,
    "activityConsistency": 70
  },
  "codeChurn": [
    {
      "filename": "lib/router/index.js",
      "commits": 15,
      "additions": 500,
      "deletions": 400,
      "churnRatio": 0.8
    }
  ],
  "insights": [
    {
      "type": "warning",
      "category": "Workload Distribution",
      "title": "Uneven workload distribution detected",
      "description": "developer1 accounts for 40% of all commits...",
      "evidence": { "contributor": "developer1", "commitShare": 40 }
    }
  ],
  "analyzedAt": "2026-03-25T17:00:00.000Z"
}
```

**Error Responses**

| Status | Condition |
|--------|-----------|
| `400` | Missing `repoUrl` |
| `404` | Repository not found |
| `429` | GitHub API rate limit exceeded |
| `500` | Internal server error |

---

### `GET /history`

List all stored analyses (summaries only, without full results).

**Response** `200 OK`
```json
[
  {
    "id": "m1abc12de",
    "repoUrl": "https://github.com/expressjs/express",
    "repoName": "expressjs/express",
    "analyzedAt": "2026-03-25T17:00:00.000Z",
    "summary": {
      "totalCommits": 500,
      "totalContributors": 50,
      "healthScore": 72,
      "busFactor": 3
    }
  }
]
```

---

### `GET /analysis/:id`

Retrieve a full stored analysis by ID.

**Response** `200 OK` — Same structure as `POST /analyze` response.
**Response** `404` — Analysis not found.
