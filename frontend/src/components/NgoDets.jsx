import React, { useEffect, useState } from "react";
import styles from "../stylesheets/NgoDets.module.css";
import img1 from "../assets/temp1.jpg";
import { useParams } from "react-router-dom";

const NgoDets = () => {
  const { ngoid } = useParams();

  const [location, setlocation] = useState({ latitude: null, longitude: null });
  const [reqdata, setreqdata] = useState({name: "",description: "",email: "",locationtxt: "",image: "",moreinfo: ""});

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

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/ngo/info/${ngoid}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const json = await response.json();
        setreqdata({
          ...reqdata,
          email: json.email,
          name: json.name,
          description: json.description,
          locationtxt: json.location,
          image: json.image,
          moreinfo: json.moreinfo,
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData1();
  }, [ngoid]);

  return (
    <div className={styles.ret}>
      <div className={styles.left}>
        <img src={reqdata.image} className={styles.img} />
        <div className={styles.leftinfo}>
          <p className={styles.name}>{reqdata.name}</p>
          <p className={styles.loct} style={{ paddingBottom: "0" }}>
            {reqdata.locationtxt}
          </p>
          <p className={styles.loct}>{reqdata.email}</p>
          <p style={{ fontSize: "1.1vw" }}>{reqdata.description}</p>
          <p style={{ textAlign: "center", paddingTop: "2vh" }}>
            <a
              href={reqdata.moreinfo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Link Text
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
