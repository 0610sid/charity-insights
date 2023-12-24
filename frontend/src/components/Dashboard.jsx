import React from "react";
import styles from "../stylesheets/Dashboard.module.css";

import styles2 from "../stylesheets/Ngo.module.css";
import stand from "../assets/temp2.jpeg";


const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className={styles.cards}>
        
        <div className={styles2.card}>
          <img src={stand} className={styles2.img} />
          <div className={styles2.cardText}>
            <div className={styles2.titleTotal}>
              <h2>Morgan Sweeney</h2>
              <div className={styles2.desc}>
                Morgan has collected ants since they were six years old and now
                has many dozen ants but none in their pants.
              </div>
              <div className={styles2.actions}><button className={styles2.button}>Donate $ </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
