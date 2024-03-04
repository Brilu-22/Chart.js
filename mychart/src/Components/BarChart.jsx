import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function BarChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    // Monthly sales data for RedBull Energy Drink (made-up data)
    const monthlySalesData = [
      500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600,
    ];

    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Monthly Sales",
            data: monthlySalesData,
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Red color with opacity
            borderColor: "rgba(255, 99, 132, 1)", // Red color without opacity
            borderWidth: 1, // Border width for each bar
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Start y-axis from zero
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Monthly Sales for RedBull Energy Drink",
            font: {
              size: 18,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
}
