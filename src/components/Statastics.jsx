import React from "react";
import useMonthlyStats from "../hooks/useMonthlyStats";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const Statastics = () => {
  const { monthlyData, loadingOverview, errorOverview } = useMonthlyStats();

   if (loadingOverview) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div> 
      </div>
    );
  }
  if (errorOverview) return <p className="text-center text-red-600">Error: {errorOverview}</p>;

  const loansPerMonth = monthlyData?.loansPerMonth || {};

  // Sort 
  const sortedEntries = Object.entries(loansPerMonth).sort((a, b) => {
    const [aMonth, aYear] = a[0].split("-").map(Number);
    const [bMonth, bYear] = b[0].split("-").map(Number);
    return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
  });

  const labels = sortedEntries.map(([key]) => {
    const [month] = key.split("-");
    return monthNames[parseInt(month) - 1];
  });

  const dataPoints = sortedEntries.map(([, value]) => value);

  const data = {
    labels,
    datasets: [
      {
        label: "Loans Released",
        data: dataPoints,
        fill: true,
        backgroundColor: "#6b9908", 
        borderColor: "#22c55e", 
        pointBackgroundColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4B5563",
        },
      },
      x: {
        ticks: {
          color: "#4B5563",
        },
      },
    },
  };

  return (
    <div className="mt-10 flex items-center justify-center px-4 font-poppins">
      <div className="bg-white   p-6" style={{ width: "900px", height: "350px" }}>
        <h2 className="text-lg font-bold mb-4 text-start text-gray-700">
          Monthly Loans Released
        </h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Statastics;
