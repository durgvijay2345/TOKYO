# TOKYO PULSE — API Documentation

Base URL: `http://localhost:3001/api`

---

## Analysis Endpoints

### `POST /analyze`
Analyze a GitHub repository. Caches the result in MongoDB and returns the comprehensive intelligence report.

**Request Body**
```json
{
  "repoUrl": "https://github.com/expressjs/express",
  "token": "ghp_optional_github_token"
}
```

### `GET /history`
List all stored analyses (summaries only, without full results) from MongoDB.

### `GET /analysis/:id`
Retrieve a full stored analysis document by its exact MongoDB ObjectId.

---

## Modular Entity Endpoints
These endpoints fetch specific subdocuments from an existing analysis document to support modular frontend queries.

### `GET /commits/:analysisId`
Retrieve the array of AI-analyzed commits for a specific analysis run.
Returns: `[ { sha, message, classification, impact, ... }, ... ]`

### `GET /contributors/:analysisId`
Retrieve the array of contributor profiles and contribution graphs for a specific analysis run.
Returns: `[ { login, commits, impactScore, topAreas, ... }, ... ]`

### `GET /insights/:analysisId`
Retrieve the array of engineering insights mathematically generated for a specific analysis run.
Returns: `[ { id, type, title, description, ... }, ... ]`

---

## System Endpoints

### `GET /health`
Health check and module status.

**Response** `200 OK`
```json
{
  "status": "ok",
  "service": "TOKYO PULSE API",
  "version": "2.0.0",
  "timestamp": "2026-03-25T17:00:00.000Z",
  "modules": ["github", "analyzer", "ai-classifier", "ai-impact", "ai-insights", "mongodb", "cache"]
}
```
