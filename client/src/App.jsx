import { useState } from 'react';
import Dashboard from './components/Dashboard';
import AnalysisHistory from './components/AnalysisHistory';
import './index.css';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);

  const analyzeRepo = async () => {
    if (!repoUrl.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);
    setLoadingMessage('Connecting to GitHub API...');

    try {
      const timer = setTimeout(() => setLoadingMessage('Fetching commits and contributors...'), 3000);
      const timer2 = setTimeout(() => setLoadingMessage('Running AI analysis engine...'), 8000);
      const timer3 = setTimeout(() => setLoadingMessage('Computing impact scores and health metrics...'), 15000);

      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: repoUrl.trim(), token: token.trim() || undefined })
      });

      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Analysis failed');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadHistoricAnalysis = async (id) => {
    setLoading(true);
    setLoadingMessage('Loading stored analysis...');
    try {
      const response = await fetch(`${API_URL}/analysis/${id}`);
      if (!response.ok) throw new Error('Failed to load analysis');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') analyzeRepo();
  };

  const resetApp = () => {
    setData(null);
    setError(null);
    setRepoUrl('');
  };

  // Loading screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <div className="loading-text">{loadingMessage}</div>
        <div className="loading-sub">This may take a moment for large repositories</div>
      </div>
    );
  }

  // Dashboard view
  if (data) {
    return <Dashboard data={data} onReset={resetApp} />;
  }

  // Landing / Input screen
  return (
    <div className="app-landing">
      <div className="landing-content">
        <div className="logo-icon">TP</div>
        <h1 className="landing-title">TOKYO PULSE</h1>
        <p className="landing-subtitle">
          Analyze any public GitHub repository. Get contributor breakdowns, commit classification, health scores, and actionable insights.
        </p>

        <div className="input-group">
          <input
            id="repo-url-input"
            type="text"
            placeholder="https://github.com/owner/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <button
            id="analyze-btn"
            className="btn-analyze"
            onClick={analyzeRepo}
            disabled={!repoUrl.trim()}
          >
            Analyze
          </button>
        </div>

        {error && (
          <div className="error-container">
            <div className="error-message">{error}</div>
            <button className="btn-retry" onClick={() => setError(null)}>Retry</button>
          </div>
        )}

        <div className="token-input">
          <button className="token-toggle" onClick={() => setShowToken(!showToken)}>
            {showToken ? 'Hide' : 'Add'} GitHub token (optional)
          </button>
          {showToken && (
            <input
              id="token-input"
              className="token-field"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          )}
        </div>

        <AnalysisHistory onSelect={loadHistoricAnalysis} currentRepo={data?.repository?.name} />
      </div>
    </div>
  );
}

export default App;
