import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../types/offer';
import useMap from '../hooks/useMap';
import { URL_MARKER_DEFAULT } from '../const';

// Define the props for the CitiesMap component
type MapProps = {
  city: City; // Information about the city
  points: Offer[]; // Array of points to be displayed on the map
};

// Define the default custom icon for the markers
const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Component to display a map with markers for given points
function CitiesMap({ city, points }: MapProps): JSX.Element {
  // Reference to the DOM element where the map will be rendered
  const mapRef = useRef(null);

  // Get the map instance using the custom hook
  const map = useMap(mapRef, city);

  // Effect to update the markers when map or points change
  useEffect(() => {
    // Check if the map instance is available
    if (map) {
      // Create a layer group for the markers and add it to the map
      const markerLayer = layerGroup().addTo(map);

      // Iterate over the points array and create markers for each point
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        // Set the default custom icon for the marker
        marker.setIcon(defaultCustomIcon).addTo(markerLayer);
      });

      // Clean up function to remove the marker layer when component unmounts
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]); // Dependencies for the useEffect hook

  // Render the div element that will contain the map
  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default CitiesMap;
