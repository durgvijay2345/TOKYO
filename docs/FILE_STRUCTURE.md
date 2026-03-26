# TOKYO PULSE Architecture Directory

This document serves as a comprehensive map of the `TOKYO_PULSE` codebase, explaining the exact purpose and necessity of every file in the project. The application follows a strict Model-View-Controller (MVC) server architecture backing a modern React/Vite Single Page Application.

## Root Directory
- **`README.md`**: The primary entry point for developers mapping out features, installation schemas, and setup commands.
- **`package.json`**: Defines all npm dependencies, metadata, and concurrent startup scripts for both the `client` and `server`.
- **`.env`**: (Environment file) Stores sensitive configuration variables like `GEMINI_API_KEY`, `GITHUB_TOKEN`, and `MONGODB_URI` securely off-record.
- **`.gitignore`**: Prevents heavy (`node_modules`), secure (`.env`), and compiled (`dist`) files from accidental public GitHub exposure.

---

## `/server` (The Backend)
The Node.js and Express backend handling database ORM, external GitHub API fetching, and Gemini LLM orchestration.

- **`index.js`**: The main execution point of the backend. It bootstraps the Express server, bounds the `api.js` router to `/api`, mounts the CORS policies, and handles the initial MongoDB connection.

### `/server/models` (The Database Schemas)
Defines the strict structural design for the MongoDB documents using Mongoose, replacing typical NoSQL looseness.
- **`Analysis.js`**: The primary root document. It stores the cached repository evaluation, embedding the subdocuments below.
- **`Commit.js`**: Subdocument schema ensuring all AI-analyzed commits follow a rigid `{ sha, classification, impact }` format.
- **`Contributor.js`**: Subdocument schema enforcing the layout for developer profiles, avatars, and aggregate contribution statistics.
- **`Insight.js`**: Subdocument schema modeling the actionable insights outputted by the analyzer engine.

### `/server/controllers` (The Business Logic)
Decouples URL routing from the actual data retrieval logic, making endpoints easily testable.
- **`analysisController.js`**: The heaviest controller. Orchestrates checking the in-memory cache, hitting MongoDB, triggering the GitHub scanner, kicking off the `analyzer.js` workflow, and returning the aggregated payload.
- **`commitController.js`**: Slices into an existing `Analysis` document by ID to return just the array of commits.
- **`contributorController.js`**: Slices into an `Analysis` document to return just the contributor graph data.
- **`insightController.js`**: Slices into an `Analysis` document to return just the generated intelligence recommendations.

### `/server/routes` (The API Endpoints)
Strictly declarative files mapping URL paths to the logic contained in the controllers.
- **`api.js`**: The master router tree. Mounts health checks, repository triggers (`/analyze`), and the modular sub-routes below.
- **`commits.js`**: Declares the `GET /api/commits/:analysisId` route.
- **`contributors.js`**: Declares the `GET /api/contributors/:analysisId` route.
- **`insights.js`**: Declares the `GET /api/insights/:analysisId` route.

### `/server/services` (The Core Engine)
Independent worker modules that interface with external networks or crunch internal data.
- **`analyzer.js`**: The brain of the application. Takes raw GitHub payloads, forwards the diffs to Gemini via `ai/gemini.js`, and marries the LLM output with mathematical bus-factors and algorithmic churn generation to synthesize the final `Analysis` document.
- **`database.js`**: The MongoDB abstraction layer. Handles Mongoose connections, connection string validation, database insertions (upserts), and fast lookup queries.
- **`github.js`**: The external fetcher. Handles paginated requests to the GitHub REST API (`/commits`, `/pulls`, `/stats`), aggressively monitoring and throttling based on rate limits.
- **`cache.js`**: A lightning-fast, rudimentary in-memory `node-cache` instance used as an L1 buffer to prevent redundant database hits on duplicate front-end requests.

### `/server/ai` (The Machine Learning Integration)
Dedicated files for querying Generative AI models.
- **`gemini.js`**: Interfaces directly with `@google/generative-ai`. Passes structured system prompts to `gemini-2.5-flash` natively forcing the model to emit clean JSON evaluations instead of standard markdown.
- **`insights.js`**: An algorithmic pattern matcher that converts mathematical triggers (like a high bus factor or massive code churn) into human-readable engineering warnings.

---

## `/client` (The Frontend)
A Vite-powered React Single Page Application (SPA) designed as an elegant, dark-mode terminal utility.

- **`index.html`**: The raw HTML scaffold that Vite injects the compiled React DOM into.
- **`vite.config.js`**: Configuration file dictating how Vite bundles the assets and runs the hot-module-reloading dev server on port `5173`.
- **`package.json`**: Frontend-specific NPM dependencies (like `react`, `recharts`, and `lucide-react`).

### `/client/src` (The UI Code)
- **`main.jsx`**: The React bootstrapping script. Injects `<App />` into the DOM.
- **`App.jsx`**: The fundamental application layer. Maintains the high-level React state (loading, error, resolved data) and orchestrates swapping out the Landing input screen for the Dashboard visualizations when data resolves.
- **`index.css`**: The monolithic stylesheet. Utilizes pure CSS custom properties for theming, handling all layout grids, typography palettes, gauge drawing algorithms, and Recharts overrides.

### `/client/src/components` (The Visualizations)
Modular React UI functions used to piece together the dashboard grid without cluttering `App.jsx`.
- **`Dashboard.jsx`**: The "macro" layout container framing all the sub-components beneath the repository header.
- **`ActivityHeatmap.jsx`**: Parses daily/weekly commit matrices and pipes them into a Recharts time-series grid displaying workflow consistency.
- **`AnalysisHistory.jsx`**: A side-panel allowing users to re-click and instantly load past repository scans from the database.
- **`CommitTimeline.jsx`**: A stacked bar chart visualizing the frequency of Feature vs Bug Fix commits dynamically generated by the Gemini classifications.
- **`ContributionChart.jsx`**: A pie chart rendering the overall code additions and deletions sliced by developer.
- **`ContributorCard.jsx`**: An iterated grid tile showcasing a single developer's avatar, rank, areas of expertise, and highest personal impact score.
- **`HealthIndicators.jsx`**: Renders pure-math SVG semi-circle gauges illustrating architectural grade scores like Contribution Balance and the repository's Bus Factor.
- **`InsightsPanel.jsx`**: The actionable readout panel rendering the generated LLM text notifications formatted alongside severity icons (Warnings, Errors, Info).
