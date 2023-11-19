import React from 'react'
import styles from '../stylesheets/Dashboard.module.css'

import Ngo from '../components/Ngo'

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className={styles.cards}>
        <Ngo />
        <Ngo />
        <Ngo />
      </div>
      
    </div>
  )
}

export default Dashboard