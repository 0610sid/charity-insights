import React, { useState } from "react";
import styles from "../stylesheets/Login.module.css";

import user from "../assets/user.png";
import password from "../assets/password.png";
import email from "../assets/email.png";
import building from "../assets/building.png";
import information from "../assets/information.png";

import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const Signup = () => {
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");
  const [emailid, setemail] = useState("");
  const [name, setname] = useState("");
  const [des, setdesc] = useState("");
  const [img , setimg] = useState("")
  const [loct , setloct] = useState("")
  const [weblink , setweblink] = useState("")

  const [error, seterror] = useState(null);
  const [loader, setloader] = useState(false);

  const navigate = useNavigate();

  const onchange1 = (event) => {
    setname(event.target.value);
  };

  const onchange2 = (event) => {
    setemail(event.target.value);
  };

  const onchange3 = (event) => {
    setusername(event.target.value);
  };

  const onchange4 = (event) => {
    setpass(event.target.value);
  };

  const onchange5 = (event) => {
    setdesc(event.target.value);
  };

  const onchange6 = (event) => {
    setweblink(event.target.value);
  };

  const onchange7 = (event) => {
    setimg(event.target.value);
  };

  const onchange8 = (event) => {
    setloct(event.target.value);
  };

  const handlesubmit1 = async (e) => {
    e.preventDefault();

    setloader(true);

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: emailid,
        password: pass,
        name: name,
        describe: des,
        link : weblink,
        img : img,
        loct : loct
      }),
    });

    const json = await response.json();

    if (json.success) {
      setloader(false);
      navigate("/verification");
    }

    if (json.error) {
      setloader(false);
      seterror(json.error);
      setTimeout(() => {
        seterror(null);
      }, 4000);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container3}>
        <p className={styles.heading2}>SignUp</p>

        <form className={styles.form} onSubmit={handlesubmit1}>
          <div className={styles.forminsidemain}>
            {/* firsthalf starts here */}

            <div className={styles.forminsidehalf}>
              <div className={styles.field2}>
                <img src={building} className={styles.img} />
                <input
                  className={styles.input}
                  placeholder="Ngo's Name"
                  type="text"
                  onChange={onchange1}
                />
              </div>

              <div className={styles.field2}>
                <img src={email} className={styles.img2} />
                <input
                  className={styles.input}
                  placeholder="Email"
                  type="text"
                  onChange={onchange2}
                />
              </div>

              <div className={styles.field2}>
                <img src={user} className={styles.img2} />
                <input
                  className={styles.input}
                  placeholder="Username"
                  type="text"
                  onChange={onchange3}
                />
              </div>

              <div className={styles.field2}>
                <img src={password} className={styles.img2} />
                <input
                  className={styles.input}
                  placeholder="Password"
                  type="password"
                  onChange={onchange4}
                />
              </div>
            </div>

            {/* second half starts here */}

            <div className={styles.forminsidehalf}>
              <div className={styles.field2}>
                <img src={information} className={styles.img2} />
                <input
                  className={styles.input}
                  placeholder="Description"
                  type="text"
                  onChange={onchange5}
                />
              </div>

              <div className={styles.field2}>
                <img src={information} className={styles.img2} />
                <input
                  className={styles.input}
                  placeholder="Website URL"
                  type="text"
                  onChange={onchange6}
                />
              </div>

              <div className={styles.field2}>
                <img src={information} className={styles.img2} />
                <input
                  className={styles.input}
                  placeholder="Image URL"
                  type="text"
                  onChange={onchange7}
                />
              </div>

              <div className={styles.field2}>
                <img src={information} className={styles.img2} />
                <input
                  className={styles.input}
                  placeholder="Location"
                  type="text"
                  onChange={onchange8}
                />
              </div>
            </div>
          </div>

          <div className={styles.btndiv} style={{paddingBottom : "1%"}}>
            {!error && !loader && (
              <button className={styles.buttons}>SignUp</button>
            )}
            {error && <p className={styles.error}>{error}</p>}
            {loader && (
              <div className={styles.loadctn}>
                <SyncLoader
                  color="#ae98e1"
                  margin={5}
                  size={13}
                  loading={true}
                  speedMultiplier={1}
                  className={styles.loading}
                />
              </div>
            )}
          </div>
        </form>
        <p className={styles.tagline}>
          Already a member?{" "}
          <a href="/login" className={styles.link}>
            Login
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Signup;
