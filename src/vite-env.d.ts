/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /** Free CARTO basemaps key — https://carto.com/basemaps/apikey/ */
  readonly VITE_CARTO_BASEMAPS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
