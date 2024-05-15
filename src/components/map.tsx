// Importing necessary hooks and components from react and leaflet
import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
// Importing custom hook to manage map functionality
import useMap from '../hooks/useMap';
// Importing default and current marker URLs from constants
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../const';
// Importing Offer and City types
import { Offer, City } from '../types/offer';
// Importing custom app selector hook
import { useAppSelector } from '../hooks';

// Defining type for the props passed to the Map component
type MapProps = {
  city: City; // City data
  points: Offer[]; // Array of offer points
};

// Creating custom icons for default and current markers
const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT, // URL for default marker icon
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point of the icon
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT, // URL for current marker icon
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point of the icon
});

function CitiesMap({ city, points }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const selectedPoint: null | { title: string } = useAppSelector(
    (state) => state.selectedPoint
  );
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const { location } = point;
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });
        marker
          .setIcon(
            selectedPoint !== null && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default CitiesMap;
