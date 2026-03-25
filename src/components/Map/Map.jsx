import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map({ coordinates }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
  
    if (!mapRef.current) {
      
      const defaultCenter = [55.751244, 37.618423];
      mapRef.current = L.map('map').setView(defaultCenter, 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !coordinates) return;

    const [lat, lon] = coordinates;

    if (markerRef.current) {
      markerRef.current.remove();
    }

    markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
    
    mapRef.current.setView([lat, lon], 14);
  }, [coordinates]);

  return <div id="map" className={styles.map}></div>;
}

export default Map;