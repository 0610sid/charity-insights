import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import styles from "../stylesheets/Map.module.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "teiTnFtxd3HIKqyMTrl6";

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });

    const marker = new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current);

    // Create a popup
    const popup = new maptilersdk.Popup({ offset: 25 })
      .setHTML("<h3>Hello World!</h3>")
      .setMaxWidth("300px");

    // Attach the popup to the marker
    marker.setPopup(popup);
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className={styles.mapwrap}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}
