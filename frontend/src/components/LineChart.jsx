import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { jwtDecode } from "jwt-decode";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = () => {
  const [b18, setb18] = useState(0);
  const [r1830, setr1830] = useState(0);
  const [r3060, setr3060] = useState(0);
  const [r6080, setr6080] = useState(0);
  const [r80100, setr80100] = useState(0);
  const [up100, setup100] = useState(0);
  var decoded = jwtDecode(localStorage.getItem("Token"));

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/age/donations/${decoded.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const json = await response.json();
        setb18(json.b18);
        setr1830(json.r1830);
        setr3060(json.r3060);
        setr6080(json.r6080);
        setr80100(json.r80100);
        setup100(json.up100);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData1();
  }, [b18, r1830, r3060, r6080, r80100, up100]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Line
        data={{
          labels: ["0-18", "18-30", "30-60", "60-80", "80-100", "100+"],
          datasets: [
            {
              label: "Donations",
              data: [b18, r1830, r3060, r6080, r80100, up100],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Number of Donation by Age",
              font: {
                size: 23,
              },
            },
          },
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
                labels: ["0-18", "18-30", "30-60", "60-80", "80-100", "100+"],
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

export default LineChart;
