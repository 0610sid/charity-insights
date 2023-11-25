import React from 'react'
import styles from "../stylesheets/Analytics.module.css"

const Anlaytics = () => {
  return (
    <div className={styles.mostouter}>
      
      <div className={styles.left}>
        <div className={styles.totalsum}>
          <p className={styles.tot}>Total Donations :</p>
          <p className={styles.fig}>20,XXX</p>
        </div>
        
      </div>
      
      <div className={styles.right}></div>

    </div>
  )
}

export default Anlaytics