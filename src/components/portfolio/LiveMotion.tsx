import { useEffect } from 'react';
import DatabaseNetwork from './DatabaseNetwork';
import type { Theme } from './themes';
import './live-motion.css';

/** Pointer updates stay outside React and run at most once per animation frame. */
export default function LiveMotion({ enabled, theme }: { enabled: boolean; theme: Theme }) {
  useEffect(() => {
    if (!enabled) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let active: HTMLElement | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const reset = () => {
      if (active) {
        active.removeAttribute('data-hovered');
        for (const name of ['--depth-x', '--depth-y', '--light-x', '--light-y']) active.style.removeProperty(name);
      }
      active = null;
    };
    const update = () => {
      frame = 0;
      if (!active) return;
      const bounds = active.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (pointerX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (pointerY - bounds.top) / bounds.height));
      active.style.setProperty('--depth-x', `${(0.5 - y) * 7}deg`);
      active.style.setProperty('--depth-y', `${(x - 0.5) * 9}deg`);
      active.style.setProperty('--light-x', `${x * 100}%`);
      active.style.setProperty('--light-y', `${y * 100}%`);
      active.dataset.hovered = 'true';
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== 'mouse') return;
      const surface = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-depth]') : null;
      const next = surface?.matches('details[open]') ? null : surface;
      if (next !== active) { reset(); active = next; }
      pointerX = event.clientX; pointerY = event.clientY;
      if (active && !frame) frame = requestAnimationFrame(update);
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
    const toggle = () => { if (active?.matches('details[open]')) reset(); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave);
    document.addEventListener('toggle', toggle, true);
    window.addEventListener('blur', reset);
    window.addEventListener('scroll', reset, { passive: true });
    finePointer.addEventListener('change', reset);

    // Stop ongoing diagram effects when their section is outside the viewport.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.toggleAttribute('data-motion-visible', entry.isIntersecting));
    }, { threshold: 0.05 });
    document.querySelectorAll('.production-scale, .case-studies-section, .freelance-section, .hero').forEach(section => observer.observe(section));
    return () => {
      cancelAnimationFrame(frame); reset(); observer.disconnect();
      document.querySelectorAll('[data-motion-visible]').forEach(element => element.removeAttribute('data-motion-visible'));
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('toggle', toggle, true);
      window.removeEventListener('blur', reset);
      window.removeEventListener('scroll', reset);
      finePointer.removeEventListener('change', reset);
    };
  }, [enabled]);

  return <div className="live-atmosphere" aria-hidden="true">
    <DatabaseNetwork enabled={enabled} theme={theme}/>
  </div>;
}
