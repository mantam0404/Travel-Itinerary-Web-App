/**
 * CARTO raster basemaps require ?key= since 2025–2026.
 * Set VITE_CARTO_BASEMAPS_API_KEY (free at https://carto.com/basemaps/apikey/).
 * Without a key we fall back to OpenStreetMap raster tiles (no API key).
 */

export type MapBasemapProvider = 'carto' | 'osm';

export interface MapBasemapConfig {
  provider: MapBasemapProvider;
  url: string;
  attribution: string;
  /** When true, apply CSS dim/invert on tile pane for dark UI without CARTO dark tiles */
  useDarkTileFilter: boolean;
  maxZoom: number;
}

const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function cartoKey(): string | undefined {
  const key = import.meta.env.VITE_CARTO_BASEMAPS_API_KEY?.trim();
  return key && key.length > 0 ? key : undefined;
}

function cartoRasterUrl(style: 'voyager' | 'dark_all', key: string): string {
  const base = `https://{s}.basemaps.cartocdn.com/rastertiles/${style}/{z}/{x}/{y}{r}.png`;
  return `${base}?key=${encodeURIComponent(key)}`;
}

export function getMapBasemapConfig(isDark: boolean): MapBasemapConfig {
  const key = cartoKey();

  if (key) {
    return {
      provider: 'carto',
      url: cartoRasterUrl(isDark ? 'dark_all' : 'voyager', key),
      attribution: CARTO_ATTRIBUTION,
      useDarkTileFilter: false,
      maxZoom: 20,
    };
  }

  return {
    provider: 'osm',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: OSM_ATTRIBUTION,
    useDarkTileFilter: isDark,
    maxZoom: 19,
  };
}

export function hasCartoBasemapKey(): boolean {
  return Boolean(cartoKey());
}
