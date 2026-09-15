import { useEffect, useRef } from 'react';
import { themeAccent, type Theme } from './themes';

type Node = { x: number; y: number; depth: number; phase: number; offsetX: number; offsetY: number; hub: boolean };

/** Decorative database topology: depth, drifting nodes, and replication pulses. */
export default function DatabaseNetwork({ enabled, theme }: { enabled: boolean; theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let width = 0, height = 0, frame = 0, last = 0;
    let nodes: Node[] = [];
    let pointer: { x: number; y: number } | null = null;
    const color = themeAccent(theme);
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const render = (delta = 0) => {
      const time = elapsed.current / 1000;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = color;
      context.fillStyle = color;
      const points = nodes.map(node => {
        const x = node.x * width + Math.sin(time * .16 + node.phase) * 22 * node.depth;
        const y = node.y * height + Math.cos(time * .12 + node.phase) * 18 * node.depth;
        const dx = pointer ? x - pointer.x : 0;
        const dy = pointer ? y - pointer.y : 0;
        const distance = Math.hypot(dx, dy);
        const proximity = pointer ? Math.max(0, 1 - distance / 190) : 0;
        const force = proximity * 32 * node.depth;
        const ease = 1 - Math.exp(-delta / 130);
        node.offsetX += ((dx / Math.max(1, distance)) * force - node.offsetX) * ease;
        node.offsetY += ((dy / Math.max(1, distance)) * force - node.offsetY) * ease;
        return { ...node, x: x + node.offsetX, y: y + node.offsetY, proximity };
      });

      const reach = Math.min(230, Math.max(150, width * .16));
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        // A sparse topology keeps the background readable and drawing costs bounded.
        let connections = 0;
        for (let j = i + 1; j < points.length && connections < 3; j++) {
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > reach) continue;
          connections++;
          const strength = 1 - distance / reach;
          const highlight = Math.max(a.proximity, b.proximity);
          context.globalAlpha = strength * (.18 + highlight * .3);
          context.lineWidth = .7 + highlight * .5;
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
          if ((i + j) % 3 !== 0) continue;
          const progress = (time * .14 + a.phase) % 1;
          context.globalAlpha = (.18 + highlight * .4) * strength;
          context.beginPath();
          context.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 1.8, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (const node of points) {
        const radius = node.hub ? 7 + node.depth * 4 : 1.2 + node.depth * 1.6;
        context.globalAlpha = .16 + node.depth * .12 + node.proximity * .35;
        context.lineWidth = 1;
        if (node.hub) {
          // Stacked elliptical disks make the larger nodes recognizably databases.
          for (const level of [-1, 0, 1]) {
            context.beginPath();
            context.ellipse(node.x, node.y + level * radius * .6, radius, radius * .35, 0, 0, Math.PI * 2);
            context.stroke();
          }
          for (const side of [-1, 1]) {
            context.beginPath(); context.moveTo(node.x + side * radius, node.y - radius * .6);
            context.lineTo(node.x + side * radius, node.y + radius * .6); context.stroke();
          }
        } else {
          context.beginPath(); context.arc(node.x, node.y, radius, 0, Math.PI * 2); context.fill();
        }
        if (node.proximity > .05) {
          context.globalAlpha = node.proximity * .12;
          context.beginPath(); context.arc(node.x, node.y, radius + 7, 0, Math.PI * 2); context.stroke();
        }
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(85, Math.max(24, Math.round(width * height / 17000)));
      // A stable layout avoids randomly rearranging the network on pause/theme changes.
      const columns = Math.max(4, Math.round(Math.sqrt(count * width / Math.max(height, 1))));
      const rows = Math.ceil(count / columns);
      nodes = Array.from({ length: count }, (_, index) => ({
        x: ((index % columns) + .5 + Math.sin(index * 17) * .3) / columns,
        y: (Math.floor(index / columns) + .5 + Math.cos(index * 13) * .3) / rows,
        depth: .45 + ((index * 7) % 11) / 20,
        phase: index * 2.399, offsetX: 0, offsetY: 0, hub: index % 9 === 0,
      }));
      render();
    };
    const tick = (now: number) => {
      if (!enabled || document.hidden) { frame = 0; return; }
      // 30fps is sufficient for gentle background motion, including on mobile.
      if (!last || now - last >= 32) {
        const delta = last ? Math.min(now - last, 64) : 0;
        elapsed.current += delta; last = now; render(delta);
      }
      frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== 'mouse' || !finePointer.matches) return;
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };
    const clearPointer = () => { pointer = null; };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) clearPointer(); };
    const visibility = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0; clearPointer();
      if (enabled && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas); resize(); visibility();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', clearPointer);
    document.addEventListener('visibilitychange', visibility);
    finePointer.addEventListener('change', clearPointer);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', clearPointer);
      document.removeEventListener('visibilitychange', visibility);
      finePointer.removeEventListener('change', clearPointer);
    };
  }, [enabled, theme]);

  return <canvas ref={canvasRef} className="database-network" aria-hidden="true"/>;
}
