// Dashboard / Overview screen
const { useState: useStateD } = React;

function Dashboard() {
  const [range, setRange] = useStateD('Today');

  const stats = [
    { label: 'Total Uses', value: '1,200', color: '#16A34A', icon: 'users', points: [10, 12, 8, 16, 12, 22, 18, 24, 20] },
    { label: 'Unique Users', value: '320', color: '#F5642B', icon: 'user', points: [12, 8, 14, 10, 18, 6, 16, 10, 20] },
    { label: 'Daily Uses', value: '120', color: '#16A34A', icon: 'calendar', points: [4, 8, 6, 10, 12, 16, 14, 22, 24] },
  ];

  const activity = [
    ['04-01-2026, 09:12', 'Jane D.', 'ChatGPT', 'Boost your sales with eco-friendly products…', 120],
    ['04-01-2026, 10:45', 'Mark S.', 'ChatGPT', 'Create ad copy for sustainable solutions…', 110],
    ['04-01-2026, 14:30', 'Alice K.', 'ChatGPT', 'Promote your green products effectively…', 130],
    ['04-02-2026, 09:15', 'Bob L.',  'Claude',  'Create futuristic cityscapes with neon lights…', 145],
    ['04-02-2026, 11:45', 'Clara S.', 'ChatGPT', 'Drafted a compelling cover letter for marketing…', 120],
    ['04-03-2026, 16:00', 'David R.', 'ChatGPT', 'Generated surreal artwork featuring animals in hats…', 134],
    ['04-04-2026, 08:50', 'Emily T.', 'ChatGPT', 'Explained quantum computing basics for beginners…', 140],
    ['04-04-2026, 13:20', 'Frank M.', 'Claude',  'Visualized a serene mountain lake at sunset…', 150],
    ['04-05-2026, 10:05', 'Grace N.', 'Claude',  'Summarized recent trends in sustainable fashion…', 125],
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Prompt hero card */}
      <Card style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-2)' }}>
          <Icon name="message-square" size={14} />
          <span style={{ fontSize: 13 }}>Prompt</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Pill kind="neutral" style={{ textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-sans)', fontSize: 12 }}>product</Pill>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', fontSize: 12 }}>
              <Icon name="bar-chart-2" size={14} /> 1,200
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', fontSize: 12 }}>
              <Icon name="eye" size={14} /> 320
            </span>
          </div>
        </div>
        <div style={{ marginTop: 10, font: '600 28px/1.2 var(--font-sans)', letterSpacing: '-0.01em' }}>
          best AI CRM tools
        </div>
        <div style={{ marginTop: 16 }}>
          <Equalizer count={80} seed={42} palette={['#F5642B','#F5642B','#9A9AA1','#9A9AA1','#9A9AA1','#2563EB','#16A34A']} />
        </div>
      </Card>

      {/* Stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {stats.map((s) => (
          <Card key={s.label} padded={false}>
            <div className="gal-stat">
              <div className="gal-stat-label">
                <Icon name={s.icon} size={14} />
                <span>{s.label}</span>
              </div>
              <div className="gal-stat-row">
                <div className="gal-stat-value">{s.value}</div>
                <Sparkline points={s.points} color={s.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity log */}
      <Card padded={false}>
        <div style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Activity Log</h2>
          <Segmented options={['Today', '7D', '1M', '3M']} value={range} onChange={setRange} />
        </div>
        <table className="gal-table">
          <tbody>
            {activity.map((row, i) => (
              <tr key={i}>
                <td style={{ width: 170, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{row[0]}</td>
                <td style={{ width: 140 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <Avatar name={row[1]} size={22} />
                    <span>{row[1]}</span>
                  </span>
                </td>
                <td style={{ width: 120, color: 'var(--fg-2)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 2, height: 12, background: row[2] === 'Claude' ? '#F5642B' : 'var(--fg-3)' }} />
                    {row[2]}
                  </span>
                </td>
                <td style={{ color: 'var(--fg-1)' }}>
                  <span style={{ color: 'var(--fg-2)' }}>Output:</span>{' '}
                  <span>"{row[3]}"</span>
                </td>
                <td className="num" style={{ width: 100, color: 'var(--fg-2)' }}>{row[4]} tokens</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

window.Dashboard = Dashboard;
