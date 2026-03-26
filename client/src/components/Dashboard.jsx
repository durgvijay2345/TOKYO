import { useState } from 'react';
import ContributionChart from './ContributionChart';
import CommitTimeline from './CommitTimeline';
import ActivityHeatmap from './ActivityHeatmap';
import ContributorCard from './ContributorCard';
import HealthIndicators from './HealthIndicators';
import InsightsPanel from './InsightsPanel';

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function Dashboard({ data, onReset }) {
  const [contributorFilter, setContributorFilter] = useState('all');
  const [timeView, setTimeView] = useState('weekly');

  const filteredContributors = contributorFilter === 'all'
    ? data.contributors
    : data.contributors.filter(c => {
        if (contributorFilter === 'core') return c.role === 'Core Developer';
        if (contributorFilter === 'regular') return c.role === 'Regular Contributor';
        if (contributorFilter === 'occasional') return c.role === 'Occasional Contributor' || c.role === 'Drive-by Contributor';
        return true;
      });

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <header className="dashboard-header">
        <div className="header-left">
          <span className="header-logo">TOKYO PULSE</span>
          <span className="header-repo">{data.repository.name}</span>
          {data.cached && <span className="area-tag">cached</span>}
        </div>
        <button className="btn-new-analysis" onClick={onReset}>
          ← New Analysis
        </button>
      </header>

      {/* ── Stats Row ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Commits</div>
          <div className="stat-value indigo">{formatNumber(data.summary.totalCommits)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Contributors</div>
          <div className="stat-value emerald">{data.summary.totalContributors}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pull Requests</div>
          <div className="stat-value cyan">{formatNumber(data.summary.totalPullRequests)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Lines Changed</div>
          <div className="stat-value amber">{formatNumber(data.summary.totalLinesChanged)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Health Score</div>
          <div className={`stat-value ${data.healthScore.overall >= 70 ? 'emerald' : data.healthScore.overall >= 50 ? 'amber' : 'rose'}`}>
            {data.healthScore.overall}/100
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Bus Factor</div>
          <div className={`stat-value ${data.busFactor.value >= 3 ? 'emerald' : data.busFactor.value >= 2 ? 'amber' : 'rose'}`}>
            {data.busFactor.value}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* ── Contribution Analysis ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Contribution Analysis</h2>
          </div>
          <div className="grid-2">
            <ContributionChart
              contributors={data.contributors}
              type="bar"
            />
            <ContributionChart
              contributors={data.contributors}
              type="pie"
              classificationData={data.classificationDistribution}
            />
          </div>
        </section>

        {/* ── Commit Intelligence ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Commit Intelligence</h2>
            <div className="filter-bar" style={{ marginBottom: 0 }}>
              <button className={`filter-btn ${timeView === 'daily' ? 'active' : ''}`} onClick={() => setTimeView('daily')}>Daily</button>
              <button className={`filter-btn ${timeView === 'weekly' ? 'active' : ''}`} onClick={() => setTimeView('weekly')}>Weekly</button>
            </div>
          </div>
          <CommitTimeline
            timeline={timeView === 'daily' ? data.timeline.daily : data.timeline.weekly}
            view={timeView}
          />
        </section>

        {/* ── Activity Heatmap ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Activity Heatmap</h2>
          </div>
          <ActivityHeatmap contributors={data.contributors} />
        </section>

        {/* ── Engineering Health ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Engineering Health</h2>
          </div>
          <HealthIndicators
            healthScore={data.healthScore}
            busFactor={data.busFactor}
          />
        </section>

        {/* ── Engineering Insights ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Engineering Insights</h2>
          </div>
          <InsightsPanel
            insights={data.insights}
            codeChurn={data.codeChurn}
          />
        </section>

        {/* ── Contributor Profiles ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Contributor Profiles</h2>
          </div>
          <div className="filter-bar">
            <span className="filter-label">Filter:</span>
            <button className={`filter-btn ${contributorFilter === 'all' ? 'active' : ''}`} onClick={() => setContributorFilter('all')}>All ({data.contributors.length})</button>
            <button className={`filter-btn ${contributorFilter === 'core' ? 'active' : ''}`} onClick={() => setContributorFilter('core')}>Core Devs</button>
            <button className={`filter-btn ${contributorFilter === 'regular' ? 'active' : ''}`} onClick={() => setContributorFilter('regular')}>Regular</button>
            <button className={`filter-btn ${contributorFilter === 'occasional' ? 'active' : ''}`} onClick={() => setContributorFilter('occasional')}>Occasional</button>
          </div>
          <div className="contributor-grid">
            {filteredContributors.map((c, i) => (
              <ContributorCard key={c.login} contributor={c} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
