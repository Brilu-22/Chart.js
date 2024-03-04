import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function PieChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Direct", "Organic Search", "Referral", "Social Media"],
        datasets: [
          {
            data: [30, 40, 20, 10], // Example data representing percentages
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.label}: ${context.parsed.toFixed(2)}%`,
            },
          },
          datalabels: {
            formatter: (value, context) => {
              const sum = context.dataset.data.reduce(
                (acc, val) => acc + val,
                0
              );
              const percentage = ((value / sum) * 100).toFixed(2);
              return `${percentage}%`;
            },
            color: "#fff",
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

  return (
    <div>
      <canvas ref={chartRef} width="300" height="200" />
    </div>
  );
}
