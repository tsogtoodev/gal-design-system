// Gal AI app — element components used in the conversation.
// Each component returns the same Gal-styled markup as the preview/ai-*.html
// specimens, but as React. Exposed on window so app.jsx can use them.

const { useState, useEffect, useRef } = React;

/* ---------- Icon helper ---------- */
function Icon({ name, size = 14, style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ icons: window.lucide.icons, attrs: { width: size, height: size } });
    }
  }, [name, size]);
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size, ...style }} {...rest} />;
}

/* ---------- Pill ---------- */
function Pill({ kind = 'neutral', children, style }) {
  return <span className={`pill ${kind}`} style={style}>{children}</span>;
}

/* ---------- Mono label ---------- */
function ML({ children, style }) {
  return <span className="mono-label" style={style}>{children}</span>;
}

/* ===================== Tool ===================== */
function Tool({ calls }) {
  return (
    <div className="elem">
      {calls.map((c, i) => (
        <div key={i} className="tool-row">
          <span className={`tool-ic ${c.state}`}>
            <Icon name={c.state === 'running' ? 'loader-2' : c.state === 'done' ? 'check' : 'x'} size={12} />
          </span>
          <span className="tool-name">{c.fn}(<span className="arg">"{c.arg}"</span>)</span>
          <Pill kind={c.state === 'running' ? 'info' : c.state === 'done' ? 'success' : 'danger'}>
            {c.state === 'running' ? 'RUNNING' : c.state === 'done' ? (c.note || 'DONE') : 'ERROR'}
          </Pill>
        </div>
      ))}
    </div>
  );
}

/* ===================== Reasoning ===================== */
function Reasoning({ running = false, seconds = 0, content, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`elem rsn ${running ? 'running' : ''} ${open ? 'open' : ''}`}>
      <button className="rsn-head" onClick={() => setOpen(!open)}>
        <span className="rsn-icon"><Icon name={running ? 'brain' : 'check'} size={12} /></span>
        <span className="rsn-title">
          {running ? 'Reasoning' : `Reasoned for ${seconds} seconds`}
          {running && <span className="t-time">{seconds}s</span>}
        </span>
        {running ? <Pill kind="info">RUNNING</Pill> : <ML>{(content || []).length} steps</ML>}
        <Icon name="chevron-down" size={14} style={{ color: 'var(--fg-3)' }} />
      </button>
      <div className="rsn-body">
        <div className="clip">
          <div className="rsn-pad">
            {(content || []).map((line, i) => (
              <div key={i} style={{ marginTop: i ? 8 : 0 }} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== Plan ===================== */
function Plan({ steps }) {
  return (
    <div className="elem">
      {steps.map((s, i) => (
        <div key={i} className={`plan-step ${s.state}`}>
          <span className="num">{String(i + 1).padStart(2, '0')}</span>
          <div className="body">
            <div className="step-title">{s.title}</div>
            <div className="step-sub">{s.sub}</div>
          </div>
          {s.state === 'done' && <Pill kind="success">DONE</Pill>}
          {s.state === 'running' && <Pill kind="info">RUNNING</Pill>}
          {s.state === 'pending' && <Pill kind="neutral">QUEUED</Pill>}
        </div>
      ))}
    </div>
  );
}

/* ===================== CodeBlock ===================== */
function CodeBlock({ file, lang = 'typescript', children, onCopy }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-block">
      <div className="code-head">
        <Icon name="file-code-2" size={12} style={{ color: 'var(--fg-3)' }} />
        <span className="file">{file}</span>
        <span className="lang">{lang}</span>
        <span className="spacer" />
        <button className="ibtn" onClick={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
          if (onCopy) onCopy();
        }}>
          <Icon name={copied ? 'check' : 'copy'} size={12} />
        </button>
      </div>
      <pre className="code-pre" dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}

/* ===================== Sources ===================== */
function Sources({ list }) {
  return (
    <div className="elem">
      <div className="src-grid">
        {list.map((s, i) => (
          <a key={i} className="src-row">
            <span className="src-num">{i + 1}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="src-title">{s.title}</div>
              <div className="src-meta">{s.host} · {s.date}</div>
            </div>
            <Icon name="external-link" size={12} style={{ color: 'var(--fg-3)' }} />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ===================== WebPreview ===================== */
function WebPreview({ host, title, desc, letter = 'V', accent = '#0F0F10' }) {
  return (
    <a className="elem webp">
      <div className="webp-thumb" style={{ background: `linear-gradient(135deg, ${accent}, #C84715)` }}>
        <span style={{ position: 'absolute', bottom: 8, left: 8, font: '700 18px/1 var(--font-sans)', color: 'white' }}>{letter}</span>
      </div>
      <div className="webp-body">
        <div className="webp-host">
          <span style={{ width: 12, height: 12, borderRadius: 3, background: accent, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'var(--font-sans)', fontSize: 8 }}>{letter}</span>
          {host}
          <Icon name="external-link" size={10} style={{ marginLeft: 2 }} />
        </div>
        <div className="webp-title">{title}</div>
        <div className="webp-desc">{desc}</div>
      </div>
    </a>
  );
}

/* ===================== Suggestion chips ===================== */
function SuggestionChips({ items, onPick }) {
  return (
    <div className="sug-chips">
      {items.map((s, i) => (
        <button key={i} className="sug-chip" onClick={() => onPick && onPick(s)}>{s}</button>
      ))}
    </div>
  );
}

/* ===================== Actions row ===================== */
function Actions({ onCopy, onRetry, onLike, onDislike }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="actions-row">
      <button className="ibtn" title="Copy" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1000); onCopy && onCopy(); }}>
        <Icon name={copied ? 'check' : 'copy'} size={14} />
      </button>
      <button className="ibtn" title="Regenerate" onClick={onRetry}><Icon name="refresh-cw" size={14} /></button>
      <button className="ibtn" title="Good" onClick={onLike}><Icon name="thumbs-up" size={14} /></button>
      <button className="ibtn" title="Bad" onClick={onDislike}><Icon name="thumbs-down" size={14} /></button>
      <button className="ibtn" title="Share"><Icon name="share-2" size={14} /></button>
    </div>
  );
}

/* ===================== Loader (typing dots) ===================== */
function Loader() {
  return (
    <div className="dots">
      <span></span><span></span><span></span>
    </div>
  );
}

/* ===================== Chart ===================== */
function Chart() {
  return (
    <div className="elem chart-card">
      <div className="chart-head">
        <h3>Deploy duration · last 7 days</h3>
        <span style={{ flex: 1 }}></span>
        <Pill kind="success">−18% WOW</Pill>
      </div>
      <svg width="100%" height="160" viewBox="0 0 480 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5642B" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#F5642B" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <line x1="40" y1="130" x2="470" y2="130" stroke="var(--border)"/>
        <line x1="40" y1="90"  x2="470" y2="90"  stroke="var(--border)" strokeDasharray="2 4"/>
        <line x1="40" y1="50"  x2="470" y2="50"  stroke="var(--border)" strokeDasharray="2 4"/>
        <path d="M60,110 Q120,80 180,90 T300,70 T420,40 L420,130 L60,130 Z" fill="url(#cg2)"/>
        <path d="M60,110 Q120,80 180,90 T300,70 T420,40" stroke="#F5642B" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {[[60,110],[120,80],[180,90],[240,72],[300,70],[360,52],[420,40]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3" fill="#F5642B" stroke="white" strokeWidth="1.5"/>
        ))}
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => (
          <text key={d} x={60 + i * 60} y="150" fontFamily="var(--font-mono)" fontSize="10" fill="#9A9AA1" textAnchor="middle" letterSpacing="0.06em">{d.toUpperCase()}</text>
        ))}
      </svg>
    </div>
  );
}

/* ===================== Weather ===================== */
function Weather() {
  return (
    <div className="elem weather-card">
      <div className="city">San Francisco</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="temp">68°<span style={{ fontSize: 22, opacity: 0.7 }}>F</span></div>
          <div className="desc">Mostly sunny · feels like 66°</div>
        </div>
        <Icon name="sun" size={40} style={{ color: '#FACC15' }} />
      </div>
    </div>
  );
}

/* ===================== Image ===================== */
function GenImage({ prompt = '"A continuous-curvature squircle at sunset"', model = 'Flux 1.1 Pro', meta = '1920 × 1080 · 3.4s' }) {
  return (
    <div className="aiimg">
      <div className="aiimg-vis">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.85 }}>
          <circle cx="50" cy="50" r="32" stroke="white" strokeWidth="0.5" opacity="0.4"/>
          <circle cx="50" cy="50" r="22" stroke="white" strokeWidth="0.5" opacity="0.55"/>
          <circle cx="50" cy="50" r="12" fill="white" opacity="0.85"/>
          <path d="M22 60 Q40 30 50 50 T78 40" stroke="white" strokeWidth="1" fill="none" opacity="0.7"/>
        </svg>
      </div>
      <div className="aiimg-foot">
        <div style={{ color: 'var(--fg-1)', marginBottom: 4 }}>{prompt}</div>
        <ML>{model} · {meta}</ML>
      </div>
    </div>
  );
}

/* ===================== Task list ===================== */
function TaskList({ items }) {
  return (
    <div className="elem">
      {items.map((t, i) => (
        <div key={i} className={`task ${t.state}`}>
          <span className="dot">
            {t.state === 'running' && <Icon name="loader-2" size={10} style={{ animation: 'spin 0.9s linear infinite' }} />}
          </span>
          <span className="label">{t.label}</span>
          <span className="t-time">{t.time || '—'}</span>
        </div>
      ))}
    </div>
  );
}

/* ===================== Branch nav ===================== */
function Branch({ idx = 2, total = 3, onPrev, onNext }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <button className="ibtn" onClick={onPrev}><Icon name="chevron-left" size={12} /></button>
      <span className="mono-label" style={{ fontSize: 11 }}>{idx} / {total}</span>
      <button className="ibtn" onClick={onNext}><Icon name="chevron-right" size={12} /></button>
    </span>
  );
}

/* ===================== Citation ===================== */
function Cite({ n, onClick }) {
  return <span className="cite" onClick={onClick}>{n}</span>;
}

/* ===================== ModelSelector ===================== */
const MODELS = [
  { group: 'Anthropic', name: 'Claude 4.5 Sonnet', label: 'Claude 4.5', dot: '#F5642B', desc: '200K context · best balance' },
  { group: 'Anthropic', name: 'Claude 4 Opus',     label: 'Claude Opus', dot: '#F5642B', desc: 'Heaviest reasoning · slower' },
  { group: 'Anthropic', name: 'Claude 4 Haiku',    label: 'Claude Haiku', dot: '#F5642B', desc: 'Fast · cheap' },
  { group: 'OpenAI',    name: 'GPT-5',             label: 'GPT-5', dot: '#10A37F', desc: '128K context · reasoning' },
  { group: 'OpenAI',    name: 'GPT-5 mini',        label: 'GPT-5 mini', dot: '#10A37F', desc: 'Lighter, faster' },
  { group: 'Google',    name: 'Gemini 2.5 Pro',    label: 'Gemini 2.5', dot: '#2563EB', desc: 'Long context · multimodal' },
];
function ModelSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const hostRef = useRef(null);
  useEffect(() => {
    function onClick(e) { if (!hostRef.current?.contains(e.target)) setOpen(false); }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, []);
  const selected = MODELS.find(m => m.name === value) || MODELS[0];
  const groups = {};
  MODELS.forEach(m => { (groups[m.group] = groups[m.group] || []).push(m); });
  return (
    <div className={`ms-host ${open ? 'open' : ''}`} ref={hostRef}>
      <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        <Icon name="cpu" size={12} />
        <span>{selected.label}</span>
        <Icon name="chevron-down" size={12} />
      </button>
      <div className="ms-pop">
        {Object.entries(groups).map(([g, items], gi) => (
          <React.Fragment key={g}>
            {gi > 0 && <div className="ms-divider" />}
            <div className="ms-section">{g}</div>
            {items.map(m => (
              <div key={m.name}
                className={`ms-row ${m.name === selected.name ? 'selected' : ''}`}
                onClick={(e) => { e.stopPropagation(); onChange(m.name); setOpen(false); }}>
                <span className="ms-dot" style={{ background: m.dot }} />
                <div className="ms-info">
                  <div className="ms-name">{m.name}</div>
                  <div className="ms-desc">{m.desc}</div>
                </div>
                <Icon name="check" size={14} style={{ color: 'var(--accent)' }} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Expose everything globally
Object.assign(window, {
  Icon, Pill, ML, Tool, Reasoning, Plan, CodeBlock, Sources, WebPreview,
  SuggestionChips, Actions, Loader, Chart, Weather, GenImage, TaskList,
  Branch, Cite, ModelSelector,
});
