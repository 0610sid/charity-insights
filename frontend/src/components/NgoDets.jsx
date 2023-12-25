import React, { useEffect, useState } from "react";
import styles from "../stylesheets/NgoDets.module.css";
import img1 from "../assets/temp1.jpg";
import { useParams } from "react-router-dom";

const NgoDets = () => {
  const { ngoid } = useParams();

  const [location, setlocation] = useState({ latitude: null, longitude: null });
  const [reqdata, setreqdata] = useState({name: "",description: "",email: "",locationtxt: "",image: "",moreinfo: ""});

  const [gender , setgender] = useState("")
  const [occup , setoccup] = useState("")
  const [age , setage] = useState(0)
  const [name , setname] = useState("")
  const [email , setemail] = useState("")
  const [num , setnum] = useState(0)
  const [amt , setamt] = useState(0)

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

  const handlechange1 = (event) =>{
    setgender(event.target.value)
  }

  const handlechange2 = (event) =>{
    setoccup(event.target.value)
  }

  const handlechange3 = (event) =>{
    setage(event.target.value)
  }

  const handlechange4 = (event) =>{
    setname(event.target.value)
  }

  const handlechange5 = (event) =>{
    setemail(event.target.value)
  }

  const handlechange6 = (event) =>{
    setnum(event.target.value)
  }

  const handlechange7 = (event) =>{
    setamt(event.target.value)
  }

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
            <input placeholder="Name" type="text" className={styles.input} onChange={handlechange4} />
            <input placeholder="Age" type="number" className={styles.input} onChange={handlechange3} />
            <input placeholder="Email" type="email" className={styles.input} onChange={handlechange5} />
            <input placeholder="Number" type="number" className={styles.input} onChange={handlechange6} />
            <br />
            <select defaultValue="" className={styles.customdropdown} onChange={handlechange1}>
              <option disabled hidden value="">
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <br />
            <select defaultValue="" className={styles.customdropdown} onChange={handlechange2}>
              <option disabled hidden value="">
                Select Occupation
              </option>
              <option value="Employed">Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="SelfEmployed">Self-Employed</option>
              <option value="Student">Student</option>
              <option value="Retired">Retired</option>
            </select>
            <br />
            <br />
            <input placeholder="Amount" type="number" className={styles.input} onChange={handlechange7}/>
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

          <button onClick={getLocation} className={styles.button}>Submit</button>

        </div>
      </div>
    </div>
  );
};

export default NgoDets;
