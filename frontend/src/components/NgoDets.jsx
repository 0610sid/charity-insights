import React, { useState } from "react";
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
            longitude: position.coords.longitude,
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
          <p style={{ fontSize: "1.1vw" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            rem nemo maiores perferendis distinctio repellendus corrupti aperiam
            cupiditate voluptatibus vitae eos ea, totam dignissimos tempore quam
            sint est, eveniet impedit.
          </p>
          <p style={{ textAlign: "center", paddingTop: "2vh" }}>
            <a
              href="https://meet.google.com/?authuser=0"
              className={styles.link}
            >
              For more info
            </a>
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <p className={styles.heading}>Kindly fill in the below details</p>

        <div className={styles.rightbg}>
          <div className={styles.rightinput}>
            <input placeholder="Name" type="text" className={styles.input} />
            <input placeholder="Age" type="number" className={styles.input} />
            <input placeholder="Email" type="email" className={styles.input} />
            <input
              placeholder="Number"
              type="number"
              className={styles.input}
            />
            <br />
            <select defaultValue="" className={styles.customdropdown}>
              <option disabled hidden value="">
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <br />
            <br />
            <select defaultValue="" className={styles.customdropdown}>
              <option disabled hidden value="">
                Select Occupation
              </option>
              <option value="male">Employed</option>
              <option value="female">Unemployed</option>
              <option value="other">Self-Employed</option>
              <option value="other">Student</option>
              <option value="other">Retired</option>
            </select>
            <br />
            <br />
            <input
              placeholder="Amount"
              type="number"
              className={styles.input}
            />
          </div>

          <div className={styles.location}>
            <p>Location : </p>
            {!location.latitude ? (
              <p onClick={getLocation} className={styles.cord1}>
                Get Location
              </p>
            ) : (
              <p className={styles.cord2}>
                {location.latitude} , {location.longitude}
              </p>
            )}
          </div>

          <button onClick={getLocation} className={styles.button}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NgoDets;
