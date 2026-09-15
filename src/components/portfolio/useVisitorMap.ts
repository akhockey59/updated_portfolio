import { useEffect, useState } from 'react';

export type VisitorRegion = { id: string; label: string; latitude: number; longitude: number; visitors: number };
export type VisitorMap = { totalVisitors: number; locatedVisitors: number; regions: VisitorRegion[] };
type VisitorMapState = { status: 'loading' | 'ready' | 'unavailable'; data?: VisitorMap; stale?: boolean };

function parseMap(value: unknown): VisitorMap {
  if (!value || typeof value !== 'object') throw new Error('Invalid visitor map');
  const data = value as VisitorMap;
  if (!Number.isSafeInteger(data.totalVisitors) || data.totalVisitors < 0 || !Number.isSafeInteger(data.locatedVisitors) || data.locatedVisitors < 0 || data.locatedVisitors > data.totalVisitors || !Array.isArray(data.regions) || data.regions.length > 1000) throw new Error('Invalid visitor totals');
  const ids = new Set<string>();
  let mapped = 0;
  for (const region of data.regions) {
    if (!region || typeof region.id !== 'string' || ids.has(region.id) || typeof region.label !== 'string' || !region.label.trim() || region.label.length > 160 || !Number.isFinite(region.latitude) || Math.abs(region.latitude) > 90 || !Number.isFinite(region.longitude) || Math.abs(region.longitude) > 180 || !Number.isSafeInteger(region.visitors) || region.visitors < 1) throw new Error('Invalid visitor region');
    ids.add(region.id);
    mapped += region.visitors;
  }
  if (mapped !== data.locatedVisitors) throw new Error('Invalid mapped total');
  return data;
}

export function useVisitorMap() {
  const [state, setState] = useState<VisitorMapState>({ status: 'loading' });
  useEffect(() => {
    let active = true;
    let pending = false;
    let registered = false;
    let location: {latitude: number; longitude: number; country: string; countryCode: string} | null = null;
    let located = false;
    let controller: AbortController | undefined;
    async function refresh() {
      if (pending || document.hidden) return;
      pending = true;
      controller = new AbortController();
      const timer = window.setTimeout(() => controller?.abort(), 8000);
      try {
        if (!located) {
          located = true;
          try {
            const geoResponse = await fetch('https://ipwho.is/', {signal: AbortSignal.timeout(3500), credentials: 'omit', referrerPolicy: 'no-referrer'});
            const geo = await geoResponse.json();
            if (geoResponse.ok && geo.success === true && Number.isFinite(geo.latitude) && Math.abs(geo.latitude) <= 90 && Number.isFinite(geo.longitude) && Math.abs(geo.longitude) <= 180 && typeof geo.country === 'string' && typeof geo.country_code === 'string' && /^[A-Z]{2}$/.test(geo.country_code)) {
              location = {latitude: Math.round(geo.latitude / 5) * 5, longitude: Math.round(geo.longitude / 5) * 5, country: geo.country, countryCode: geo.country_code};
            }
          } catch { /* Count the visit even when approximate location is unavailable. */ }
        }
        if (!active) return;
        // Same-origin service: it deduplicates visitors and exposes only regional totals.
        // Never substitute local browser counts or invented locations for shared data.
        const response = await fetch('/api/visitors', {
          method: registered ? 'GET' : 'POST', credentials: 'same-origin', cache: 'no-store',
          headers: { Accept: 'application/json', ...(!registered ? { 'Content-Type': 'application/json' } : {}) },
          ...(!registered ? { body: JSON.stringify({location}) } : {}), signal: controller.signal,
        });
        if (!response.ok) throw new Error('Visitor map unavailable');
        const data = parseMap(await response.json());
        registered = true;
        if (active) setState({ status: 'ready', data });
      } catch {
        if (active) setState(previous => previous.data ? { ...previous, stale: true } : { status: 'unavailable' });
      } finally { clearTimeout(timer); pending = false; }
    }
    void refresh();
    const interval = window.setInterval(() => void refresh(), 60000);
    const resume = () => { if (!document.hidden) void refresh(); };
    document.addEventListener('visibilitychange', resume);
    return () => { active = false; controller?.abort(); clearInterval(interval); document.removeEventListener('visibilitychange', resume); };
  }, []);
  return state;
}
