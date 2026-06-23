import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Attraction } from '../data/tripData';
import { formatEur, formatHkd } from '../data/tripData';
import { ScrollReveal } from './ScrollReveal';
import 'leaflet/dist/leaflet.css';

interface TravelMapProps {
  attractions: Attraction[];
  exchangeRate: number;
  isDark: boolean;
}

const BARCELONA_CENTER: [number, number] = [41.3874, 2.1686];

function createMarkerIcon(accent: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: linear-gradient(135deg, ${accent}, #4f5cc6);
      width: 28px; height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export function TravelMap({ attractions, exchangeRate, isDark }: TravelMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const markerIcon = createMarkerIcon(isDark ? '#5e6ad2' : '#4f5cc6');

  useEffect(() => {
    setMapReady(true);
  }, []);

  const selected = attractions.find((a) => a.id === selectedId);

  return (
    <section id="map" className="ln-leaflet space-y-4 px-4 py-6">
      <ScrollReveal>
        <p className="text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
          地圖瓦片已快取，離線時可使用已瀏覽過的區域
        </p>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="ln-panel overflow-hidden p-1">
          {mapReady && (
            <MapContainer
              center={BARCELONA_CENTER}
              zoom={13}
              className="h-72 w-full rounded-[10px] sm:h-96"
              scrollWheelZoom={false}
            >
              <MapResizer />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {attractions.map((attr) => (
                <Marker
                  key={attr.id}
                  position={[attr.lat, attr.lng]}
                  icon={markerIcon}
                  eventHandlers={{ click: () => setSelectedId(attr.id) }}
                >
                  <Popup>
                    <div className="min-w-[180px] p-1">
                      <p className="font-semibold">{attr.name}</p>
                      <p className="text-xs text-[var(--ln-ink-secondary)]">{attr.category}</p>
                      {attr.ticketPriceEur && (
                        <p className="mt-1 text-sm">
                          門票：{formatHkd(attr.ticketPriceEur, exchangeRate)}{' '}
                          <span className="text-[var(--ln-ink-tertiary)]">
                            ({formatEur(attr.ticketPriceEur)})
                          </span>
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {attractions.map((attr) => (
            <button
              key={attr.id}
              type="button"
              onClick={() => setSelectedId(attr.id === selectedId ? null : attr.id)}
              className={`ln-chip ln-pressable shrink-0 ${selectedId === attr.id ? 'ln-chip-active' : ''}`}
            >
              {attr.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {selected && (
        <ScrollReveal delay={40}>
          <div className="ln-panel p-4">
            <h3 className="text-lg font-semibold tracking-[-0.02em]">{selected.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
              {selected.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {selected.openingHours && (
                <span className="ln-badge-neutral ln-badge">{selected.openingHours}</span>
              )}
              {selected.ticketPriceEur && (
                <span className="ln-badge">
                  {formatHkd(selected.ticketPriceEur, exchangeRate)} ({formatEur(selected.ticketPriceEur)})
                </span>
              )}
            </div>
            {selected.tips && (
              <p className="mt-3 text-sm leading-relaxed text-[var(--ln-ink-tertiary)]">{selected.tips}</p>
            )}
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
