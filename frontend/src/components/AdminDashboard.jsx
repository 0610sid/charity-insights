import React from 'react'
import styles from '../stylesheets/Admin.module.css'

const AdminDashboard = () => {
  return (
    <>
    
    <div className={styles.nav}>
        <button className={styles.buttons1}>Logout</button>
    </div>
    
    <div className={styles.outer}>
        
        <div className={styles.ctn}>
            <div className={styles.text}>
                <p className={styles.name}>Name</p>
                <p className={styles.location}>Location</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis vitae sed expedita similique,
                    quam quibusdam necessitatibus quod itaque, labore in eum iusto repudiandae ducimus fugit maxime quas 
                    nobis mollitia accusamus.</p>
                <p className={styles.email}>Email</p>
            </div>
            
            <div className={styles.btns}>
                <button className={styles.buttons} style={{color : "green"}}>Accept</button>
                <button className={styles.buttons} style={{color : "red"}} >Reject</button>
            </div>
        </div>
        
    </div>

    </>
  )
}

export default AdminDashboard