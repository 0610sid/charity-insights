import React from 'react'
import styles from "../stylesheets/thankyou.module.css"
import navb from "../stylesheets/Navbar.module.css"
import heart from "../assets/heart.png"

import { useNavigate } from "react-router-dom"

const ThankYou = () => {

  let navigate = useNavigate()

  const func1 = (e) => {
    navigate("/")
}

  return (
    <div className={styles.outer}>
      <nav className={navb.navbar}>          
          <button className={`${styles.buttons} ${navb.buttonhome}`} onClick={func1}> Home </button>
      </nav>
      <p className={styles.header}>Thank You</p>
      <img src={heart} alt = 'Heart' className={styles.size}/>
      <p className={styles.below}>Your generosity is a beacon of kindness. Thank you for your heartfelt donation, making a positive impact with your support!</p>
    </div>
  )
}

export default ThankYou