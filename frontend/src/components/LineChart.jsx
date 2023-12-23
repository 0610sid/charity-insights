import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = () => {
    return (
        <div>
        <Line
            data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                label: "Donations",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1
                }
            ]
            }}
            height={400}
            width={600}
            options={{
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                {
                    ticks: {
                    beginAtZero: true
                    }
                }
                ],
                xAxes: [
                {
                    type: "category",
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    ticks: {
                    beginAtZero: true
                    }
                }
                ]
            }
            }}
        />
        </div>
    );
    };

export default LineChart;