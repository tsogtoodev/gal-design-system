// Gal AI app — main shell.
// Demonstrates the full AI Components library in a working conversation flow.

const { useState: useStateApp, useEffect: useEffApp, useRef: useRefApp } = React;

/* ---------- Seed data ---------- */
const THREADS = [
  { id: 't1', title: 'Refactor auth middleware',     time: '2m',  active: true },
  { id: 't2', title: 'Q4 deployment changelog',      time: '1h' },
  { id: 't3', title: 'Generate landing page hero',   time: '4h' },
  { id: 't4', title: 'Pull weather for SF & NYC',    time: 'Wed' },
  { id: 't5', title: 'Build a chart from CSV',       time: 'Tue' },
  { id: 't6', title: 'Search competitor pricing',    time: 'Mon' },
  { id: 't7', title: 'Onboarding flow analysis',     time: 'Sun' },
];

const SUGGESTIONS_EMPTY = [
  { icon: 'git-branch', text: 'Help me refactor the auth middleware in src/api/' },
  { icon: 'sparkles',   text: 'Generate a hero image for the launch landing page' },
  { icon: 'bar-chart-3', text: 'Build a chart from the deploys.csv file' },
  { icon: 'cloud-sun',  text: 'What\u2019s the weather across our office cities?' },
];

const REASONING_STEPS = [
  'The user wants a refactor plan. I should split this into observable concerns: token verification, session lookup, and RBAC.',
  'Each layer should be independently testable. Let me check the existing middleware structure before answering\u2026',
  'Looking at <code>src/api/auth.ts</code>, the JWT decode and claims check are intertwined. Splitting these will let me reuse the verify step elsewhere.',
];

const PLAN_STEPS = [
  { state: 'done',    title: 'Read existing auth middleware', sub: 'Identify shared modules, dependencies, exports' },
  { state: 'done',    title: 'Map three target layers',       sub: 'Token verification \u00b7 Session lookup \u00b7 RBAC' },
  { state: 'running', title: 'Draft requireRole() helper',    sub: 'Pure function, accepts Role, returns middleware' },
  { state: 'pending', title: 'Write migration plan',          sub: 'Per-route conversion order, rollback strategy' },
  { state: 'pending', title: 'Generate PR description',       sub: 'Summary, breaking changes, test coverage' },
];

const TOOL_CALLS = [
  { fn: 'read_file',    arg: 'src/api/auth.ts',  state: 'done', note: '142 LINES' },
  { fn: 'grep_search',  arg: 'requireRole',      state: 'done', note: '42 MATCHES' },
  { fn: 'write_file',   arg: 'src/api/requireRole.ts', state: 'running' },
];

const SOURCES = [
  { title: 'Architectural patterns for auth middleware in TypeScript', host: 'vercel.com',      date: 'Apr 2024 \u00b7 8 min read' },
  { title: 'JWT verification best practices \u2014 RFC 8725',           host: 'rfc-editor.org',   date: '2020 \u00b7 standard' },
  { title: 'Why caching session lookups is harder than it looks',       host: 'internal',         date: '12/31/2025 \u00b7 retro' },
];

const CODE_HTML = `<span class="tk-comment">// Verify, lookup, authorize \u2014 three pure layers</span>
<span class="tk-keyword">export async function</span> <span class="tk-fn">requireRole</span>(role: <span class="tk-type">Role</span>) {
  <span class="tk-keyword">return async</span> (req: <span class="tk-type">Request</span>) =&gt; {
    <span class="tk-keyword">const</span> token = <span class="tk-fn">verifyJwt</span>(req.headers.authorization);
    <span class="tk-keyword">const</span> session = <span class="tk-keyword">await</span> <span class="tk-fn">lookupSession</span>(token.sub);
    <span class="tk-keyword">if</span> (!session.roles.includes(role)) {
      <span class="tk-keyword">throw new</span> <span class="tk-type">Forbidden</span>(<span class="tk-string">"insufficient role"</span>);
    }
    <span class="tk-keyword">return</span> session;
  };
}`;

/* ---------- Sidebar ---------- */
function Sidebar({ activeId, onSelect, onNew }) {
  return (
    <aside className="gai-side">
      <div className="gai-side-head">
        <div className="gai-brand">
          <img src="../../assets/logo.png" alt="Gal" />
          <span>Gal</span>
        </div>
        <button className="ibtn"><Icon name="panel-left-close" size={14} /></button>
      </div>

      <button className="gai-new" onClick={onNew}>
        <Icon name="plus" size={14} />
        New conversation
      </button>

      <div className="gai-section">Recent</div>
      <div className="gai-threads">
        {THREADS.map(t => (
          <button key={t.id} className={`gai-thread ${t.id === activeId ? 'active' : ''}`} onClick={() => onSelect(t.id)}>
            <Icon name="message-square" size={12} style={{ color: 'var(--fg-3)', flexShrink: 0 }} />
            <span className="label">{t.title}</span>
            <span className="time">{t.time}</span>
          </button>
        ))}
      </div>

      <div className="gai-side-foot">
        <button className="gai-user">
          <span className="av" style={{ backgroundImage: "url('https://i.pravatar.cc/60?img=7')" }}></span>
          <div className="info">
            <div className="name">James Carter</div>
            <div className="plan">Pro</div>
          </div>
          <Icon name="chevron-up" size={12} style={{ color: 'var(--fg-3)' }} />
        </button>
      </div>
    </aside>
  );
}

/* ---------- Topbar ---------- */
function Topbar({ model, onModel, onOpenArtifact, artifactOpen }) {
  return (
    <header className="gai-top">
      <div className="gai-breadcrumb">
        <Icon name="message-square" size={12} />
        <span>Threads</span>
        <span>/</span>
        <span className="current">Refactor auth middleware</span>
      </div>
      <div className="right">
        <ModelSelector value={model} onChange={onModel} />
        <button className={`ibtn ${artifactOpen ? '' : ''}`} title="Toggle artifact" onClick={onOpenArtifact}>
          <Icon name={artifactOpen ? 'panel-right-close' : 'panel-right-open'} size={14} />
        </button>
        <button className="ibtn"><Icon name="more-vertical" size={14} /></button>
      </div>
    </header>
  );
}

/* ---------- Message ---------- */
function UserMessage({ children }) {
  return (
    <div className="msg user">
      <span className="av" style={{ backgroundImage: "url('https://i.pravatar.cc/60?img=7')" }}></span>
      <div className="body">
        <ML>You</ML>
        <div className="bubble">{children}</div>
      </div>
    </div>
  );
}

function BotMessage({ children, branchIdx, branchTotal }) {
  return (
    <div className="msg bot">
      <span className="av bot"><Icon name="sparkles" size={14} /></span>
      <div className="body" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ML>Gal</ML>
          {branchIdx && <Branch idx={branchIdx} total={branchTotal} />}
        </div>
        <div className="bubble">{children}</div>
        <Actions />
      </div>
    </div>
  );
}

/* ---------- Empty state ---------- */
function EmptyState({ onPick }) {
  return (
    <div className="gai-empty">
      <h1>How can I help you today?</h1>
      <p>Ask anything. Attach files, switch models, or pick a starter below.</p>
      <div className="sugs">
        {SUGGESTIONS_EMPTY.map((s, i) => (
          <button key={i} className="sug" onClick={() => onPick(s.text)}>
            <Icon name={s.icon} size={14} />
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Composer ---------- */
function Composer({ onSend, draft, setDraft, attachments, setAttachments }) {
  const editorRef = useRefApp(null);

  function send() {
    const v = (editorRef.current?.innerText || '').trim();
    if (!v) return;
    onSend(v);
    if (editorRef.current) editorRef.current.innerText = '';
    setAttachments([]);
  }

  useEffApp(() => {
    if (editorRef.current && draft) editorRef.current.innerText = draft;
  }, [draft]);

  return (
    <div className="gai-composer-wrap">
      <div className="gai-composer-inner">
        <div className="gai-composer">
          {attachments.length > 0 && (
            <div className="gai-composer-atts">
              {attachments.map(a => (
                <span key={a.id} className="gai-att">
                  <Icon name={a.icon} size={11} />
                  {a.name}
                  <button className="x" onClick={() => setAttachments(attachments.filter(x => x.id !== a.id))}>
                    <Icon name="x" size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div
            className="gai-composer-editor"
            contentEditable
            ref={editorRef}
            data-placeholder="Reply to thread or paste a prompt\u2026"
            suppressContentEditableWarning
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="gai-composer-toolbar">
            <button className="ibtn" title="Attach" onClick={() => {
              setAttachments([...attachments, { id: Date.now(), icon: 'file-text', name: 'spec-v3.pdf' }]);
            }}>
              <Icon name="paperclip" size={14} />
            </button>
            <button className="ibtn" title="Image"><Icon name="image" size={14} /></button>
            <button className="ibtn" title="Voice"><Icon name="mic" size={14} /></button>
            <span style={{ width: 1, height: 14, background: 'var(--border)', margin: '0 4px' }}></span>
            <button className="btn btn-outline" style={{ fontSize: 11, padding: '5px 10px' }}>
              <Icon name="globe" size={12} /> Search
            </button>
            <span style={{ flex: 1 }}></span>
            <span className="mono-label" style={{ marginRight: 6 }}>\u2318 \u21B5 to send</span>
            <button className="send" onClick={send} aria-label="Send">
              <Icon name="arrow-up" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Artifact panel ---------- */
function ArtifactPanel({ onClose }) {
  const [tab, setTab] = useStateApp('preview');
  return (
    <aside className="gai-artifact">
      <div className="gai-artifact-head">
        <Icon name="code-2" size={14} />
        <span className="t">requireRole.ts</span>
        <Pill kind="success">SAVED</Pill>
        <div className="right">
          <button className="ibtn" title="Download"><Icon name="download" size={14} /></button>
          <button className="ibtn" title="Expand"><Icon name="maximize-2" size={14} /></button>
          <button className="ibtn" title="Close" onClick={onClose}><Icon name="x" size={14} /></button>
        </div>
      </div>

      <div className="gai-artifact-tabs">
        <button className={`gai-artifact-tab ${tab === 'preview' ? 'active' : ''}`} onClick={() => setTab('preview')}>
          <Icon name="eye" size={12} /> Preview
        </button>
        <button className={`gai-artifact-tab ${tab === 'code' ? 'active' : ''}`} onClick={() => setTab('code')}>
          <Icon name="code-2" size={12} /> Code
        </button>
        <button className={`gai-artifact-tab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>
          <Icon name="history" size={12} /> History
        </button>
      </div>

      <div className="gai-artifact-body">
        {tab === 'preview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ background: '#FAFAFA', backgroundImage: 'repeating-linear-gradient(45deg,transparent 0,transparent 12px,rgba(15,15,15,0.025) 12px,rgba(15,15,15,0.025) 13px)', borderRadius: 10, padding: 30, textAlign: 'center' }}>
              <div style={{ background: 'white', border: '1px solid var(--border-strong)', borderRadius: 10, padding: '20px 26px', boxShadow: '0 8px 24px rgba(15,15,15,0.06)', display: 'inline-block' }}>
                <div style={{ font: '600 18px/1.2 var(--font-sans)' }}>requireRole()</div>
                <div style={{ marginTop: 4, fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live preview</div>
              </div>
            </div>
            <div>
              <ML>Description</ML>
              <p style={{ marginTop: 6, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                A pure middleware factory. Returns a function that verifies the JWT, looks up the session,
                and ensures the user has the requested role. Throws <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg-surface-2)', padding: '1px 5px', borderRadius: 3 }}>Forbidden</code> otherwise.
              </p>
            </div>
            <div>
              <ML>Test coverage</ML>
              <TaskList items={[
                { state: 'done', label: 'Verifies valid token', time: '12ms' },
                { state: 'done', label: 'Rejects expired tokens', time: '8ms' },
                { state: 'done', label: 'Allows admin role', time: '4ms' },
                { state: 'running', label: 'Caches session lookup', time: '\u2026' },
              ]} />
            </div>
          </div>
        )}
        {tab === 'code' && (
          <CodeBlock file="src/api/requireRole.ts" lang="typescript">{CODE_HTML}</CodeBlock>
        )}
        {tab === 'history' && (
          <div className="elem">
            {[
              { ver: 'v3', when: '25m ago',  msg: 'Add role caching' },
              { ver: 'v2', when: '1h ago',   msg: 'Extract verifyJwt' },
              { ver: 'v1', when: '2h ago',   msg: 'Initial draft' },
            ].map(h => (
              <div key={h.ver} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
                <Pill kind="neutral">{h.ver}</Pill>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{h.msg}</div>
                  <ML style={{ marginTop: 2 }}>James Carter \u00b7 {h.when}</ML>
                </div>
                <button className="ibtn"><Icon name="more-horizontal" size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="gai-artifact-foot">
        <span>TYPESCRIPT</span>
        <span>v3 \u00b7 last edit 25m ago</span>
        <span className="status">READY</span>
      </div>
    </aside>
  );
}

/* ---------- Main app ---------- */
function App() {
  const [activeId, setActiveId] = useStateApp('t1');
  const [model, setModel]       = useStateApp('Claude 4.5 Sonnet');
  const [artifact, setArtifact] = useStateApp(true);
  const [draft, setDraft]       = useStateApp('');
  const [phase, setPhase]       = useStateApp('completed'); // 'empty' | 'planning' | 'completed'
  const [attachments, setAttachments] = useStateApp([
    { id: 'a1', icon: 'file-text', name: 'spec-v3.pdf' },
  ]);

  function handleSend(text) {
    setDraft('');
    setPhase('planning');
    setTimeout(() => setPhase('completed'), 2500);
  }
  function handleNew() {
    setPhase('empty');
    setActiveId('new');
    setDraft('');
  }
  function pickSuggestion(text) {
    setDraft(text);
  }

  return (
    <div className={`gai-app ${artifact ? 'artifact-open' : ''}`}>
      <Sidebar activeId={activeId} onSelect={setActiveId} onNew={handleNew} />

      <main className="gai-main">
        <Topbar
          model={model}
          onModel={setModel}
          onOpenArtifact={() => setArtifact(!artifact)}
          artifactOpen={artifact}
        />

        <div className="gai-thread-area">
          <div className="gai-thread-area-inner">

            {phase === 'empty' && (
              <EmptyState onPick={pickSuggestion} />
            )}

            {phase !== 'empty' && (
              <>
                <UserMessage>
                  Help me refactor the auth middleware in <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--bg-surface)', padding: '1px 5px', borderRadius: 3 }}>src/api/</code>. The current implementation has JWT decoding, session lookup, and role checks all in one giant function. Use the attached spec.
                </UserMessage>

                <BotMessage branchIdx={2} branchTotal={3}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Reasoning
                      running={phase === 'planning'}
                      seconds={12}
                      content={REASONING_STEPS}
                      defaultOpen={phase === 'planning'}
                    />
                    <Plan steps={PLAN_STEPS} />
                    <Tool calls={TOOL_CALLS} />

                    {phase === 'planning' ? (
                      <Loader />
                    ) : (
                      <>
                        <div style={{ font: '400 14px/1.6 var(--font-sans)' }}>
                          I refactored <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--bg-surface)', padding: '1px 5px', borderRadius: 3 }}>auth.ts</code> into three pure layers
                          <Cite n={1} />:
                          <ol style={{ margin: '8px 0', paddingLeft: 20 }}>
                            <li><b>Token verification</b> — split JWT decode from claims validation</li>
                            <li><b>Session lookup</b> — moved to a 60s LRU cache layer<Cite n={3} /></li>
                            <li><b>RBAC checks</b> — extracted into a <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--bg-surface)', padding: '1px 5px', borderRadius: 3 }}>requireRole()</code> helper</li>
                          </ol>
                          Open the artifact panel on the right to review the generated <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--bg-surface)', padding: '1px 5px', borderRadius: 3 }}>requireRole.ts</code> file. Tests pass against RFC 8725<Cite n={2} />.
                        </div>

                        <CodeBlock file="src/api/requireRole.ts" lang="typescript">{CODE_HTML}</CodeBlock>

                        <div>
                          <ML style={{ marginBottom: 8, display: 'block' }}>Sources</ML>
                          <Sources list={SOURCES} />
                        </div>

                        <div>
                          <ML style={{ marginBottom: 8, display: 'block' }}>Related</ML>
                          <WebPreview
                            host="vercel.com"
                            accent="#0F0F10"
                            letter="V"
                            title="Architectural patterns for auth middleware"
                            desc="Three layers \u2014 token verification, session lookup, role checks \u2014 make middleware testable and easy to refactor."
                          />
                        </div>

                        <div>
                          <ML style={{ marginBottom: 8, display: 'block' }}>Next steps</ML>
                          <SuggestionChips
                            items={['Run the full test suite', 'Write a PR description', 'Find every callsite', 'Translate to Go']}
                            onPick={pickSuggestion}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </BotMessage>
              </>
            )}

          </div>
        </div>

        <Composer
          draft={draft}
          setDraft={setDraft}
          attachments={attachments}
          setAttachments={setAttachments}
          onSend={handleSend}
        />
      </main>

      {artifact && <ArtifactPanel onClose={() => setArtifact(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
