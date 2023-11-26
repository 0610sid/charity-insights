// Map.jsx

import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import styles from "../stylesheets/Map.module.css";

export default function Map({ markers, apiKey }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const zoom = 14;

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    maptilersdk.config.apiKey = apiKey;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });

    markers.forEach((markerInfo) => {
      const { lng, lat, content } = markerInfo;

      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .addTo(map.current);

      // Create a popup
      const popup = new maptilersdk.Popup({ offset: 25 })
        .setHTML(`<h3>${content}</h3>`)
        .setMaxWidth("300px");

      // Attach the popup to the marker
      marker.setPopup(popup);
    });
  }, [markers, apiKey, tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className={styles.mapwrap}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}
