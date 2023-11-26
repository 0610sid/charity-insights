import React from 'react'
import styles from "../stylesheets/NgoDets.module.css"

import img1 from "../assets/temp1.jpg"

const NgoDets = () => {
  return (
    <div className={styles.ret}>
        <div className={styles.left}>

            <img src={img1} className={styles.img} />

        </div>

        <div className={styles.right}></div>
    </div>
  )
}

export default NgoDets