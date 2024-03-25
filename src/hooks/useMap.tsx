import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer';

// Custom hook to create and manage Leaflet map
function useMap(
  mapRef: MutableRefObject<HTMLElement | null>, // Reference to the DOM element where the map will be rendered
  city: City // Information about the city to be displayed on the map
): Map | null {
  // Return type is either a Map instance or null
  // State to hold the map instance
  const [map, setMap] = useState<Map | null>(null);

  // Ref to track whether the component has been rendered
  const isRenderedRef = useRef<boolean>(false);

  // Effect to initialize the map when mapRef or city changes
  useEffect(() => {
    // Check if the mapRef is available and the component hasn't been rendered yet
    if (mapRef.current !== null && !isRenderedRef.current) {
      // Create a new Map instance with Leaflet
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude, // Latitude of the city
          lng: city.location.longitude, // Longitude of the city
        },
        zoom: 10, // Initial zoom level of the map
      });

      // Create a TileLayer for the base map
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      // Add the TileLayer to the map instance
      instance.addLayer(layer);

      // Set the map instance to the state
      setMap(instance);

      // Mark the component as rendered
      isRenderedRef.current = true;
    }
  }, [mapRef, city]); // Dependencies for the useEffect hook

  // Return the map instance
  return map;
}

export default useMap;
