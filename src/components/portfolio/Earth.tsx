import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Users } from 'lucide-react';
import { useVisitorMap, type VisitorRegion } from './useVisitorMap';
import { themeAccent, type Theme } from './themes';

const PI2 = Math.PI * 2;
const radians = (degrees: number) => degrees * Math.PI / 180;

export default function Earth({motion, theme}: {motion: boolean; theme: Theme}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef<{motion: boolean; theme: Theme; regions: VisitorRegion[]}>({motion, theme, regions: []});
  const controls = useRef<{redraw: () => void; center: (region?: VisitorRegion) => void}>();
  const [textureState, setTextureState] = useState<'loading' | 'ready' | 'error'>('loading');
  const visitors = useVisitorMap();

  useEffect(() => {
    settings.current = {motion, theme, regions: visitors.data?.regions ?? []};
    controls.current?.redraw();
  }, [motion, theme, visitors.data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {setTextureState('error'); return;}
    // Evenly spaced latitude rings sampled against a land mask.
    // Only the front hemisphere is drawn, so dots follow a solid 3D surface.
    let landPoints: {x: number; y: number; z: number}[] | undefined;
    let width = 1, height = 1, yaw = radians(-78), pitch = radians(20);
    let frame = 0, visible = true, last = 0, disposed = false, wheelActive = false;
    let wheelTimer: ReturnType<typeof setTimeout> | undefined;
    let drag: {id: number; x: number; y: number} | undefined;
    const draw = () => {
      if (disposed || !landPoints) return;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      ctx.clearRect(0, 0, width, height);
      const r = Math.min(width * .42, height * .41);
      const centerX = width / 2, centerY = height / 2;
      const accent = themeAccent(settings.current.theme);
      canvas.dataset.accent = accent;
      const glow = ctx.createRadialGradient(centerX, centerY, r * .94, centerX, centerY, r * 1.10);
      glow.addColorStop(0, `${accent}00`); glow.addColorStop(.43, `${accent}44`); glow.addColorStop(1, `${accent}00`);
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(centerX, centerY, r * 1.10, 0, PI2); ctx.fill();
      const sphere = ctx.createRadialGradient(centerX - r * .35, centerY - r * .4, r * .1, centerX, centerY, r);
      sphere.addColorStop(0, '#17191c'); sphere.addColorStop(.7, '#0b0d0e'); sphere.addColorStop(1, '#060708');
      ctx.fillStyle = sphere; ctx.beginPath(); ctx.arc(centerX, centerY, r, 0, PI2); ctx.fill();
      ctx.strokeStyle = `${accent}80`; ctx.lineWidth = 1; ctx.stroke();
      for (const point of landPoints) {
        const rx = point.x * cy + point.z * sy, rz = -point.x * sy + point.z * cy;
        const ry = point.y * cp - rz * sp, depth = point.y * sp + rz * cp;
        if (depth <= .02) continue;
        const opacity = .32 + .65 * Math.pow(depth, .6);
        ctx.fillStyle = `rgba(231,244,236,${opacity})`;
        ctx.beginPath(); ctx.arc(centerX + rx * r, centerY - ry * r, Math.max(.55, r * .0052) * (.58 + depth * .42), 0, PI2); ctx.fill();
      }
      canvas.dataset.landPoints = String(landPoints.length);
      let visibleMarkers = 0;
      for (const region of settings.current.regions) {
        const lat = radians(region.latitude), lon = radians(region.longitude);
        const x = Math.cos(lat) * Math.sin(lon), y = Math.sin(lat), z = Math.cos(lat) * Math.cos(lon);
        const rx = x * cy + z * sy, rz = -x * sy + z * cy;
        const ry = y * cp - rz * sp, depth = y * sp + rz * cp;
        if (depth > .05) {
          visibleMarkers++;
          const px = centerX + rx * r, py = centerY - ry * r;
          const size = Math.min(16, 6 + Math.log2(region.visitors + 1) * 1.4);
          ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
          ctx.fillStyle = '#101510'; ctx.beginPath(); ctx.arc(px, py, size, 0, PI2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = accent;
          if (region.visitors > 1) {
            ctx.font = '600 10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(region.visitors > 999 ? '1k+' : String(region.visitors), px, py);
          } else { ctx.beginPath(); ctx.arc(px, py, 3, 0, PI2); ctx.fill(); }
        }
      }
      canvas.dataset.visitorRegions = String(settings.current.regions.length);
      canvas.dataset.visibleMarkers = String(visibleMarkers);
      canvas.dataset.longitude = String(yaw);
      canvas.dataset.latitude = String(pitch);
    };
    const tick = (time: number) => {
      if (disposed || drag || wheelActive || !visible || document.hidden || !settings.current.motion) {frame = 0; return;}
      if (time - last > 40) {yaw += Math.min(time - last, 80) * .00022; last = time; draw();}
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; draw();
      if (!disposed && !drag && !wheelActive && visible && !document.hidden && settings.current.motion) {last = performance.now(); frame = requestAnimationFrame(tick);}
    };
    const center = (region?: VisitorRegion) => {
      yaw = region ? -radians(region.longitude) : radians(-78);
      pitch = region ? radians(region.latitude) : radians(20);
      draw();
    };
    controls.current = {redraw: sync, center};
    const rotate = (dx: number, dy: number) => {
      const sensitivity = Math.PI / Math.max(200, Math.min(width, height));
      yaw = (yaw + dx * sensitivity) % PI2;
      pitch = (pitch + dy * sensitivity) % PI2;
      draw();
    };
    const startDrag = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      drag = {id: event.pointerId, x: event.clientX, y: event.clientY};
      canvas.setPointerCapture(event.pointerId);
      canvas.dataset.dragging = 'true';
      sync();
    };
    const moveDrag = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      rotate(event.clientX - drag.x, event.clientY - drag.y);
      drag.x = event.clientX; drag.y = event.clientY;
    };
    const endDrag = () => {
      const pointerId = drag?.id;
      drag = undefined;
      delete canvas.dataset.dragging;
      if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
      sync();
    };
    const wheel = (event: WheelEvent) => {
      // Keep browser pinch-to-zoom available; two-finger scrolling rotates the globe.
      if (event.ctrlKey) return;
      event.preventDefault();
      if (drag) return;
      wheelActive = true;
      clearTimeout(wheelTimer);
      sync();
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1;
      rotate(-Math.max(-100, Math.min(100, event.deltaX * scale)) * .5, -Math.max(-100, Math.min(100, event.deltaY * scale)) * .5);
      wheelTimer = setTimeout(() => {wheelActive = false; sync();}, 250);
    };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio; canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw();
    });
    const observer = new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; sync();});
    resize.observe(canvas); observer.observe(canvas);
    canvas.addEventListener('pointerdown', startDrag); canvas.addEventListener('pointermove', moveDrag);
    canvas.addEventListener('pointerup', endDrag); canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('lostpointercapture', endDrag); canvas.addEventListener('wheel', wheel, {passive: false});
    window.addEventListener('blur', endDrag);
    document.addEventListener('visibilitychange', sync);
    const image = new Image();
    image.onload = () => {
      if (disposed) return;
      try {
        const textureCanvas = document.createElement('canvas'); textureCanvas.width = 2048; textureCanvas.height = 1024;
        const textureContext = textureCanvas.getContext('2d');
        if (!textureContext) throw new Error('Land mask unavailable');
        textureContext.drawImage(image, 0, 0, 2048, 1024);
        const mask = textureContext.getImageData(0, 0, 2048, 1024).data;
        landPoints = [];
        for (let lat = -88.5; lat < 89; lat += 1.45) {
          const latitude = radians(lat), ringCount = Math.max(8, Math.round(360 * Math.cos(latitude) / 1.45));
          for (let i = 0; i < ringCount; i++) {
            const longitude = -Math.PI + (i + .5) / ringCount * PI2;
            const u = Math.min(2047, Math.floor((longitude / PI2 + .5) * 2048));
            const v = Math.min(1023, Math.floor((.5 - latitude / Math.PI) * 1024));
            if (mask[(v * 2048 + u) * 4] < 1) continue;
            landPoints.push({x: Math.cos(latitude) * Math.sin(longitude), y: Math.sin(latitude), z: Math.cos(latitude) * Math.cos(longitude)});
          }
        }
        setTextureState('ready'); center(); sync();
      } catch {setTextureState('error');}
    };
    image.onerror = () => {if (!disposed) setTextureState('error');};
    image.src = '/textures/earth-topology.png';
    return () => {
      disposed = true; cancelAnimationFrame(frame); clearTimeout(wheelTimer); resize.disconnect(); observer.disconnect(); controls.current = undefined;
      canvas.removeEventListener('pointerdown', startDrag); canvas.removeEventListener('pointermove', moveDrag);
      canvas.removeEventListener('pointerup', endDrag); canvas.removeEventListener('pointercancel', endDrag);
      canvas.removeEventListener('lostpointercapture', endDrag); canvas.removeEventListener('wheel', wheel);
      window.removeEventListener('blur', endDrag); document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <div className="earth-scene">
    <div className="earth-stage">
    <canvas ref={canvasRef} className="earth-canvas" role="img" aria-label="Interactive 3D Earth showing shared visitor locations. Markers group visitors by approximate region. Drag in any direction or use two-finger trackpad scrolling to rotate."/>
    {textureState !== 'ready' && <div className="earth-loading" role="status">{textureState === 'loading' ? 'Bringing the world into view…' : 'Earth preview unavailable.'}</div>}
    </div>
    <div className="visitor-map-summary">
      <div className="visitor-location">
        <Users size={18}/>
        <div role="status"><strong>{visitors.data ? `${visitors.data.totalVisitors.toLocaleString()} ${visitors.data.totalVisitors === 1 ? 'visitor' : 'visitors'} worldwide` : visitors.status === 'loading' ? 'Loading the visitor map…' : 'Visitor map unavailable'}</strong>
          <span>{visitors.data ? `${visitors.data.regions.length} ${visitors.data.regions.length === 1 ? 'region' : 'regions'} · ${visitors.stale ? 'Last available count' : 'All-time visitors'}` : 'A shared view of everyone who stops by.'}</span>
        </div>
        <button className="icon-button" onClick={() => controls.current?.center()} aria-label="Reset globe view"><RotateCcw size={16}/></button>
      </div>
      {visitors.data && <>
        {visitors.data.regions.length > 0 ? <details className="visitor-regions"><summary>Explore visitor locations</summary><ul>{[...visitors.data.regions].sort((a, b) => b.visitors - a.visitors).map(region => <li key={region.id}><button onClick={() => controls.current?.center(region)}><span>{region.label}</span><strong>{region.visitors.toLocaleString()}</strong></button></li>)}</ul></details> : <p className="visitor-map-note">{visitors.data.totalVisitors ? 'Location data is not available for these visits yet.' : 'The journey starts with the first visitor.'}</p>}
      </>}
    </div>
  </div>;
}
