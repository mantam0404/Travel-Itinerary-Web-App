import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Attraction } from '../data/tripData';
import { formatEur, formatHkd } from '../data/tripData';
import { ScrollReveal } from './ScrollReveal';
import { MapFlyTo, MapInvalidateOnTheme } from './map/MapHelpers';
import { MapUserLocation } from './map/MapUserLocation';
import { getAttractionImage, MAP_TILES } from '../utils/itineraryImages';
import type { MapFocusRequest } from '../types/navigation';
import 'leaflet/dist/leaflet.css';

interface TravelMapProps {
  attractions: Attraction[];
  exchangeRate: number;
  isDark: boolean;
  focusRequest?: MapFocusRequest | null;
}

const BARCELONA_CENTER: [number, number] = [41.3874, 2.1686];

interface FlyCoords {
  lat: number;
  lng: number;
  token: number;
}

interface UserPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

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
  const [flyCoords, setFlyCoords] = useState<FlyCoords | null>(null);
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
  const [locateStatus, setLocateStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [locateMessage, setLocateMessage] = useState<string | null>(null);

  const tiles = isDark ? MAP_TILES.dark : MAP_TILES.light;
  const attractionById = useMemo(
    () => new Map(attractions.map((attr) => [attr.id, attr])),
    [attractions],
  );

  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!focusRequest?.attractionId) return;
    const attraction = attractionById.get(focusRequest.attractionId);
    if (!attraction) return;

    setSelectedId(focusRequest.attractionId);
    setFlyCoords({
      lat: attraction.lat,
      lng: attraction.lng,
      token: focusRequest.token,
    });
  }, [focusRequest, attractionById]);

  const flyToAttraction = useCallback(
    (attractionId: string) => {
      const attraction = attractionById.get(attractionId);
      if (!attraction) return;

      setSelectedId(attractionId);
      setFlyCoords({
        lat: attraction.lat,
        lng: attraction.lng,
        token: Date.now(),
      });
    },
    [attractionById],
  );

  const selectAttraction = (attractionId: string | null) => {
    if (!attractionId) {
      setSelectedId(null);
      return;
    }
    flyToAttraction(attractionId);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocateStatus('error');
      setLocateMessage('此瀏覽器不支援定位功能');
      return;
    }

    setLocateStatus('loading');
    setLocateMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next: UserPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setUserPosition(next);
        setFlyCoords({ lat: next.lat, lng: next.lng, token: Date.now() });
        setLocateStatus('idle');
        setLocateMessage('已顯示你的目前位置');
      },
      (err) => {
        setLocateStatus('error');
        if (err.code === err.PERMISSION_DENIED) {
          setLocateMessage('定位權限被拒絕，請在瀏覽器設定中允許位置存取');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setLocateMessage('無法取得位置，請確認 GPS 或網路定位已開啟');
        } else {
          setLocateMessage('定位逾時，請稍後再試');
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  };

  const markerIcons = useMemo(() => {
    const icons: Record<string, L.DivIcon> = {};
    for (const attr of attractions) {
      const image = getAttractionImage(attr.id, isDark);
      icons[attr.id] = createImageMarkerIcon(image, isDark, selectedId === attr.id);
    }
    return icons;
  }, [attractions, isDark, selectedId]);

  const selected = selectedId ? attractionById.get(selectedId) : undefined;
  const selectedImage = selected ? getAttractionImage(selected.id, isDark) : null;

  return (
    <section id="map" className="ln-leaflet space-y-4 px-4 py-6">
      <ScrollReveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
            地圖隨深／淺色模式切換 · 點擊標記查看景點
          </p>
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={locateStatus === 'loading'}
            className="ln-chip ln-pressable shrink-0 disabled:opacity-60"
            aria-label="顯示我的位置"
          >
            {locateStatus === 'loading' ? '定位中…' : '📍 我的位置'}
          </button>
        </div>
        {locateMessage && (
          <p
            className={`mt-2 text-xs ${locateStatus === 'error' ? 'text-[#c13515]' : 'text-[var(--ln-ink-tertiary)]'}`}
          >
            {locateMessage}
          </p>
        )}
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
              {flyCoords && (
                <MapFlyTo
                  lat={flyCoords.lat}
                  lng={flyCoords.lng}
                  zoom={15}
                  flyToken={flyCoords.token}
                />
              )}
              {userPosition && <MapUserLocation position={userPosition} />}
              {attractions.map((attr) => (
                <Marker
                  key={attr.id}
                  position={[attr.lat, attr.lng]}
                  icon={markerIcons[attr.id]}
                  riseOnHover
                  zIndexOffset={selectedId === attr.id ? 1000 : 0}
                  eventHandlers={{
                    click: () => flyToAttraction(attr.id),
                  }}
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
