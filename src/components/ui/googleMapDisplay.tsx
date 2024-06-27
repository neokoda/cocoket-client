import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MyGoogleMapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  containerStyle: {
    width: string;
    height: string;
    borderRadius?: string;
  };
}

export default function GoogleMapDisplay({ onLocationSelect, containerStyle }: MyGoogleMapProps) {
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const position = { lat, lng };
      setSelectedPosition(position);
      onLocationSelect(position);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        () => {
          console.error("Error fetching the geolocation");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || { lat: -3.745, lng: -38.523 }}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleClick}
      >
        {selectedPosition && (
          <Marker position={selectedPosition} />
        )}
        {currentPosition && !selectedPosition && (
          <Marker position={currentPosition} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}
