"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartConfiguration,
  BarController,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController);

const EngagementStatsChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration<"bar"> = {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [
          {
            label: "Auto",
            data: [5000, 4500, 6000, 5500, 7000, 6500, 6000, 7500, 7000, 6500],
            backgroundColor: "#7C3AED",
            borderRadius: 4,
            barPercentage: 0.7,
          },
          {
            label: "Manual",
            data: [2000, 2500, 2000, 2500, 1500, 2000, 2500, 1500, 2000, 2500],
            backgroundColor: "#C4B5FD",
            borderRadius: 4,
            barPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
                family: "'Inter', sans-serif",
              },
              color: "#6B7280",
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 8000,
            grid: {
              color: "#F3F4F6",
            },
            ticks: {
              font: {
                size: 12,
                family: "'Inter', sans-serif",
              },
              color: "#6B7280",
              stepSize: 2000,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              padding: 15,
              font: {
                size: 12,
                family: "'Inter', sans-serif",
              },
              usePointStyle: true,
              pointStyle: "circle",
              color: "#6B7280",
            },
          },
          tooltip: {
            backgroundColor: "#1F2937",
            titleColor: "#F9FAFB",
            bodyColor: "#F9FAFB",
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
          },
        },
      },
    };

    chartInstance.current = new ChartJS(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
        Daily Auto DMs
      </h2>
      <div className="h-[280px] sm:h-[320px] lg:h-[380px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default EngagementStatsChart;
