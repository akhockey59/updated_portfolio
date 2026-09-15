import { useLayoutEffect, useState } from 'react';
import Portfolio from '@/components/portfolio/Portfolio';
import MySQLStartup from '@/components/portfolio/MySQLStartup';

export default function Index() {
  const [entered, setEntered] = useState(false);
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);
  useLayoutEffect(() => {
    if (!entered) return;
    // A fresh entrance always starts at the hero, even after a contact/footer visit.
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, [entered]);
  return entered ? <Portfolio /> : <MySQLStartup onEnter={() => setEntered(true)} />;
}
