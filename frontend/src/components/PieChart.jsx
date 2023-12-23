import React, { useEffect, useState } from "react";
import {Chart as ChartJS,PieController,ArcElement,Tooltip,Legend,Title} from "chart.js";
import { Pie } from "react-chartjs-2";
import { jwtDecode } from "jwt-decode";

ChartJS.register(PieController, ArcElement, Tooltip, Legend, Title);

const PieChart = () => {

  const [emp, setemp] = useState(0);
  const [unemp, setunemp] = useState(0);
  const [selfemp, setselfemp] = useState(0);
  const [ret, setret] = useState(0);
  const [std, setstd] = useState(0);
  var decoded = jwtDecode(localStorage.getItem("Token"));

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/occupation/donations/${decoded.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const json = await response.json();
        setemp(json.Employed);
        setunemp(json.Unemployed);
        setret(json.Retired);
        setstd(json.Student)
        setselfemp(json.SelfEmployed)
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData1();
  }, [emp , unemp , selfemp , std , ret]);

  return (
    <div style={{height:'100%' , width:'100%'}}>
      <Pie
        data={{
          labels: ["Employed", "UnEmployed", "SelfEmployed", "Student", "Retired"],
          datasets: [
            {
              label: "Donations",
              data: [emp , unemp , selfemp , std , ret],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)"],
              borderWidth: 1,
            },
          ],
        }}

        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                type: "category",
                labels: ["Employed", "UnEmployed", "SelfEmployed", "Student", "Retired"],
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default PieChart;
