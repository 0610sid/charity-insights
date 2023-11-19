import React from 'react';
import styles from '../stylesheets/Ngo.module.css';

import building from '../assets/temp1.jpg'
import stand from '../assets/temp2.jpeg'

const Ngo = () => {
  return (
    <div className={styles.card}>
        <img src={stand} className={styles.img}/>
      <div className={styles.cardText}>
        <div className={styles.titleTotal}>
          <h2>Morgan Sweeney</h2>
          <div className={styles.desc}>Morgan has collected ants since they were six years old and now has many dozen ants but none in their pants.</div>
          <div className={styles.actions}>
            <button className={styles.button}>Donate $ </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ngo;
