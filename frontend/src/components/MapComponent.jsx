import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from "../stylesheets/Analytics.module.css";

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 5);

    L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=wEJCZUFZg4U245HjyeSs', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      maxZoom: 18,
    }).addTo(map);

    // standard marker
    L.marker([51.5, -0.09], {
      draggable: true,
      title: "dummy marker",
      color: 'red',
    }).addTo(map).bindPopup("I am a popup.");

    // circle marker
    L.circle([51.508, -0.11], {
      color: 'black',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
      stroke: true,
      opacity: 1
    }).addTo(map).bindPopup("I am a circle.");

    // custom marker
    const iconOptions = {
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    };
    const customIcon = L.icon(iconOptions);
    const markerOptions = {
      title: "custom marker",
      clickable: true,
      draggable: true,
      icon: customIcon,
    };
    L.marker([45, -0.09], markerOptions).addTo(map).bindPopup("I am a custom marker.");

    // Cleanup function to remove the map when the component unmounts
    return () => {
      map.remove();
    };

  }, []); // Empty dependency array ensures useEffect runs once on component mount

  return (
    <div id="map" className={styles.map}></div>
  );
};

export default MapComponent;
