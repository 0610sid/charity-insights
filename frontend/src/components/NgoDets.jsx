import React, { useEffect, useState } from 'react'
import styles from "../stylesheets/NgoDets.module.css"

import img1 from "../assets/temp1.jpg"

const NgoDets = () => {

  const [location , setlocation] = useState({latitude:null , longitude:null})

  useEffect(() =>{
    if(navigator.geolocation){

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.log(error.message)
        }
      )
    }
    else{
      console.log("Geolocation not supported")
    }

  } , [])

  return (
    <div className={styles.ret}>
        <div className={styles.left}>

            <img src={img1} className={styles.img} />
            <div className={styles.leftinfo}>
             <p>Name XXX XXX</p>
             <p>Location</p>
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem nemo maiores perferendis distinctio
              repellendus corrupti aperiam cupiditate voluptatibus vitae eos ea, totam dignissimos tempore quam sint est, 
              eveniet impedit.</p>
              <p><a href='https://meet.google.com/?authuser=0'>For more info</a></p>
            </div>
        </div>

        <div className={styles.right}>
          <p>Latitude : {location.latitude}</p>
          <p>Longitude : {location.longitude}</p>
        </div>
    </div>
  )
}

export default NgoDets