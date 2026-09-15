import { useEffect, useRef, useState } from 'react';
import { LocateFixed, MapPin } from 'lucide-react';
import { useVisitorLocation, type VisitorLocation } from './useVisitorLocation';
import { themeAccent, type Theme } from './themes';

const PI2 = Math.PI * 2;
const radians = (degrees: number) => degrees * Math.PI / 180;

export default function Earth({motion, theme}: {motion: boolean; theme: Theme}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef<{motion: boolean; theme: Theme; location?: VisitorLocation}>({motion, theme});
  const controls = useRef<{redraw: () => void; center: () => void}>();
  const [textureState, setTextureState] = useState<'loading' | 'ready' | 'error'>('loading');
  const visitor = useVisitorLocation();

  useEffect(() => {
    settings.current = {motion, theme, location: visitor.location};
    controls.current?.redraw();
  }, [motion, theme, visitor.location]);
  useEffect(() => {controls.current?.center();}, [visitor.location]);

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
      const location = settings.current.location;
      if (location) {
        const lat = radians(location.latitude), lon = radians(location.longitude);
        const x = Math.cos(lat) * Math.sin(lon), y = Math.sin(lat), z = Math.cos(lat) * Math.cos(lon);
        const rx = x * cy + z * sy, rz = -x * sy + z * cy;
        const ry = y * cp - rz * sp, depth = y * sp + rz * cp;
        if (depth > .05) {
          const px = centerX + rx * r, py = centerY - ry * r;
          ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(px, py, 11, 0, PI2); ctx.stroke();
          ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(px, py, 4, 0, PI2); ctx.fill();
          ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px, py - 11); ctx.lineTo(px, py - 29); ctx.stroke();
          ctx.font = '600 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#000000'; ctx.shadowBlur = 5; ctx.fillText('YOU', px, py - 35); ctx.shadowBlur = 0;
        }
      }
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
    const center = () => {
      const location = settings.current.location;
      if (location) {yaw = -radians(location.longitude); pitch = radians(location.latitude);}
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
    <p className="globe-instructions">Drag in any direction · Two-finger scroll on trackpad</p>
    <div className="earth-stage">
    <canvas ref={canvasRef} className="earth-canvas" role="img" aria-label="Interactive dotted 3D Earth with white continents and a visitor marker matching the selected theme. Drag with a mouse or finger in any direction, or scroll with two fingers on a trackpad to rotate. Use the location button to center your visitor marker."/>
    {textureState !== 'ready' && <div className="earth-loading" role="status">{textureState === 'loading' ? 'Bringing the world into view…' : 'Earth preview unavailable.'}</div>}
    </div>
    <div className="visitor-location">
      <MapPin size={16}/>
      <div role="status"><strong>{visitor.status === 'loading' ? 'Finding your region…' : visitor.location ? visitor.location.label : 'Your location is unavailable'}</strong><span>{visitor.location?.source === 'browser' ? 'Location shared by your browser · not stored' : visitor.location ? 'Approximate IP location · may reflect a VPN' : 'The globe works without sharing your location.'}</span></div>
      {visitor.location ? <button className="icon-button" onClick={() => controls.current?.center()} aria-label="Center globe on my location"><LocateFixed size={16}/></button> : visitor.status === 'unavailable' && <button className="location-opt-in" onClick={visitor.useBrowserLocation}>Locate me</button>}
    </div>
  </div>;
}
