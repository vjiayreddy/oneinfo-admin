"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartConfiguration,
  LineController,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
  Filler
);

const ContentMonitoringChart = () => {
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

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: [
          "Q1 2023",
          "Q2 2023",
          "Q3 2023",
          "Q4 2023",
          "Q1 2024",
          "Q2 2024",
          "Q3 2024",
          "Q4 2024",
        ],
        datasets: [
          {
            label: "Content Monitoring",
            data: [3, 8, 4, 5, 6, 7, 6, 9],
            borderColor: "#7C3AED",
            backgroundColor: "rgba(124, 58, 237, 0.1)",
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: "#7C3AED",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
                family: "'Inter', sans-serif",
              },
              color: "#6B7280",
            },
          },
          y: {
            beginAtZero: true,
            max: 10,
            grid: {
              color: "#F3F4F6",
            },
            ticks: {
              font: {
                size: 12,
                family: "'Inter', sans-serif",
              },
              color: "#6B7280",
              stepSize: 2,
            },
            title: {
              display: true,
              text: "In Million",
              font: {
                size: 12,
                family: "'Inter', sans-serif",
                weight: "bold" as const,
              },
              color: "#374151",
              padding: { bottom: 10 },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1F2937",
            titleColor: "#F9FAFB",
            bodyColor: "#F9FAFB",
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                return `${context.parsed.y}M`;
              },
            },
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
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 h-full w-full flex flex-col">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
        Content Monitoring
      </h2>
      <div className="flex-1 min-h-[280px] sm:min-h-[320px] lg:min-h-[400px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ContentMonitoringChart;
