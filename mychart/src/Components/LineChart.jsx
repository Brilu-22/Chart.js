import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function StockPriceChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    // Sample data for daily closing prices of Phoenix Inc. over the past 6 months
    const dailyClosingPrices = [
      120, 125, 130, 135, 140, 145, 150, 155, 160, 155, 150, 145, 140, 135, 130,
      135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 175, 170, 165, 160,
    ];

    chartInstance.current = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: Array.from(
          { length: dailyClosingPrices.length },
          (_, i) => `Day ${i + 1}`
        ),
        datasets: [
          {
            label: "Phoenix Inc. Daily Closing Prices",
            data: dailyClosingPrices,
            fill: true, // Fill area under the line
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Light blue color with opacity
            borderColor: "rgb(75, 192, 192)", // Solid line color
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Stock Price Chart for Phoenix Inc. (Past 6 Months)",
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

  return (
    <>
      <canvas ref={chartRef} style={{ width: "600px", height: "400px" }} />
    </>
  );
}
