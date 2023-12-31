import React, { useEffect, useState } from "react";
import styles from "../stylesheets/NgoDets.module.css";

import { useNavigate, useParams } from "react-router-dom";

const NgoDets = () => {
  const { ngoid } = useParams();

  const [location, setlocation] = useState({ latitude: null, longitude: null });
  const [reqdata, setreqdata] = useState({ name: "", description: "", email: "", locationtxt: "", image: "", moreinfo: "" });

  const [gender, setgender] = useState("")
  const [occup, setoccup] = useState("")
  const [age, setage] = useState(0)
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [num, setnum] = useState(0)
  const [amt, setamt] = useState(0)

  const [error, seterror] = useState()

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

  const navigate = useNavigate()

  const handlechange1 = (event) => {
    setgender(event.target.value)
  }

  const handlechange2 = (event) => {
    setoccup(event.target.value)
  }

  const handlechange3 = (event) => {
    setage(event.target.value)
  }

  const handlechange4 = (event) => {
    setname(event.target.value)
  }

  const handlechange5 = (event) => {
    setemail(event.target.value)
  }

  const handlechange6 = (event) => {
    setnum(event.target.value)
  }

  const handlechange7 = (event) => {
    setamt(event.target.value)
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    if(!num || !email || !location.latitude || !gender || !occup || !name)
    {
      setTimeout(() => {
        seterror("")
      }, 3000)
      return seterror("All fields are must !!")
    }

    if(num < 1000000000 || num > 9999999999)
    {
      setTimeout(() => {
        seterror("")
      }, 3000)
      return seterror("Please enter valid number")
    }

    if(amt < 1)
    {
      setTimeout(() => {
        seterror("")
      }, 3000)
      return seterror("Please enter amount greater than Rs.1")
    }

    try {
      const response1 = await fetch(
        `http://localhost:5000/create/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amt })
        }
      );
  
      const json2 = await response1.json();

      var options = {
        key: "rzp_test_WMmK73ZVRp3s5I",
        amount: amt,
        currency: "INR",
        name: "Charity Insights",
        description: "Thank you for your donation",
        image: "https://live.staticflickr.com/65535/17123251389_80282733ce_z.jpg",
        order_id: json2.order_id,
        handler: async function (response) {
          const body = {
            ...response,
          };
  
          console.log("Payment successful:", body);
  
          try {
            const response = await fetch(
              `http://localhost:5000/ngo/submit/donation/${ngoid}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gender: gender, occupation: occup, age: age, name: name, email: email, number: num, amount: amt, latitude: location.latitude, longitude: location.longitude })
              }
            );
  
            const json = await response.json();
            if (json.success) {
              setTimeout(() => {
                navigate("/thankyou")
            }, 2000)
            } else {
              seterror(json.error)
              setTimeout(() => {
                seterror("")
            }, 3000)
            }
          } catch (error) {
            console.error("Error submitting donation:", error.message);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: num,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#a3b1eb",
        },
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log("Payment failed:", response);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error fetching data:", error.message);
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
          <form style={{display : "flex" , flexDirection : "column" , alignItems : "center" }}>
            <div className={styles.rightinput}>

              <input placeholder="Name" type="text" className={styles.input} onChange={handlechange4} required />
              <input placeholder="Age" type="number" className={styles.input} onChange={handlechange3} required />
              <input placeholder="Email" type="email" className={styles.input} onChange={handlechange5} required />
              <input placeholder="Number" type="number" className={styles.input} onChange={handlechange6} required />
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
              <input placeholder="Amount" type="number" className={styles.input} onChange={handlechange7} required />
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

            <button onClick={handlesubmit} className={styles.button}>Submit</button>
            {error && <p>{error}</p>}

          </form>
        </div>
      </div>
    </div>
  );
};

export default NgoDets;
