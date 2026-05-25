// Main Gal app — routes between screens

const { useState: useStateApp } = React;

function App() {
  const [screen, setScreen] = useStateApp('workflow');
  const [collapsed, setCollapsed] = useStateApp(false);
  const [theme, setTheme] = useStateApp('light');

  // sync theme to <html data-theme>
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const breadcrumbs = {
    dashboard: ['Overview', 'Prompt Performance Overview'],
    workflow: ['Workflows', 'New User Marketing Signup'],
    competitors: [null, 'Competitors'],
    settings: [null, 'Settings'],
  };
  const [crumb1, crumb2] = breadcrumbs[screen] || ['', ''];

  const screenIcons = {
    dashboard: 'layout-grid',
    workflow: 'git-branch',
    competitors: 'bar-chart-3',
    settings: 'settings',
  };

  return (
    <div className={`gal-app ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar
        active={screen}
        onNav={setScreen}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <main>
        <div className="gal-topbar">
          <div className="gal-breadcrumb">
            <IconButton icon="chevron-left" variant="ghost" size={14} />
            <Icon name={screenIcons[screen]} size={14} />
            {crumb1 && <span>{crumb1}</span>}
            {crumb1 && <span>/</span>}
            <span className="current">{crumb2}</span>
            {screen === 'workflow' && <Icon name="star" size={14} />}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <IconButton
              icon={theme === 'dark' ? 'sun' : 'moon'}
              variant="ghost"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            />
            <IconButton icon="bell" variant="ghost" />
            <Avatar name="James Carter" size={30} />
          </div>
        </div>

        <div className="gal-content">
          {screen === 'dashboard' && <Dashboard />}
          {screen === 'workflow' && <Workflow />}
          {screen === 'competitors' && <Competitors />}
          {screen === 'settings' && <Settings />}
          {(screen !== 'dashboard' && screen !== 'workflow' && screen !== 'competitors' && screen !== 'settings') && (
            <Card style={{ textAlign: 'center', padding: 60 }}>
              <Icon name="construction" size={32} style={{ color: 'var(--fg-3)', marginBottom: 12 }} />
              <h2>Coming soon</h2>
              <p style={{ color: 'var(--fg-2)', marginTop: 8 }}>This surface lives in another part of the system.</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
