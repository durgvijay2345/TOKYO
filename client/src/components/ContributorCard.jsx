const roleClassMap = {
  'Core Developer': 'role-core',
  'Regular Contributor': 'role-regular',
  'Occasional Contributor': 'role-occasional',
  'Drive-by Contributor': 'role-driveby'
};

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

// Mini bar chart for commit classification
function ClassificationBar({ classifications }) {
  const total = Object.values(classifications).reduce((s, v) => s + v, 0);
  if (total === 0) return null;

  const colors = {
    Feature: '#818cf8',
    'Bug Fix': '#fb7185',
    Refactor: '#fbbf24',
    Documentation: '#22d3ee',
    Other: '#64748b'
  };

  return (
    <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden', height: '6px', marginTop: '0.75rem' }}>
      {Object.entries(classifications)
        .filter(([, v]) => v > 0)
        .map(([type, count]) => (
          <div
            key={type}
            title={`${type}: ${count}`}
            style={{
              width: `${(count / total) * 100}%`,
              backgroundColor: colors[type] || '#64748b',
              transition: 'width 0.3s ease'
            }}
          />
        ))}
    </div>
  );
}

export default function ContributorCard({ contributor: c, index }) {
  return (
    <div className="contributor-card">
      <div className="contributor-header">
        {c.avatarUrl ? (
          <img src={c.avatarUrl} alt={c.login} className="contributor-avatar" />
        ) : (
          <div className="contributor-avatar-placeholder">
            {c.login.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="contributor-info">
          <h3>{c.login}</h3>
          <span className={`contributor-role ${roleClassMap[c.role] || 'role-driveby'}`}>
            {c.role}
          </span>
        </div>
      </div>

      <div className="contributor-stats">
        <div className="contrib-stat">
          <div className="contrib-stat-value">{formatNum(c.commits)}</div>
          <div className="contrib-stat-label">Commits</div>
        </div>
        <div className="contrib-stat">
          <div className="contrib-stat-value" style={{ color: '#34d399' }}>+{formatNum(c.additions)}</div>
          <div className="contrib-stat-label">Added</div>
        </div>
        <div className="contrib-stat">
          <div className="contrib-stat-value" style={{ color: '#fb7185' }}>-{formatNum(c.deletions)}</div>
          <div className="contrib-stat-label">Deleted</div>
        </div>
      </div>

      <div className="contributor-stats">
        <div className="contrib-stat">
          <div className="contrib-stat-value" style={{ color: '#818cf8' }}>{c.impactScore.toFixed(1)}</div>
          <div className="contrib-stat-label">Avg Impact</div>
        </div>
        <div className="contrib-stat">
          <div className="contrib-stat-value">{c.filesChanged}</div>
          <div className="contrib-stat-label">Files</div>
        </div>
        <div className="contrib-stat">
          <div className="contrib-stat-value">{c.pullRequests}</div>
          <div className="contrib-stat-label">PRs</div>
        </div>
      </div>

      <ClassificationBar classifications={c.classifications} />

      {c.topAreas.length > 0 && (
        <div className="contributor-areas">
          {c.topAreas.slice(0, 4).map(area => (
            <span className="area-tag" key={area.path}>
              {area.path} ({area.count})
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
