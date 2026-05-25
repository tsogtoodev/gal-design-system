// Gal · primitive components
// Loaded as global window.Gal* — components shared across screen files.

const { useState, useEffect, useRef } = React;

/* ---------- Icon ---------- */
function Icon({ name, size = 16, color, style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const svg = document.createElement('i');
      svg.setAttribute('data-lucide', name);
      ref.current.appendChild(svg);
      window.lucide.createIcons({ icons: window.lucide.icons, attrs: { width: size, height: size, color: color || 'currentColor' } });
    }
  }, [name, size, color]);
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size, color: color || 'inherit', ...style }} {...rest} />;
}

/* ---------- Button ---------- */
function Button({ children, variant = 'outline', icon, iconRight, onClick, style, ...rest }) {
  const cls = `gal-btn gal-btn-${variant}`;
  return (
    <button className={cls} onClick={onClick} style={style} {...rest}>
      {icon && <Icon name={icon} size={14} />}
      {children}
      {iconRight && <Icon name={iconRight} size={14} />}
    </button>
  );
}

function IconButton({ icon, variant = 'ghost', size = 14, onClick, style, 'aria-label': ariaLabel }) {
  return (
    <button className={`gal-btn gal-btn-${variant} gal-btn-icon`} onClick={onClick} aria-label={ariaLabel} style={style}>
      <Icon name={icon} size={size} />
    </button>
  );
}

/* ---------- Pill ---------- */
function Pill({ children, kind = 'neutral', dot = false, style }) {
  return <span className={`gal-pill ${kind} ${dot ? 'dot' : ''}`} style={style}>{children}</span>;
}

/* ---------- MonoLabel ---------- */
function MonoLabel({ children, color, style }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: color || 'var(--fg-3)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ---------- Field ---------- */
function Field({ icon, placeholder, value, onChange, type = 'text', rightSlot, style }) {
  return (
    <div className="gal-field" style={style}>
      {icon && <Icon name={icon} size={16} />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      {rightSlot}
    </div>
  );
}

/* ---------- Toggle ---------- */
function Toggle({ on, onChange }) {
  return (
    <button
      className={`gal-toggle ${on ? 'on' : ''}`}
      onClick={() => onChange && onChange(!on)}
      role="switch"
      aria-checked={on}
    />
  );
}

/* ---------- Segmented ---------- */
function Segmented({ options, value, onChange }) {
  return (
    <div className="gal-seg">
      {options.map((opt) => (
        <button
          key={opt}
          className={value === opt ? 'active' : ''}
          onClick={() => onChange && onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ---------- Card ---------- */
function Card({ children, padded = true, style, ...rest }) {
  return (
    <div className={`gal-card ${padded ? 'gal-card-pad' : ''}`} style={style} {...rest}>
      {children}
    </div>
  );
}

/* ---------- Avatar ---------- */
// Five known seeds map to deterministic light tinted backgrounds.
const tints = [
  ['#FFD2D9', '#B4123F'],
  ['#FFE2C9', '#A04518'],
  ['#CDEBD3', '#1A6332'],
  ['#D6D9FF', '#1E2474'],
  ['#F4D4FF', '#5F1480'],
  ['#FFE9B3', '#6B4708'],
];
function hashSeed(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function Avatar({ name = '?', src, size = 32 }) {
  const initials = name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  const [bg, fg] = tints[hashSeed(name) % tints.length];
  return (
    <span
      className="gal-av"
      style={{
        width: size,
        height: size,
        background: src ? undefined : bg,
        color: fg,
        fontSize: Math.round(size * 0.36),
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!src && initials}
    </span>
  );
}

function AvatarStack({ names, size = 28, max = 3 }) {
  const shown = names.slice(0, max);
  const overflow = names.length - shown.length;
  return (
    <span className="gal-av-stack" style={{ display: 'inline-flex' }}>
      {shown.map((n, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -10, border: '2px solid var(--bg-surface)', borderRadius: '50%' }}>
          <Avatar name={n} size={size} />
        </span>
      ))}
      {overflow > 0 && (
        <span style={{ marginLeft: -10, border: '2px solid var(--bg-surface)', borderRadius: '50%' }}>
          <span
            className="gal-av"
            style={{
              width: size,
              height: size,
              background: 'var(--fg-1)',
              color: 'var(--bg-surface)',
              fontSize: Math.round(size * 0.34),
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            +{overflow}
          </span>
        </span>
      )}
    </span>
  );
}

/* ---------- Equalizer bars ---------- */
// Mostly uniform-height vertical bars, color-coded by category, with a single
// taller "playhead" bar marking the current position. Matches the Disarto
// reference more closely than a varying-height musical equalizer.
function Equalizer({ count = 80, palette = ['#D9D9DE', '#F5642B', '#2563EB', '#16A34A'], seed = 7, playheadAt, playheadColor = 'var(--fg-1)' }) {
  let s = seed;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const ph = playheadAt ?? Math.floor(count / 2);
  const bars = [];
  for (let i = 0; i < count; i++) {
    let color = palette[0];
    const r = rnd();
    if (r < 0.18) color = palette[1];
    else if (r < 0.25) color = palette[2];
    else if (r < 0.27) color = palette[3] || palette[0];
    bars.push({ color, h: 20, isPlayhead: false });
  }
  bars[ph] = { color: playheadColor, h: 28, isPlayhead: true };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 32, position: 'relative' }}>
      {bars.map((b, i) => (
        <div key={i} style={{ width: 3, height: b.h, background: b.color, borderRadius: 2 }} />
      ))}
      <div style={{ position: 'absolute', left: `calc(${(ph / count) * 100}% - 4px)`, top: 30, color: playheadColor, pointerEvents: 'none' }}>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M1 1 L1 11 L4 8 L6 13 L8 12 L6 7 L9 7 Z" fill="currentColor"/></svg>
      </div>
    </div>
  );
}

/* ---------- Sparkline (smooth line) ---------- */
function Sparkline({ points, color = 'var(--success)', width = 80, height = 28 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const d = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - ((v - min) / range) * (height - 4) - 2}`)
    .join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Section divider (dashed) ---------- */
function DashedDivider({ inset = 0, style }) {
  return <div style={{ borderTop: '1px dashed var(--border-dashed)', margin: `0 ${inset}px`, ...style }} />;
}

/* Make these globally available to subsequent script files. */
Object.assign(window, {
  Icon, Button, IconButton, Pill, MonoLabel, Field, Toggle, Segmented, Card,
  Avatar, AvatarStack, Equalizer, Sparkline, DashedDivider,
});
