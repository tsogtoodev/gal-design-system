// Settings screen — sidebar with profile form
const { useState: useStateS } = React;

function Settings() {
  const [section, setSection] = useStateS('profile');
  const [twofa, setTwofa] = useStateS(false);

  const sections = [
    { id: 'profile', label: 'Profile', icon: 'user', group: 'Personal' },
    { id: 'notifications', label: 'Notifications', icon: 'bell', group: 'Personal' },
    { id: 'connections', label: 'Connections', icon: 'plug', group: 'Personal' },
    { id: 'sessions', label: 'Sessions', icon: 'monitor', group: 'Personal' },
    { id: 'general', label: 'General', icon: 'sliders-horizontal', group: 'Workspace' },
    { id: 'members', label: 'Members', icon: 'users', group: 'Workspace' },
    { id: 'plans', label: 'Plans', icon: 'layers', group: 'Workspace' },
    { id: 'billing', label: 'Billing', icon: 'credit-card', group: 'Workspace' },
    { id: 'developers', label: 'Developers', icon: 'code-2', group: 'Workspace' },
    { id: 'security', label: 'Security', icon: 'shield', group: 'Workspace' },
  ];

  const grouped = sections.reduce((acc, s) => {
    (acc[s.group] = acc[s.group] || []).push(s);
    return acc;
  }, {});

  return (
    <Card padded={false} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 640 }}>
      {/* Settings sidenav */}
      <div style={{ borderRight: '1px solid var(--border)', padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <IconButton icon="x" variant="ghost" size={14} />
          <span style={{ fontWeight: 600, fontSize: 16 }}>Settings</span>
        </div>
        <div className="gal-field" style={{ marginBottom: 14, height: 36 }}>
          <Icon name="search" size={14} />
          <input placeholder="Search settings…" />
        </div>
        {Object.entries(grouped).map(([group, items]) => (
          <React.Fragment key={group}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '10px 8px 6px' }}>{group}</div>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '8px 10px', border: 0, background: section === item.id ? 'var(--bg-surface-2)' : 'transparent',
                  borderRadius: 8, font: '500 13px/1 var(--font-sans)',
                  color: section === item.id ? 'var(--fg-1)' : 'var(--fg-2)',
                  textAlign: 'left', cursor: 'pointer', marginBottom: 2,
                }}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Profile content */}
      <div style={{ padding: '22px 28px' }}>
        <h2 style={{ marginBottom: 22 }}>Profile</h2>

        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 18 }}>
          <Avatar name="John Doe" size={56} />
          <div style={{ flex: 1 }}>
            <label className="gal-field-label">Preferred name</label>
            <Field value="John Doe" onChange={() => {}} />
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="gal-field-label">Username</label>
          <Field value="@johndoe" onChange={() => {}} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="gal-field-label">Email</label>
          <Field value="johndoe@gmail.com" onChange={() => {}} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="gal-field-label">Website</label>
          <Field icon="link" placeholder="example.com" onChange={() => {}} />
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '28px 0 14px' }}>Language &amp; Region</h3>

        <div style={{ marginBottom: 18 }}>
          <label className="gal-field-label">Language</label>
          <Field value="English" onChange={() => {}} rightSlot={<Icon name="chevron-down" size={14} />} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="gal-field-label">Timezone</label>
          <Field value="(GMT-07:00) America/Los Angeles (PDT)" onChange={() => {}} rightSlot={<Icon name="chevron-down" size={14} />} />
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '28px 0 14px' }}>Security settings</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Password</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 4 }}>Change your sign-in password</div>
          </div>
          <Button variant="outline">Change password</Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Enable two-factor authentication (2FA)</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 13, marginTop: 4 }}>Confirm sign-ins with a temporary verification code</div>
          </div>
          <Toggle on={twofa} onChange={setTwofa} />
        </div>
      </div>
    </Card>
  );
}

window.Settings = Settings;
