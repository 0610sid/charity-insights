import React, { useEffect, useState } from 'react'
import styles from '../stylesheets/Admin.module.css'

import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {

    const [reqdata, setreqdata] = useState([])

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response = await fetch(`http://localhost:5000/admin/all/ngo`, {
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


    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("Token")
        navigate("/")
    }

    const func1 = async (ngoid) =>{
        try {
            const response = await fetch(`http://localhost:5000/admin/verify/${ngoid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const json = await response.json();
            setreqdata(json);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    const func2 = async (ngoid) =>{
        try {
            const response = await fetch(`http://localhost:5000/admin/delete/${ngoid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const json = await response.json();
            setreqdata(json);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    return (
        <>
            <div className={styles.nav}>
                <button className={styles.buttons1} onClick={logout}>Logout</button>
            </div>

            <div className={styles.outer}>

                {reqdata.map((item) => (
                    <div className={styles.ctn}>
                        <div className={styles.text}>
                            <p className={styles.name}>{item.name}</p>
                            <p className={styles.location}>{item.location}</p>
                            <p>{item.description}</p>
                            <p className={styles.email}>{item.email}</p>
                            <p className={styles.email}><a href={item.moreinfo} style={{color : "#a3b1eb"}}>{item.moreinfo}</a></p>
                        </div>

                        <div className={styles.btns}>
                            <button className={styles.buttons} style={{ color: "green" }} onClick={() => func1(item.id)}>Accept</button>
                            <button className={styles.buttons} style={{ color: "red" }} onClick={() => func2(item.id)}>Reject</button>
                        </div>
                    </div>
                ))}

            </div>

        </>
    )
}

export default AdminDashboard