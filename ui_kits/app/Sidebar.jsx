// Gal · sidebar

const { useState: useStateSb } = React;

function Sidebar({ active, onNav, collapsed, onToggleCollapse }) {
  const sections = [
    {
      title: 'Workspace',
      items: [
        { id: 'dashboard', label: 'Overview', icon: 'layout-grid' },
        { id: 'workflow', label: 'Workflows', icon: 'git-branch' },
        { id: 'competitors', label: 'Competitors', icon: 'bar-chart-3' },
      ],
    },
    {
      title: 'Personal',
      items: [
        { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: 6 },
        { id: 'tasks', label: 'Tasks', icon: 'list-checks' },
        { id: 'schedule', label: 'Schedule', icon: 'calendar' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { id: 'integrations', label: 'Integrations', icon: 'database' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
      ],
    },
  ];

  return (
    <aside className="gal-sidebar">
      <div className="gal-sidebar-head">
        <div className="gal-brand">
          <img src="../../assets/logo.png" alt="Gal" />
          {!collapsed && <span>Gal</span>}
          {!collapsed && (
            <Icon name="chevron-down" size={14} style={{ color: 'var(--fg-3)' }} />
          )}
        </div>
        <button
          className="gal-collapse-btn"
          onClick={onToggleCollapse}
          aria-label="Collapse sidebar"
        >
          <Icon name={collapsed ? 'panel-left-open' : 'panel-left-close'} size={16} />
        </button>
      </div>

      {!collapsed && (
        <div className="gal-search">
          <Icon name="search" size={14} />
          <input placeholder="Search" />
          <span style={{ display: 'inline-flex', gap: 2 }}>
            <span className="gal-kbd">⌘</span>
            <span className="gal-kbd">K</span>
          </span>
        </div>
      )}

      {sections.map((section, i) => (
        <React.Fragment key={section.title}>
          {!collapsed && <div className="gal-nav-section">{section.title}</div>}
          {collapsed && i > 0 && (
            <div style={{ height: 1, background: 'var(--border)', margin: '8px 4px' }} />
          )}
          {section.items.map((item) => (
            <button
              key={item.id}
              className={`gal-nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => onNav(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </button>
          ))}
        </React.Fragment>
      ))}

      {!collapsed && (
        <div className="gal-credit">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Credits used</span>
            <span style={{ color: 'var(--fg-1)', fontFamily: 'var(--font-mono)' }}>
              810/3,100
            </span>
          </div>
          <div className="gal-credit-bar">
            <div />
          </div>
        </div>
      )}
    </aside>
  );
}

window.Sidebar = Sidebar;
