import { useEffect, useState } from 'react';

export type VisitorLocation = {latitude: number; longitude: number; label: string; source: 'ip' | 'browser'};
type LocationState = {status: 'loading' | 'ready' | 'unavailable'; location?: VisitorLocation};

export function useVisitorLocation() {
  const [state, setState] = useState<LocationState>({status: 'loading'});
  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    const timeout = window.setTimeout(() => controller.abort(), 6500);
    async function locate() {
      try {
        // Coarse IP lookup only. No precise browser location is requested automatically.
        const response = await fetch('https://ipwho.is/', {signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer'});
        if (!response.ok) throw new Error('Location unavailable');
        const data = await response.json();
        const {latitude, longitude} = data;
        if (data.success !== true || typeof latitude !== 'number' || typeof longitude !== 'number' || !Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) throw new Error('Invalid location');
        const label = [data.city, data.country].filter(value => typeof value === 'string' && value.length < 100).join(', ') || 'Your approximate region';
        if (mounted) setState({status: 'ready', location: {latitude, longitude, label, source: 'ip'}});
      } catch {if (mounted) setState({status: 'unavailable'});}
      finally {clearTimeout(timeout);}
    }
    void locate();
    return () => {mounted = false; clearTimeout(timeout); controller.abort();};
  }, []);
  function useBrowserLocation() {
    if (!navigator.geolocation) {setState({status: 'unavailable'}); return;}
    setState({status: 'loading'});
    navigator.geolocation.getCurrentPosition(
      ({coords}) => setState({status: 'ready', location: {latitude: coords.latitude, longitude: coords.longitude, label: 'Your browser location', source: 'browser'}}),
      () => setState({status: 'unavailable'}),
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 300000},
    );
  }
  return {...state, useBrowserLocation};
}
