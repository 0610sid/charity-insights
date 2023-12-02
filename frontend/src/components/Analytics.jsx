import React, { useState } from 'react';
import styles from "../stylesheets/Analytics.module.css";
import Map from "./Map";
import { createRoot } from 'react-dom/client';
import { AgChartsReact } from 'ag-charts-react';


const Analytics = () => {
  const markerData = [
    { lat: 35.6846, lng: 129.7525, content: "Marker 1" },
    { lat: 35.685, lng: 139.753, content: "Marker 2" },
    // Add more marker data as needed
  ];

  const apiKey = "teiTnFtxd3HIKqyMTrl6"; // Replace with your actual API key
  const [options, setOptions] = useState({
    title: {
        text: 'Race demographics',
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
            type: 'histogram',
            xKey: 'age',
            xName: 'Participant Age',
        },
    ],
    axes: [
        {
            type: 'number',
            position: 'bottom',
            title: { text: 'Age band (years)' },
            tick: { interval: 2 },
        },
        {
            type: 'number',
            position: 'left',
            title: { text: 'Number of participants' },
        },
    ],
});

  return (
    <div className={styles.mostouter}>
      <div className={styles.left}>
        <div className={styles.totalsum}>
          <p className={styles.tot}>Total Donations :</p>
          <p className={styles.fig}>20,XXX</p>
        </div>

        <div className={styles.totalsum}>
          <p className={styles.tot}>Today's Donation :</p>
          <p className={styles.fig}>20,XXX</p>
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
            <div className={styles.mapctn}>  
              <Map markers={markerData} apiKey={apiKey} />
            </div>
          </div>
        </div>
        <div className={styles.rightright}>
            <div className={styles.graph2bg}>occupation wise percentage</div>
            <div className={styles.recentdot}></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
