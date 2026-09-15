import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Database, ShieldCheck } from 'lucide-react';
import './mysql-startup.css';
import { resolveTheme } from './themes';

// A visual introduction, not a connection to a live database.
const bootMessages = [
  ['Server', 'Starting MySQL 8.0 · aakash_portfolio'],
  ['InnoDB', 'Initializing the InnoDB storage engine…'],
  ['InnoDB', 'Buffer pool initialized.'],
  ['InnoDB', 'Redo log recovery complete.'],
  ['Server', 'Loading database schemas…'],
  ['Schema', 'experience · projects · expertise · freelance'],
  ['Replica', 'Initializing Group Replication…'],
  ['Cluster', 'PRIMARY online. SECONDARY members synchronized.'],
  ['Router', 'Read / write routes configured.'],
  ['Recovery', 'Backup and recovery workspace ready.'],
  ['Session', 'Opening a read-only visitor session…'],
  ['Server', 'Ready for connections.'],
] as const;

function readSettings() {
  let theme = 'paper';
  let motion = true;
  try {
    theme = localStorage.getItem('portfolio-theme') || theme;
    motion = localStorage.getItem('portfolio-motion') !== 'off';
  } catch { /* Continue without saved preferences. */ }
  return { theme: resolveTheme(theme), motion: motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches };
}

export default function MySQLStartup({ onEnter }: { onEnter: () => void }) {
  const [settings] = useState(readSettings);
  const [phase, setPhase] = useState<'splash' | 'boot' | 'ready'>(settings.motion ? 'splash' : 'ready');
  const [lineCount, setLineCount] = useState(0);
  const enterButton = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === 'splash') {
      const timer = window.setTimeout(() => setPhase('boot'), 1400);
      return () => window.clearTimeout(timer);
    }
    if (phase !== 'boot') return;
    const timer = window.setTimeout(() => {
      if (lineCount < bootMessages.length) setLineCount(lineCount + 1);
      else setPhase('ready');
    }, lineCount === bootMessages.length ? 500 : 190);
    return () => window.clearTimeout(timer);
  }, [phase, lineCount]);

  useEffect(() => {
    if (phase === 'ready') enterButton.current?.focus({ preventScroll: true });
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [phase, lineCount]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || (event.key === 'Enter' && phase !== 'ready')) {
        event.preventDefault();
        onEnter();
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [onEnter, phase]);

  const progress = Math.round(lineCount / bootMessages.length * 100);
  return <main className="mysql-startup" data-boot-theme={settings.theme} data-boot-motion={settings.motion ? 'on' : 'off'} aria-label="MySQL portfolio introduction">
    <div className="mysql-grid" aria-hidden="true" />
    <header className="mysql-topbar">
      <span className="mysql-brand"><Database size={19} strokeWidth={1.5} /> AAKASH<span className="mysql-topbar-divider">/</span> MYSQL</span>
      <button className="mysql-skip" onClick={onEnter}>Skip intro <ArrowRight size={16} /></button>
    </header>
    <div className="mysql-stage">
      {phase === 'splash' && <section className="mysql-splash" aria-labelledby="mysql-splash-title">
        <div className="mysql-emblem" aria-hidden="true"><div className="mysql-cylinder"><i /><i /><i /><span /></div><div className="mysql-emblem-floor" /></div>
        <p className="mysql-kicker">EVERY CONNECTION STARTS HERE</p>
        <h1 id="mysql-splash-title">Aakash<span className="mysql-title-slash"> / </span><span>MySQL</span></h1>
        <p className="mysql-subtitle">Reliable data. Thoughtful engineering.</p>
        <div className="mysql-splash-loading" aria-hidden="true"><span /><span /><span /></div>
        <p className="mysql-key-hint">Press Enter to skip</p>
      </section>}
      {phase === 'boot' && <section className="mysql-terminal" aria-labelledby="mysql-terminal-title">
        <div className="mysql-terminal-bar"><span id="mysql-terminal-title"><span className="mysql-light" /> MySQL initialization</span><span>8.0 / InnoDB</span></div>
        <div className="mysql-command"><span>$</span> mysql --user=visitor --database=aakash_portfolio</div>
        <div className="mysql-log" ref={log} aria-hidden="true">
          {bootMessages.slice(0, lineCount).map(([source, message], index) => <div className="mysql-log-line" key={message}>
            <span className="mysql-line-number">{String(index + 1).padStart(2, '0')}</span><span className="mysql-log-source">[{source}]</span><span>{message}</span><span className="mysql-log-ok">OK</span>
          </div>)}
          <span className="mysql-cursor" />
        </div>
        <p className="sr-only" role="status">Preparing the portfolio. You can skip the introduction at any time.</p>
        <div className="mysql-progress-label"><span>{progress < 100 ? 'INITIALIZING WORKSPACE' : 'READY FOR CONNECTIONS'}</span><span>{progress}%</span></div>
        <div className="mysql-progress" role="progressbar" aria-label="Portfolio introduction progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
      </section>}
      {phase === 'ready' && <section className="mysql-ready" aria-labelledby="mysql-ready-title">
        <div className="mysql-ready-top"><span className="mysql-light" /> READY FOR CONNECTIONS <ShieldCheck size={18} /></div>
        <div className="mysql-ready-content">
          <div className="mysql-avatar" aria-hidden="true"><Database size={38} strokeWidth={1.25} /></div>
          <p className="mysql-kicker">WELCOME TO MY WORKSPACE</p>
          <h1 id="mysql-ready-title">Aakash Maurya<span>.</span></h1>
          <p className="mysql-role">Production MySQL DBA / Database Engineer</p>
          <dl className="mysql-session"><div><dt>user</dt><dd>visitor</dd></div><div><dt>database</dt><dd>aakash_portfolio</dd></div><div><dt>access</dt><dd>Explore freely</dd></div></dl>
          <button ref={enterButton} className="mysql-enter" onClick={onEnter}>Enter portfolio <ArrowRight size={20} /></button>
          <p className="mysql-ready-hint"><span>mysql&gt;</span> USE aakash_portfolio;<span className="mysql-cursor" aria-hidden="true" /></p>
        </div>
      </section>}
    </div>
    <footer className="mysql-footer"><span>DATABASES. DESIGNED TO LAST.</span><span>Portfolio startup sequence<span className="mysql-footer-version"> / MySQL 8.0</span></span></footer>
  </main>;
}
