import React, { useState, useEffect, useRef } from "react";
import styles from "../stylesheets/Analytics.module.css";
import Map from "./Map";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";
import { jwtDecode } from "jwt-decode";

import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const Analytics = () => {
  const [markerData, setmakerData] = useState([]);
  var decoded = jwtDecode(localStorage.getItem("Token"));

  const mapContainer = useRef(null);
  const map = useRef(null);
  const mumbai = { lng: 72.8, lat: 19.1 };
  const zoom = 10;

  const [totald, settotald] = useState([]);
  const [todtotal, settodtotal] = useState([]);

  const [options3, setOptions3] = useState({
    data: [
      { asset: "Employed", amount: 60000 },
      { asset: "Unemployed", amount: 40000 },
      { asset: "Self-Employed", amount: 7000 },
      { asset: "Student", amount: 5000 },
      { asset: "Retired", amount: 3000 },
    ],
    title: {
      text: "Occupation Composition",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "asset",
      },
    ],
  });

  const [options2, setOptions2] = useState({
    title: {
      text: "Donations by Gender Category",
    },
    subtitle: {
      text: "In Rupees",
    },
    data: [
      {
        quarter: "Gender",
        male: 140,
        female: 16,
        others: 14,
      },
    ],
    series: [
      {
        type: "bar",
        xKey: "quarter",
        yKey: "male",
        yName: "Male",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "female",
        yName: "Female",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "others",
        yName: "Others",
      },
    ],
  });

  const [options, setOptions] = useState({
    title: {
      text: "Age demographics",
    },
    data: [
      {
        age: 25,
      },
      {
        age: 25,
      },
      {
        age: 18,
      },
      {
        age: 23,
      },
      {
        age: 27,
      },
      {
        age: 26,
      },
      {
        age: 21,
      },
      {
        age: 25,
      },
      {
        age: 23,
      },
      {
        age: 32,
      },
      {
        age: 19,
      },
      {
        age: 25,
      },
      {
        age: 20,
      },
      {
        age: 25,
      },
      {
        age: 29,
      },
      {
        age: 25,
      },
      {
        age: 25,
      },
      {
        age: 17,
      },
      {
        age: 24,
      },
      {
        age: 28,
      },
      {
        age: 27,
      },
      {
        age: 22,
      },
    ],
    series: [
      {
        type: "histogram",
        xKey: "age",
        xName: "Donar Age",
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: { text: "Age band (years)" },
        tick: { interval: 2 },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Number of Donations" },
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getmap/cords/${decoded.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const json = await response.json();
        setmakerData(json.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (!map.current) {
      maptilersdk.config.apiKey = "teiTnFtxd3HIKqyMTrl6";

      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [mumbai.lng, mumbai.lat],
        zoom: zoom,
      });
    }

    if (markerData && markerData.length > 0) {
      markerData.forEach((markerInfo) => {
        const { lng, lat, content } = markerInfo;
        const marker = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([lat, lng])
          .addTo(map.current);

        const popup = new maptilersdk.Popup({ offset: 25 })
          .setHTML(`<h3>${content}</h3>`)
          .setMaxWidth("300px");

        marker.setPopup(popup);
      });
    }

    fetchData();
  }, [markerData]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/total/donations/${decoded.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const json = await response.json();
        settotald(json.data);
        console.log(totald);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/today/donations/${decoded.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const json = await response.json();
        settodtotal(json.data);
        console.log(todtotal);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData1();
    fetchData2();
  } , [totald , todtotal]);

  return (
    <div className={styles.mostouter}>
      <div className={styles.left}>
        <div className={styles.totalsum}>
          <p className={styles.tot}>Total Donations :</p>
          {totald.map((item, index) => (
            <p className={styles.fig} key={index}>{item.total}</p>
          ))}
        </div>

        <div className={styles.totalsum}>
          <p className={styles.tot}>Today's Donation :</p>
          {todtotal.map((item, index) => (
            <p className={styles.fig} key={index}>{item.todaytotal}</p>
          ))}
        </div>

        <div className={styles.totalsum}>
          <p className={styles.heading}>Top Donations</p>
          <div>
            <div className={styles.nametag}>
              <p className={styles.rank}>1.</p>
              <p>Name XXX YYY</p>
            </div>
            <p className={styles.location}>Dombivali , Smart City</p>
            <p className={styles.amount}>Amount : 999,XXX</p>
          </div>

          <div>
            <div className={styles.nametag}>
              <p className={styles.rank}>2.</p>
              <p>Name XXX YYY</p>
            </div>
            <p className={styles.location}>Dombivali , Smart City</p>
            <p className={styles.amount}>Amount : 999,XXX</p>
          </div>

          <div>
            <div className={styles.nametag}>
              <p className={styles.rank}>3.</p>
              <p>Name XXX YYY</p>
            </div>
            <p className={styles.location}>Dombivali , Smart City</p>
            <p className={styles.amount}>Amount : 999,XXX</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightleft}>
          <div className={styles.graph1bg}>
            <div className={styles.graphctn}>
              <AgChartsReact options={options} />
            </div>
          </div>
          <div className={styles.mapbg}>
            <div ref={mapContainer} className={styles.mapctn}></div>
          </div>
        </div>
        <div className={styles.rightright}>
          <div className={styles.graph2bg}>
            <AgChartsReact options={options2} />
          </div>
          <div className={styles.recentdot}>
            <AgChartsReact options={options3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
