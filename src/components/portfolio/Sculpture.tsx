import { useEffect, useRef } from 'react';

type Vec = [number, number, number];
type Face = {points: Vec[]; normal: Vec; accent: boolean};
const faces: Face[] = [];
const segments = 64;
// An abstract three-node database sculpture, independent of any project topology.
for (const [cx, cy, cz] of [[-1.45, .45, .6], [1.45, .45, .6], [0, -.35, -1.65]]) {
  for (let layer = 0; layer < 3; layer++) {
    const y = cy + layer * .51 - .75, radius = .87, height = .41;
    const top: Vec[] = [], bottom: Vec[] = [];
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      top.push([cx + radius * Math.cos(angle), y, cz + radius * Math.sin(angle)]);
      bottom.push([cx + radius * Math.cos(angle), y + height, cz + radius * Math.sin(angle)]);
    }
    faces.push({points: top, normal: [0, -1, 0], accent: false});
    faces.push({points: bottom, normal: [0, 1, 0], accent: false});
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments, angle = (i + .5) / segments * Math.PI * 2;
      faces.push({points: [top[i], top[next], bottom[next], bottom[i]], normal: [Math.cos(angle), 0, Math.sin(angle)], accent: layer === 1});
    }
  }
}

export default function Sculpture({motion, theme}: {motion: boolean; theme: string}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0, angle = .3, last = 0, width = 0, height = 0, visible = true;
    let pointerX = 0, pointerY = 0, x = 0, y = 0;
    const rotate = (v: Vec): Vec => {
      const a = -.42 + y, b = angle + x;
      const py = v[1]*Math.cos(a)-v[2]*Math.sin(a), pz = v[1]*Math.sin(a)+v[2]*Math.cos(a);
      return [v[0]*Math.cos(b)+pz*Math.sin(b), py, -v[0]*Math.sin(b)+pz*Math.cos(b)];
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) / 6.8;
      const projected = faces.map(face => {
        const points = face.points.map(point => {
          const p = rotate(point), perspective = 12 / (12 - p[2]);
          return {x: width / 2 + p[0] * scale * perspective, y: height / 2 + p[1] * scale * perspective, z: p[2]};
        });
        return {...face, points, normal: rotate(face.normal), depth: points.reduce((sum, p) => sum + p.z, 0) / points.length};
      }).sort((a, b) => a.depth - b.depth);
      for (const {points, normal: n, accent} of projected) {
        const light = Math.max(0, n[0] * -.45 + n[1] * -.65 + n[2] * .6);
        const shine = Math.pow(Math.max(0, n[0] * -.2 + n[1] * -.3 + n[2] * .92), 14);
        const luminance = 25 + light * 45 + shine * 20;
        const hue = theme === 'forest' ? 95 : theme === 'midnight' ? 220 : 38;
        ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
        ctx.fillStyle = `hsl(${hue} ${accent ? 20 : 5}% ${luminance}%)`;
        ctx.fill(); ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = .6; ctx.stroke();
      }
    };
    const tick = (time: number) => {
      if (time-last > 32) {
        angle += Math.min(time-last, 64)*.00013; last=time;
        x += (pointerX-x)*.055; y += (pointerY-y)*.055; draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (motion && visible && !document.hidden) {last=performance.now(); frame=requestAnimationFrame(tick);} else draw();
    };
    const resize = new ResizeObserver(([entry]) => {
      width=entry.contentRect.width; height=entry.contentRect.height;
      const dpr=Math.min(window.devicePixelRatio || 1, 2);
      canvas.width=width*dpr; canvas.height=height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); draw();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => {visible=entry.isIntersecting; sync();}); observer.observe(canvas);
    const move = (e: PointerEvent) => {if (!motion || e.pointerType==='touch') return; const r=canvas.getBoundingClientRect(); pointerX=(e.clientX-r.left)/r.width-.5; pointerY=((e.clientY-r.top)/r.height-.5)*.6;};
    const leave = () => {pointerX=0;pointerY=0;};
    canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',sync); sync();
    return () => {cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',sync);};
  }, [motion, theme]);
  return <canvas ref={ref} className="sculpture-canvas" aria-label="An abstract rotating sculpture of three database nodes" role="img" />;
}
