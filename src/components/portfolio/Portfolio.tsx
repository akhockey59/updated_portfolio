import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowUp, Check, Github, Linkedin, Menu, X, Pause, Play, Database, Copy, MapPin } from 'lucide-react';
import Earth from './Earth';
import Freelance from './Freelance';
import ResumePreview from './ResumePreview';
import ContactForm from './ContactForm';
import ThemePicker from './ThemePicker';
import { resolveTheme, type Theme } from './themes';
import { experience, operations, projects, skillGroups } from './data';

const links = [['Work', 'projects'], ['About', 'about'], ['Expertise', 'expertise'], ['Experience', 'journey'], ['Freelance', 'freelance']] as const;
const readPreference = (key: string) => {try {return localStorage.getItem(key);} catch {return null;}};
const savePreference = (key: string, value: string) => {try {localStorage.setItem(key, value);} catch {/* The UI also works when storage is unavailable. */}};

function Tilt({children, className = ''}: {children: ReactNode; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || document.documentElement.dataset.motion === 'off') return;
    const rect = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--tilt-x', `${-((event.clientY-rect.top)/rect.height-.5)*7}deg`);
    ref.current?.style.setProperty('--tilt-y', `${((event.clientX-rect.left)/rect.width-.5)*7}deg`);
  }
  function reset() {ref.current?.style.setProperty('--tilt-x','0deg');ref.current?.style.setProperty('--tilt-y','0deg');}
  return <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}

function SectionLabel({number, children}: {number: string; children: ReactNode}) {
  return <p className="eyebrow section-label"><span>{number} /</span> {children}</p>;
}

export default function Portfolio() {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(readPreference('portfolio-theme')));
  const [motionPreference, setMotionPreference] = useState(() => readPreference('portfolio-motion') !== 'off');
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All work');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [active, setActive] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout>>();
  const motion = motionPreference && !reducedMotion;

  useEffect(() => {
    const root=document.documentElement;
    root.dataset.theme=theme;root.classList.toggle('dark',theme!=='paper');savePreference('portfolio-theme',theme);
  }, [theme]);
  useEffect(() => {document.documentElement.dataset.motion=motion?'on':'off';savePreference('portfolio-motion',motionPreference?'on':'off');}, [motion, motionPreference]);
  useEffect(() => {
    const query=window.matchMedia('(prefers-reduced-motion: reduce)');
    const change=() => setReducedMotion(query.matches);query.addEventListener('change',change);
    return () => query.removeEventListener('change',change);
  }, []);
  useEffect(() => {
    const reveal=new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
    const navigation=new IntersectionObserver(entries => entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id);}),{rootMargin:'-15% 0px -55% 0px'});
    document.querySelectorAll('main > section[id]').forEach(el=>navigation.observe(el));
    return () => {reveal.disconnect();navigation.disconnect();clearTimeout(copyTimeout.current);};
  }, []);
  useEffect(() => {
    const keydown=(event: KeyboardEvent)=>{if(event.key==='Escape' && menuOpen){setMenuOpen(false);menuButton.current?.focus();}};
    document.addEventListener('keydown',keydown);return()=>document.removeEventListener('keydown',keydown);
  }, [menuOpen]);
  async function copyEmail() {
    try {await navigator.clipboard.writeText('akhockey59@gmail.com');setCopied(true);setCopyError(false);clearTimeout(copyTimeout.current);copyTimeout.current=setTimeout(()=>setCopied(false),2500);} catch {setCopyError(true);}
  }

  return <div className="portfolio">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Aakash, home">aakash<span className="wordmark-dot">.</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{links.map(([label,id])=><a href={`#${id}`} key={id} aria-current={active===id?'location':undefined}>{label}</a>)}</nav>
      <div className="header-actions">
        <ThemePicker theme={theme} onChange={setTheme}/>
        <a className="header-contact" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
        <button ref={menuButton} className="menu-button icon-button" aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
      </div>
      {menuOpen&&<nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...links,['Contact','contact']].map(([label,id])=><a href={`#${id}`} key={id} onClick={()=>setMenuOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}
    </header>

    <main id="main" tabIndex={-1}>
      <section className="hero shell" id="home">
        <div className="hero-topline"><p className="eyebrow"><span className="status-dot"/> DATABASE ENGINEER / MYSQL DBA</p><span className="eyebrow hero-location">BASED IN INDIA ↗</span></div>
        <div className="hero-main">
          <div className="hero-copy">
            <div className="hero-intro">Hey, I'm Aakash </div>
            <h1>Keeping<br/>data<br/><span className="serif-word">reliable.</span></h1>
            <p className="hero-description">I design databases, keep production MySQL running, and turn slow queries into better-performing systems. Hands-on across four countries, from schema design to recovery.</p>
            <div className="hero-buttons"><a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={20}/></a><ResumePreview/></div>
          </div>
          <div className="hero-art globe-art">
            <div className="art-coordinates eyebrow">ONE PLANET. CONNECTED BY DATA.</div>
            <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
            <Earth theme={theme} motion={motion}/>
            
            <span className="art-axis axis-one">+</span><span className="art-axis axis-two">+</span>
            <div className="art-caption"><span className="eyebrow">{motion?'YOUR PART OF THE WORLD.':'EXPLORE AT YOUR OWN PACE.'}</span><button className="motion-button" disabled={reducedMotion} onClick={()=>setMotionPreference(!motionPreference)} aria-label={reducedMotion?'Motion disabled by system preference':motion?'Pause animations':'Enable animations'} aria-pressed={motion}>{motion?<Pause size={12}/>:<Play size={12}/>}<span>{reducedMotion?'Reduced motion':motion?'Motion on':'Motion off'}</span></button></div>
          </div>
        </div>
        <div className="hero-bottom"><p>PRODUCTION MINDSET.<br/><span>MEASURE. VALIDATE. IMPROVE.</span></p><div className="hero-social"><a href="https://github.com/akhockey59" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/aakash-maurya-90847a252" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a></div><a className="scroll-cue" href="#projects">SCROLL TO DISCOVER <ArrowDown size={17}/></a></div>
      </section>

      <div className="discipline-strip" aria-label="Focus areas"><div><span>MYSQL ADMINISTRATION</span><span className="discipline-separator" aria-hidden="true">/</span><span>DATABASE DESIGN</span><span className="discipline-separator" aria-hidden="true">/</span><span>PERFORMANCE TUNING</span><span className="discipline-separator" aria-hidden="true">/</span><span>HIGH AVAILABILITY & DR</span><span className="discipline-separator" aria-hidden="true">/</span></div></div>

      <section className="work-section shell section-space" id="projects">
        <div className="section-heading reveal">
          <div><SectionLabel number="01">DATABASES I'VE DESIGNED</SectionLabel><h2>Built from<br/><span className="serif-word">the schema up.</span></h2></div>
          <p>Database ownership, system design, and slow-query optimization.<br/>Selected work across four projects.</p>
        </div>
        <div className="work-toolbar">
          <div className="filters" role="group" aria-label="Filter projects">
            {['All work', 'PostgreSQL', 'Database design'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item}{filter === item && <span>{String(projects.filter(project => item === 'All work' || project.category === item).length).padStart(2, '0')}</span>}
            </button>)}
          </div>
          <span className="eyebrow work-count" aria-live="polite">{projects.filter(project => filter === 'All work' || project.category === filter).length} PROJECTS</span>
        </div>
        <div className="project-grid">
          {projects.filter(project => filter === 'All work' || project.category === filter).map(project => <article className={`project project-${project.style}`} key={project.id}>
            <Tilt className={`project-visual ${project.image ? "project-image" : "database-visual"} ${project.imageLayout === 'brand' ? 'project-brand-image' : ''}`}>
              {project.image ? <>
                <img src={project.image} alt={project.imageAlt || project.name} loading="lazy" width={1200} height={675}/>
                {project.imageLayout === 'brand' && <div className="project-brand-copy"><span>DATABASE ENGINEERING</span><strong>{project.name}</strong><p>Design. Cluster.<br/>Optimize.</p><span>MySQL / InnoDB</span></div>}
              </> : <>
              <div className="project-visual-top"><span>{project.name}</span><span>/{project.id}</span></div>
              <div className="database-art" aria-hidden="true">
                <div className="database-art-grid"/>
                <div className="database-stack"><span/><span/><span/><Database size={35} strokeWidth={1}/></div>
                <div className="database-scope">{project.diagram.map(label => <span key={label}>{label}</span>)}</div>
              </div>
              <div className="project-visual-bottom"><span><strong>{project.metric}</strong><small>{project.metricLabel}</small></span><span className="project-scope-label">DESIGN<br/>OWNERSHIP</span></div>
              </>}
            </Tilt>
            {project.imageSource && <a className="project-image-source" href={project.imageSource} target="_blank" rel="noreferrer">{project.imageCaption} <ArrowUpRight size={12}/></a>}
            <div className="project-info">
              <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <h3>{project.title}</h3><p>{project.description}</p>
              <details className="project-scope-details"><summary>My contribution <ArrowDown size={14}/></summary><ul>{project.scope.map(item => <li key={item}>{item}</li>)}</ul></details>
              {project.demo && <div className="project-links"><a href={project.demo} target="_blank" rel="noreferrer">Visit deplexo.com <ArrowUpRight size={14}/></a></div>}
            </div>
          </article>)}
        </div>
        <a className="all-projects" href="#contact"><span>Planning a database or untangling a slow workload?</span><span>Let's talk <ArrowUpRight size={19}/></span></a>
      </section>

      <section className="about-section section-space" id="about"><div className="shell">
        <div className="about-grid">
          <div className="about-left reveal">
            <SectionLabel number="02">THE PERSON BEHIND THE DATABASES</SectionLabel><h2>Calm under load.<br/><span className="serif-word">Careful by design.</span></h2>
            <Tilt className="about-note"><span className="note-pin"/><span className="eyebrow">MY PRODUCTION CHECKLIST</span><p>Measure first.<br/>Change carefully.<br/><span>Validate after.</span></p><div className="note-bottom"><span>Reliability is a daily practice.</span></div></Tilt>
          </div>
          <div className="about-copy reveal">
            <p className="large-copy">A database has to do more than store data. It has to keep the business moving.</p>
            <p>I'm Aakash, a Database Engineer and MySQL DBA at Keyanna Technology. I manage production environments across India, Kenya, Tanzania, and Uganda, supporting billing, Radius, CDR, audit, workflow, and customer-management systems.</p>
            <p>My work spans MySQL 8.x administration, clustered infrastructure, backup and recovery, performance analysis, migrations, and data lifecycle management. I've designed complete application databases, built InnoDB clusters, and handled MySQL migrations across Deplexo, Savanna Fibre, Savbill, and Savmoney. My Deplexo work also includes PostgreSQL system design and DC / DR.</p>
            <p>I approach production issues through measurement, root-cause analysis, controlled changes, and validation. That means checking dependencies, preparing a method of procedure, coordinating approvals, and making the findings clear to application teams and management.</p>
            <div className="about-signoff"><span className="signature">Aakash.</span><span><MapPin size={14}/> Ahmedabad, India</span></div>
            <div className="about-stats"><div><strong>24<span>+</span></strong><span>Production databases</span></div><div><strong>04</strong><span>Countries supported</span></div><div><strong>100M<span>+</span></strong><span>Records in large tables</span></div></div>
          </div>
        </div>
        <div className="production-footprint reveal">
          <div><span className="eyebrow">PRODUCTION FOOTPRINT</span><p>India · Kenya · Tanzania · Uganda</p></div>
          <p>Multi-node clusters · Hundreds of tables · Individual tables over 35 GB · Database / environment scopes over 100 GB</p>
        </div>
        <div className="toolkit reveal">
          <div className="toolkit-intro"><SectionLabel number="↳">MY DBA TOOLKIT</SectionLabel><p>From a slow query<br/>to a recovery plan.</p></div>
          <div className="toolkit-groups">{skillGroups.map(group => <div className="toolkit-group" key={group.title}><Database size={20}/><h3>{group.title}</h3><p>{group.items}</p></div>)}</div>
        </div>
        <div className="cloud-exposure"><span className="eyebrow">LEARNING & LAB EXPOSURE</span><p>AWS RDS · Amazon Aurora · GCP Cloud SQL — conceptual and laboratory exposure.<br/>Oracle — hands-on database labs and SQL certification.</p></div>
        <div className="certifications"><span className="eyebrow">CERTIFICATIONS</span><span>Oracle · Database Programming with SQL · 2023</span><span>Cisco · NDG Linux Essentials · 2024</span><span>AWS Academy · Data Engineering · 2024</span></div>
      </div></section>

      <section className="research-section shell section-space" id="expertise">
        <div className="section-heading reveal"><div><SectionLabel number="03">PRODUCTION DBA PRACTICE</SectionLabel><h2>From diagnosis<br/><span className="serif-word">to recovery.</span></h2></div><p>The day-to-day work behind reliable databases.<br/>Explore the tools, methods, and operational scope.</p></div>
        <div className="paper-list">{operations.map((operation, i) => <details className="paper reveal" key={operation.title}>
          <summary><span className="paper-number">0{i + 1}</span><div><span className="eyebrow paper-venue">{operation.tools}</span><h3>{operation.title}</h3><span className="operation-summary">{operation.summary}</span></div><span className="paper-toggle"><ArrowUpRight size={24}/></span></summary>
          <div className="paper-details"><p>{operation.detail}</p><ul className="operation-practices">{operation.practices.map(practice => <li key={practice}>{practice}</li>)}</ul></div>
        </details>)}</div>
      </section>

      <section className="journey-section shell section-space" id="journey">
        <div className="journey-grid">
          <div className="journey-heading reveal"><SectionLabel number="04">PRODUCTION EXPERIENCE</SectionLabel><h2>Responsibility<br/>at <span className="serif-word">scale.</span></h2><p>Business-critical data. Multiple environments.<br/>Accountability from investigation to resolution.</p><ResumePreview label="View my résumé"/></div>
          <div className="timeline">
            {experience.map((job, i) => <article className="experience reveal" key={job.company}><div className="timeline-dot">{i === 0 && <span/>}</div><span className="eyebrow">{job.date}</span><h3>{job.role}</h3><div className="job-company">{job.company}<span>{job.location}</span></div><p>{job.description}</p><ul className="experience-highlights">{job.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></article>)}
            <article className="education reveal"><span className="eyebrow">EDUCATION</span><h3>B.Tech · Computer Science & Engineering</h3><p>Marwadi University, Rajkot</p><span>January 2026 <span className="education-divider">/</span> CGPA 8.88 / 10</span></article>
          </div>
        </div>
      </section>

      <Freelance/>

      <section className="contact-section section-space" id="contact"><div className="shell"><div className="contact-heading reveal"><SectionLabel number="06">LET’S TALK DATABASES</SectionLabel><h2>Something<br/>on your <span className="serif-word">mind?</span><ArrowUpRight className="contact-big-arrow" strokeWidth={1}/></h2><div className="contact-lede"><p>Database engineering opportunities, schema design, slow-query challenges, or a recovery plan. Let’s talk about the data your business depends on.</p><span className="availability"><span className="status-dot"/> Database engineering opportunities</span></div></div><div className="contact-grid"><div className="contact-details"><span className="eyebrow">DROP ME A LINE</span><div className="email-row"><a href="mailto:akhockey59@gmail.com">akhockey59@gmail.com</a><button onClick={copyEmail} className="icon-button" aria-label="Copy email address">{copied?<Check size={17}/>:<Copy size={17}/>}</button></div><span className="copy-status" role="status">{copied?'Copied to clipboard.':copyError?'Please use the email link to get in touch.':'Usually back to you in 24–48 hours.'}</span><div className="contact-social"><a href="https://github.com/akhockey59" target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={15}/></a><a href="https://www.linkedin.com/in/aakash-maurya-90847a252" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={15}/></a><a href="https://x.com/Aksky47" target="_blank" rel="noreferrer"><span className="x-social">𝕏</span> Twitter / X <ArrowUpRight size={15}/></a></div><a className="contact-phone" href="tel:+918825358871">+91 8825358871 <ArrowUpRight size={14}/></a></div><ContactForm/></div></div></section>
    </main>
    <footer className="site-footer shell"><a className="wordmark" href="#home">aakash<span className="wordmark-dot">.</span></a><span>© {new Date().getFullYear()} Aakash Maurya · Built with intention.</span><a className="back-top" href="#home">BACK TO TOP <ArrowUp size={16}/></a></footer>
  </div>;
}
