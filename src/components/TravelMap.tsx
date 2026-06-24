import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Attraction } from '../data/tripData';
import { formatEur, formatHkd } from '../data/tripData';
import { ScrollReveal } from './ScrollReveal';
import { MapFlyTo, MapInvalidateOnTheme } from './map/MapHelpers';
import { getAttractionImage, MAP_TILES } from '../utils/itineraryImages';
import 'leaflet/dist/leaflet.css';

import type { MapFocusRequest } from '../types/navigation';

interface TravelMapProps {
  attractions: Attraction[];
  exchangeRate: number;
  isDark: boolean;
  focusRequest?: MapFocusRequest | null;
}

const BARCELONA_CENTER: [number, number] = [41.3874, 2.1686];

function createImageMarkerIcon(imageUrl: string, isDark: boolean, isSelected: boolean) {
  const ring = isSelected ? (isDark ? '#5e6ad2' : '#4f5cc6') : isDark ? '#2a2d36' : '#ffffff';
  const size = isSelected ? 52 : 44;

  return L.divIcon({
    className: 'ln-map-marker',
    html: `<div class="ln-map-marker-pin" style="
      width:${size}px;height:${size}px;
      border:2.5px solid ${ring};
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 14px rgba(0,0,0,${isDark ? '0.45' : '0.22'});
      transform:translateY(-4px);
      background:#111;
    "><img src="${imageUrl}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" /></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
  });
}

export function TravelMap({
  attractions,
  exchangeRate,
  isDark,
  focusRequest,
}: TravelMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [flyToken, setFlyToken] = useState(0);

  const tiles = isDark ? MAP_TILES.dark : MAP_TILES.light;
  const focusAttraction = attractions.find((a) => a.id === focusRequest?.attractionId);
  const flyTarget = focusAttraction ?? attractions.find((a) => a.id === selectedId);

  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!focusRequest?.attractionId) return;
    setSelectedId(focusRequest.attractionId);
    setFlyToken(focusRequest.token);
  }, [focusRequest]);

  const selectAttraction = (attractionId: string | null) => {
    setSelectedId(attractionId);
    if (attractionId) {
      setFlyToken(Date.now());
    }
  };

  const markerIcons = useMemo(() => {
    const icons: Record<string, L.DivIcon> = {};
    for (const attr of attractions) {
      const image = getAttractionImage(attr.id, isDark);
      icons[attr.id] = createImageMarkerIcon(image, isDark, selectedId === attr.id);
    }
    return icons;
  }, [attractions, isDark, selectedId]);

  const selected = attractions.find((a) => a.id === selectedId);
  const selectedImage = selected ? getAttractionImage(selected.id, isDark) : null;

  return (
    <section id="map" className="ln-leaflet space-y-4 px-4 py-6">
      <ScrollReveal>
        <p className="text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
          地圖隨深／淺色模式切換樣式 · 點擊標記查看景點照片
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
              <MapInvalidateOnTheme isDark={isDark} />
              <TileLayer
                key={isDark ? 'dark-tiles' : 'light-tiles'}
                attribution={tiles.attribution}
                url={tiles.url}
              />
              {flyTarget && flyToken > 0 && (
                <MapFlyTo
                  lat={flyTarget.lat}
                  lng={flyTarget.lng}
                  zoom={15}
                  flyToken={flyToken}
                />
              )}
              {attractions.map((attr) => (
                <Marker
                  key={attr.id}
                  position={[attr.lat, attr.lng]}
                  icon={markerIcons[attr.id]}
                  eventHandlers={{ click: () => selectAttraction(attr.id) }}
                >
                  <Popup className="ln-map-popup">
                    <div className="min-w-[200px] overflow-hidden rounded-lg">
                      <img
                        src={getAttractionImage(attr.id, isDark)}
                        alt={attr.name}
                        className="h-24 w-full object-cover"
                      />
                      <div className="p-2">
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
              onClick={() => selectAttraction(attr.id === selectedId ? null : attr.id)}
              className={`ln-chip ln-pressable shrink-0 ${selectedId === attr.id ? 'ln-chip-active' : ''}`}
            >
              {attr.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {selected && selectedImage && (
        <ScrollReveal delay={40}>
          <div className="ln-panel overflow-hidden">
            <img
              src={selectedImage}
              alt={selected.name}
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
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
                    {formatHkd(selected.ticketPriceEur, exchangeRate)} (
                    {formatEur(selected.ticketPriceEur)})
                  </span>
                )}
              </div>
              {selected.tips && (
                <p className="mt-3 text-sm leading-relaxed text-[var(--ln-ink-tertiary)]">
                  {selected.tips}
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
