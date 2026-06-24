import { Circle, CircleMarker } from 'react-leaflet';

interface MapUserLocationProps {
  position: { lat: number; lng: number; accuracy: number };
}

export function MapUserLocation({ position }: MapUserLocationProps) {
  return (
    <>
      <Circle
        center={[position.lat, position.lng]}
        radius={Math.min(position.accuracy, 120)}
        pathOptions={{
          color: '#428bff',
          fillColor: '#428bff',
          fillOpacity: 0.12,
          weight: 1,
          opacity: 0.45,
        }}
      />
      <CircleMarker
        center={[position.lat, position.lng]}
        radius={7}
        pathOptions={{
          color: '#ffffff',
          fillColor: '#428bff',
          fillOpacity: 1,
          weight: 2.5,
        }}
      />
    </>
  );
}
