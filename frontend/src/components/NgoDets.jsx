import React, { useState } from 'react';
import styles from "../stylesheets/NgoDets.module.css";
import img1 from "../assets/temp1.jpg";

const NgoDets = () => {
  const [location, setlocation] = useState({ latitude: null, longitude: null });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  };

  return (
    <div className={styles.ret}>
      <div className={styles.left}>
        <img src={img1} className={styles.img} />
        <div className={styles.leftinfo}>
          <p className={styles.name}>Name XXX XXX</p>
          <p className={styles.loct}>Location</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem nemo maiores perferendis distinctio
            repellendus corrupti aperiam cupiditate voluptatibus vitae eos ea, totam dignissimos tempore quam sint est,
            eveniet impedit.
          </p>
          <p style={{textAlign : "center", paddingTop : "1.5vh"}}><a href='https://meet.google.com/?authuser=0' className={styles.link}>For more info</a></p>
        </div>
      </div>

      <div className={styles.right}>

        <p className={styles.heading}>Kindly fill in the below details</p>

        <div className={styles.rightbg}>
        
          {!location.latitude ?
            <div className={styles.location}>
            <p>Location : </p>
            <button onClick={getLocation} className={styles.button}>Get Location</button>
            </div>
            :
            (<>
              <p>Coordinates: {location.latitude} , {location.longitude} </p>
              </>
            )
          }

          <input placeholder='Name' type='text' className={styles.input} />
          <input placeholder='Age' type='number' className={styles.input} />
          <input placeholder='Amount' type='number' className={styles.input} />
          <input placeholder='Email' type='email' className={styles.input} />
          <input placeholder='Number' type='number' className={styles.input} />
          <input placeholder='Occupation' type='number' className={styles.input} />
          <input placeholder='Gender' type='number' className={styles.input} />
        </div>
      </div>
    </div>
  );
};

export default NgoDets;
