// Workflow editor screen — node graph
const { useState: useStateW } = React;

function WorkflowNode({ category, title, sub, icon, iconBg, iconFg, style }) {
  return (
    <div className="wf-node" style={style}>
      <div className="wf-node-icon" style={{ background: iconBg, color: iconFg }}>
        <Icon name={icon} size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="wf-node-title">{title}</div>
        <div className="wf-node-sub">{sub}</div>
      </div>
    </div>
  );
}

function NodeFrame({ category, kind, children, style }) {
  return (
    <div style={style}>
      <div className="wf-frame-labels">
        <MonoLabel>{category}</MonoLabel>
        <MonoLabel>{kind}</MonoLabel>
      </div>
      {children}
    </div>
  );
}

function Workflow({ onClose }) {
  const [published, setPublished] = useStateW(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Segmented options={['Editor', 'Runs']} value="Editor" onChange={() => {}} />

      {!published && (
        <Card style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--info-soft)', color: 'var(--info)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="info" size={14} />
          </span>
          <div style={{ fontSize: 14 }}>This workflow has unpublished changes</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <Button variant="outline">Discard changes</Button>
            <Button variant="secondary" onClick={() => setPublished(true)}>Publish changes</Button>
          </div>
        </Card>
      )}

      {published && (
        <Card style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--success-soft)', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check" size={14} />
          </span>
          <div style={{ fontSize: 14 }}>Workflow published — running on new user registration.</div>
          <div style={{ marginLeft: 'auto' }}>
            <Pill kind="success" dot>PUBLISHED</Pill>
          </div>
        </Card>
      )}

      {/* Editor canvas */}
      <div
        style={{
          position: 'relative',
          background: 'var(--bg-surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          minHeight: 720,
          padding: 40,
          backgroundImage: 'radial-gradient(rgba(15,15,15,0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          overflow: 'hidden',
        }}
      >
        {/* SVG connectors */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--fg-3)" opacity="0.5" />
            </marker>
          </defs>
          {/* Trigger → If/else */}
          <line x1="50%" y1="120" x2="50%" y2="180" stroke="var(--fg-3)" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.5" />

          {/* Conditional split: trunk → horizontal bar → two verticals down through badges to actions.
              Note: SVG path "d" doesn't accept % units. We use <line> elements (which DO support %)
              to build an orthogonal connector that the NO/YES pills sit on top of. */}
          {/* trunk stub down from If/else */}
          <line x1="50%" y1="280" x2="50%" y2="310" stroke="var(--fg-3)" strokeWidth="1.5" opacity="0.5" />
          {/* horizontal junction bar */}
          <line x1="30%" y1="310" x2="70%" y2="310" stroke="var(--fg-3)" strokeWidth="1.5" opacity="0.5" />
          {/* left branch down through NO badge → action */}
          <line x1="30%" y1="310" x2="30%" y2="360" stroke="var(--fg-3)" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.5" />
          {/* right branch down through YES badge → action */}
          <line x1="70%" y1="310" x2="70%" y2="360" stroke="var(--fg-3)" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.5" />

          {/* Subscriber → email */}
          <line x1="30%" y1="460" x2="30%" y2="520" stroke="var(--fg-3)" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.5" />
          <line x1="70%" y1="460" x2="70%" y2="520" stroke="var(--fg-3)" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.5" />
        </svg>

        <NodeFrame category="Trigger" kind="User Activity" style={{ position: 'absolute', left: '50%', top: 36, transform: 'translateX(-50%)', width: 320 }}>
          <WorkflowNode title="User registered" sub="User registered on the platform" icon="user-plus" iconBg="var(--info-soft)" iconFg="var(--info)" />
        </NodeFrame>

        <NodeFrame category="Logic" kind="Conditions" style={{ position: 'absolute', left: '50%', top: 200, transform: 'translateX(-50%)', width: 320 }}>
          <WorkflowNode title="If / else" sub="If user is VIP" icon="git-fork" iconBg="var(--warning-soft)" iconFg="var(--warning)" />
        </NodeFrame>

        {/* Conditional badges */}
        <div style={{ position: 'absolute', left: 'calc(30% - 20px)', top: 320 }}>
          <Pill kind="danger" style={{ textTransform: 'uppercase' }}>NO</Pill>
        </div>
        <div style={{ position: 'absolute', left: 'calc(70% - 24px)', top: 320 }}>
          <Pill kind="success" style={{ textTransform: 'uppercase' }}>YES</Pill>
        </div>

        <NodeFrame category="Action" kind="User Management" style={{ position: 'absolute', left: '30%', top: 380, transform: 'translateX(-50%)', width: 280 }}>
          <WorkflowNode title="Add subscriber" sub="Add user to Mailchimp audience" icon="user-plus-2" iconBg="var(--accent-soft)" iconFg="var(--accent)" />
        </NodeFrame>

        <NodeFrame category="Action" kind="User Management" style={{ position: 'absolute', left: '70%', top: 380, transform: 'translateX(-50%)', width: 280 }}>
          <WorkflowNode title="Add subscriber" sub="Add user to Mailchimp audience" icon="user-plus-2" iconBg="var(--accent-soft)" iconFg="var(--accent)" />
        </NodeFrame>

        <NodeFrame category="Action" kind="Communication" style={{ position: 'absolute', left: '30%', top: 540, transform: 'translateX(-50%)', width: 280 }}>
          <WorkflowNode title="Send email" sub="Use email template: Welcome standard" icon="mail" iconBg="var(--accent-soft)" iconFg="var(--accent)" />
        </NodeFrame>

        <NodeFrame category="Action" kind="Communication" style={{ position: 'absolute', left: '70%', top: 540, transform: 'translateX(-50%)', width: 280 }}>
          <WorkflowNode title="Send email" sub="Use email template: Welcome VIP" icon="mail" iconBg="var(--accent-soft)" iconFg="var(--accent)" />
        </NodeFrame>
      </div>
    </div>
  );
}

window.Workflow = Workflow;
