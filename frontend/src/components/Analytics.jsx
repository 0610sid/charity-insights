import React from "react";
import styles from "../stylesheets/Analytics.module.css";
import MapComponent from "./MapComponent";

const Anlaytics = () => {
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
          <div className={styles.graph1bg}>age wise graph shit here</div>
          <div className={styles.mapbg}>
            <div className={styles.mapctn}>
              <MapComponent />
            </div>
          </div>
        </div>
        <div className={styles.rightright}>
          <div className={styles.recentdot}></div>
        </div>
      </div>
    </div>
  );
};

export default Anlaytics;
