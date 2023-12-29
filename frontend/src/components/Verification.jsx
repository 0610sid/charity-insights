import React from 'react'
import styles from "../stylesheets/thankyou.module.css"
import navb from "../stylesheets/Navbar.module.css"
import wait from "../assets/wait.png"

import { useNavigate } from "react-router-dom"

const Verification = () => {

  let navigate = useNavigate()

  const func1 = (e) => {
    navigate("/")
}

  return (
    <div className={styles.outer}>
      <nav className={navb.navbar}>          
          <button className={`${styles.buttons} ${navb.buttonhome}`} onClick={func1}> Home </button>
      </nav>
      <p className={styles.header}>Wait !</p>
      <img src={wait} alt = 'Wait' className={styles.size}/>
      <p className={styles.below}>Thank you sincerely for your patience as we process your verification. Kindly await completion of the verification process; we appreciate your cooperation during this time.</p>
    </div>
  )
}

export default Verification