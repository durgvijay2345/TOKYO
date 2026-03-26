import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = {
  commits: '#818cf8',
  additions: '#34d399',
  deletions: '#fb7185',
  Feature: '#818cf8',
  'Bug Fix': '#fb7185',
  Refactor: '#fbbf24',
  Documentation: '#22d3ee',
  Other: '#64748b'
};

const PIE_COLORS = ['#818cf8', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24', '#fb7185', '#f472b6', '#60a5fa'];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((entry, i) => (
        <div className="item" key={i}>
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span style={{ fontWeight: 600 }}>{entry.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default function ContributionChart({ contributors, type, classificationData }) {
  if (type === 'pie' && classificationData) {
    const pieData = Object.entries(classificationData)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value }));

    return (
      <div className="card">
        <div className="card-title">Commit Classification Distribution</div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              dataKey="value"
              paddingAngle={3}
              stroke="none"
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={COLORS[entry.name] || PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '0.8rem', color: '#94a3b8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Bar chart — contribution breakdown per developer (top 15)
  const chartData = contributors.slice(0, 15).map(c => ({
    name: c.login.length > 12 ? c.login.substring(0, 10) + '…' : c.login,
    Commits: c.commits,
    'Lines Added': c.additions,
    'Lines Deleted': c.deletions
  }));

  return (
    <div className="card">
      <div className="card-title">Contribution Breakdown by Developer</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} angle={-20} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
          <Bar dataKey="Commits" fill={COLORS.commits} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Lines Added" fill={COLORS.additions} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Lines Deleted" fill={COLORS.deletions} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
