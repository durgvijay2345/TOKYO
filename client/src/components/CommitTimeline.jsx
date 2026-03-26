import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const TYPE_COLORS = {
  Feature: '#818cf8',
  'Bug Fix': '#fb7185',
  Refactor: '#fbbf24',
  Documentation: '#22d3ee',
  Other: '#64748b'
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((entry, i) => (
        <div className="item" key={i}>
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span style={{ fontWeight: 600 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function CommitTimeline({ timeline, view }) {
  if (!timeline || timeline.length === 0) {
    return <div className="card"><div className="card-title">No timeline data available</div></div>;
  }

  // Format dates for display
  const formattedData = timeline.map(d => ({
    ...d,
    dateLabel: new Date(d.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      ...(view === 'weekly' ? { year: '2-digit' } : {})
    })
  }));

  return (
    <div className="card">
      <div className="card-title">Commit Activity — {view === 'daily' ? 'Daily' : 'Weekly'} Frequency</div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={formattedData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <defs>
            {Object.entries(TYPE_COLORS).map(([key, color]) => (
              <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 10, fill: '#64748b' }}
            interval={Math.max(0, Math.floor(formattedData.length / 12))}
          />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
          {Object.entries(TYPE_COLORS).map(([key, color]) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={color}
              fill={`url(#grad-${key})`}
              strokeWidth={1.5}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
