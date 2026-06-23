import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Attraction } from '../data/tripData';
import { formatEur, formatHkd } from '../data/tripData';
import 'leaflet/dist/leaflet.css';

interface TravelMapProps {
  attractions: Attraction[];
  exchangeRate: number;
}

const BARCELONA_CENTER: [number, number] = [41.3874, 2.1686];

const markerIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    background: linear-gradient(135deg, #ff5a7a, #ff385c);
    width: 28px; height: 28px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export function TravelMap({ attractions, exchangeRate }: TravelMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  const selected = attractions.find((a) => a.id === selectedId);

  return (
    <section id="map" className="od-leaflet space-y-4 px-4 py-6">
      <p className="text-sm leading-relaxed text-[var(--od-ink-muted)]">
        地圖瓦片已快取，離線時可使用已瀏覽過的區域
      </p>

      <div className="od-surface-card overflow-hidden rounded-[16px] p-1">
        {mapReady && (
          <MapContainer
            center={BARCELONA_CENTER}
            zoom={13}
            className="h-72 w-full sm:h-96"
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
                    <p className="font-bold">{attr.name}</p>
                    <p className="text-xs text-gray-600">{attr.category}</p>
                    {attr.ticketPriceEur && (
                      <p className="mt-1 text-sm">
                        門票：{formatHkd(attr.ticketPriceEur, exchangeRate)}{' '}
                        <span className="text-gray-500">({formatEur(attr.ticketPriceEur)})</span>
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {attractions.map((attr) => (
          <button
            key={attr.id}
            type="button"
            onClick={() => setSelectedId(attr.id === selectedId ? null : attr.id)}
            className={`od-chip shrink-0 text-sm ${selectedId === attr.id ? 'od-chip-active' : ''}`}
          >
            {attr.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="od-surface-card rounded-[16px] p-4">
          <h3 className="text-lg font-bold">{selected.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--od-ink-muted)]">
            {selected.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {selected.openingHours && (
              <span className="rounded-full bg-[var(--od-cloud)] px-3 py-1 text-[var(--od-ink-muted)]">
                {selected.openingHours}
              </span>
            )}
            {selected.ticketPriceEur && (
              <span className="rounded-full bg-[var(--od-rausch-soft)] px-3 py-1 text-[var(--od-rausch)]">
                {formatHkd(selected.ticketPriceEur, exchangeRate)} ({formatEur(selected.ticketPriceEur)})
              </span>
            )}
          </div>
          {selected.tips && (
            <p className="mt-3 text-sm leading-relaxed text-[var(--od-ink-subtle)]">{selected.tips}</p>
          )}
        </div>
      )}
    </section>
  );
}
