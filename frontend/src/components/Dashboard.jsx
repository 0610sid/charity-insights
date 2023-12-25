import React, { useEffect, useState } from "react";
import styles from "../stylesheets/Dashboard.module.css";
import styles2 from "../stylesheets/Ngo.module.css";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [reqdata, setreqdata] = useState([]);
  const navigate = useNavigate()

  const func1 = (ngoid) => {
    navigate(`/ngodeets/${ngoid}`)
  }

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(`http://localhost:5000/all/ngo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const json = await response.json();
        setreqdata(json);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData1();
  }, [reqdata]);

  return (
    <div>
      <p className={styles.title}>Dashboard</p>
      <div className={styles.cards}>
        
        {reqdata.map((item) => (
          <div key={item.id} className={styles2.card}>
            <img src={item.image} className={styles2.img} />
            <div className={styles2.cardText}>
              <div className={styles2.titleTotal}>
                <h2>{item.name}</h2>
                <p className={styles2.loct}>{item.location}</p>
                <div className={styles2.desc}>{item.description}</div>
                <div className={styles2.actions}>
                  <button className={styles2.button} onClick={() => func1(item.id)}>Donate $</button>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;
