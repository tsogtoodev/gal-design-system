// Competitors screen
function Competitors() {
  const competitors = [
    { name: 'Attio', logo: 'A', tint: '#16A34A', tintBg: '#DCFCE7', visibility: 78, rank: 1, change: 4.1 },
    { name: 'Stacklane', logo: 'S', tint: '#F5642B', tintBg: '#FEEBE0', visibility: 72, rank: 2, change: 6.4, you: true },
    { name: 'Salesforce', logo: 'S', tint: '#2563EB', tintBg: '#DBEAFE', visibility: 65, rank: 3, change: -1.5 },
    { name: 'Monday', logo: 'M', tint: '#D97706', tintBg: '#FEF3C7', visibility: 60, rank: 4, change: 2.8 },
    { name: 'Zendesk', logo: 'Z', tint: '#16A34A', tintBg: '#DCFCE7', visibility: 56, rank: 5, change: 0.7 },
    { name: 'Folk', logo: 'F', tint: '#F43F5E', tintBg: '#FFE4E6', visibility: 52, rank: 6, change: -2.5 },
    { name: 'HubSpot', logo: 'H', tint: '#14B8A6', tintBg: '#CCFBF1', visibility: 48, rank: 7, change: 3.2 },
  ];

  const platforms = [
    { name: 'ChatGPT', color: '#0F0F10', value: 95 },
    { name: 'Claude', color: '#F5642B', value: 78 },
    { name: 'Gemini', color: '#2563EB', value: 60 },
    { name: 'Perplexity', color: '#0F766E', value: 42 },
    { name: 'Grok', color: '#404045', value: 22 },
    { name: 'Others', color: '#A78BFA', value: 10 },
  ];

  const leaderboard = [
    ['Attio', 5800, 2840, 1654, 1458],
    ['Stacklane', 4450, 2200, 1450, 1345, true],
    ['Salesforce', 3234, 1523, 1234, 1023],
    ['Monday', 2280, 1429, 1123, 965],
    ['Zendesk', 1400, 1239, 830, 539],
  ];
  const maxVal = Math.max(...leaderboard.flatMap((r) => r.slice(1).filter((v) => typeof v === 'number')));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Pill kind="bare" style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13, padding: '8px 14px' }}>
          <Icon name="building-2" size={14} /> All brands <Icon name="chevron-down" size={14} />
        </Pill>
        <Pill kind="bare" style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13, padding: '8px 14px' }}>
          <Icon name="calendar" size={14} /> Last 7 days <Icon name="chevron-down" size={14} />
        </Pill>
        <Pill kind="bare" style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13, padding: '8px 14px' }}>
          <Icon name="bot" size={14} /> All models <Icon name="chevron-down" size={14} />
        </Pill>
        <Pill kind="bare" style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13, padding: '8px 14px' }}>
          <Icon name="globe" size={14} /> All countries <Icon name="chevron-down" size={14} />
        </Pill>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton icon="plus" variant="secondary" />
        </div>
      </div>

      {/* Stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          ['Total competitors', '7', '#16A34A', '+6.4%'],
          ['Avg Visibility Score', '78', '#16A34A', '+5.9%'],
          ['Your rank', '2/7', null, null],
          ['Shared Prompts', '12', '#16A34A', '+4.8%'],
        ].map(([label, v, col, delta]) => (
          <Card key={label} padded={false}>
            <div className="gal-stat">
              <div className="gal-stat-label"><Icon name="award" size={14} /><span>{label}</span></div>
              <div className="gal-stat-row">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span className="gal-stat-value">{v}</span>
                  {delta && (
                    <span style={{ color: col, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                      <Icon name="trending-up" size={12} />{delta}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Competitor table + platform distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        <Card padded={false}>
          <div style={{ padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>Competitor Overview Table</h2>
            <Button variant="outline">View all</Button>
          </div>
          {/* Stack bar */}
          <div style={{ padding: '0 22px 14px' }}>
            <div style={{ display: 'flex', height: 28, gap: 2, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ flex: 78, background: '#DCFCE7' }} />
              <div style={{ flex: 72, background: '#FEEBE0' }} />
              <div style={{ flex: 65, background: '#DBEAFE' }} />
              <div style={{ flex: 60, background: '#FEF3C7' }} />
              <div style={{ flex: 56, background: '#CCFBF1' }} />
              <div style={{ flex: 52, background: '#FFE4E6' }} />
              <div style={{ flex: 48, background: '#EDE9FE' }} />
            </div>
          </div>
          <table className="gal-table">
            <thead><tr><th>Name</th><th className="num">Visibility</th><th className="num">Rank</th><th className="num">Change</th></tr></thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name}>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                      <span className="dot-color" style={{ background: c.tint }} />
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: c.tintBg, color: c.tint, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{c.logo}</span>
                      <span>{c.name}</span>
                      {c.you && <Pill kind="neutral" style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 11, padding: '2px 8px' }}>You</Pill>}
                    </span>
                  </td>
                  <td className="num">{c.visibility}%</td>
                  <td className="num">{c.rank}</td>
                  <td className={`num ${c.change > 0 ? 'pos' : 'neg'}`}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                      <Icon name={c.change > 0 ? 'trending-up' : 'trending-down'} size={12} />
                      {c.change > 0 ? '+' : ''}{c.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Platform Distribution</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {platforms.map((p) => (
              <div key={p.name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 5, background: p.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 9 }}>{p.name[0]}</span>
                  <span style={{ fontSize: 13 }}>{p.name}</span>
                </div>
                <div style={{ height: 8, background: 'var(--bg-surface-2)', borderRadius: 999 }}>
                  <div style={{ width: `${p.value}%`, background: p.color, height: '100%', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card padded={false}>
        <div style={{ padding: '16px 22px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Competitor Prompt Leaderboard</h2>
        </div>
        <table className="gal-table">
          <thead>
            <tr>
              <th>Competitor</th>
              <th className="num"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, background: '#0F0F10', borderRadius: 3, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>G</span>ChatGPT <Icon name="chevrons-up-down" size={10} /></span></th>
              <th className="num"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, background: '#F5642B', borderRadius: 3, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>C</span>Claude <Icon name="chevrons-up-down" size={10} /></span></th>
              <th className="num"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, background: '#2563EB', borderRadius: 3, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>G</span>Gemini <Icon name="chevrons-up-down" size={10} /></span></th>
              <th className="num"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, background: '#0F766E', borderRadius: 3, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>P</span>Perplexity <Icon name="chevrons-up-down" size={10} /></span></th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(([name, ...vals], i) => {
              const isYou = vals[vals.length - 1] === true;
              const numVals = isYou ? vals.slice(0, -1) : vals;
              return (
                <tr key={name}>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--bg-surface-2)', color: 'var(--fg-1)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{name[0]}</span>
                      <span>{name}</span>
                      {isYou && <Pill kind="neutral" style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 11, padding: '2px 8px' }}>You</Pill>}
                    </span>
                  </td>
                  {numVals.map((v, k) => (
                    <td key={k} className="num" style={{
                      background: `rgba(37,99,235,${0.05 + (v / maxVal) * 0.20})`,
                    }}>
                      {typeof v === 'number' ? v.toLocaleString() : v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

window.Competitors = Competitors;
