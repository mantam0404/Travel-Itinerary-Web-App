import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function MapFlyTo({
  lat,
  lng,
  zoom = 15,
  flyToken,
}: {
  lat: number;
  lng: number;
  zoom?: number;
  flyToken: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.1 });
  }, [map, lat, lng, zoom, flyToken]);

  return null;
}

export function MapInvalidateOnTheme({ isDark }: { isDark: boolean }) {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 180);
    return () => window.clearTimeout(timer);
  }, [map, isDark]);

  return null;
}
