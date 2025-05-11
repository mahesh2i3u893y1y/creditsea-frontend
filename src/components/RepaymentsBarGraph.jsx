import React from "react";
import { Bar } from "react-chartjs-2";
import useMonthlyStats from "../hooks/useMonthlyStats";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Month labels
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const RepaymentsBarChart = () => {
  const { monthlyData, loadingOverview, errorOverview } = useMonthlyStats();

  if (loadingOverview) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div> 
      </div>
    );
  }
  if (errorOverview) return <p className="text-center text-red-600">Error: {errorOverview}</p>;

  const repaymentsPerMonth = monthlyData?.repaymentsPerMonth || {};

  // Sort 
  const sortedEntries = Object.entries(repaymentsPerMonth).sort((a, b) => {
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
        label: "Repayments per Month",
        data: dataPoints,
        backgroundColor: "#0378e3", 
        borderRadius: 0,
        barThickness: 35,
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
    <div className=" flex items-center justify-center font-poppins mt-10  px-4">
      <div className="bg-white   p-6" style={{ width: "900px", height: "350px" }}>
        <h2 className="text-xl font-bold mb-4 text-start text-gray-700">
          Monthly Repayments Count
        </h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RepaymentsBarChart;
