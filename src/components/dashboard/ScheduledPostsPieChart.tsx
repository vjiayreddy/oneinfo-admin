"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
  TooltipItem,
  PieController,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, PieController);

const ScheduledPostsPieChart = () => {
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

    const config: ChartConfiguration<"pie"> = {
      type: "pie",
      data: {
        labels: ["Failed", "Successful"],
        datasets: [
          {
            data: [40, 60],
            backgroundColor: ["#7C3AED", "#C4B5FD"],
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              padding: 20,
              font: {
                size: 12,
                family: "'Inter', sans-serif",
              },
              usePointStyle: true,
              pointStyle: "circle",
              color: "#6B7280",
              generateLabels: function (chart) {
                const data = chart.data;
                if (data.labels && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const value = data.datasets[0].data[i];
                    const bgColors = data.datasets[0].backgroundColor as string[];
                    return {
                      text: `${label}: ${value}%`,
                      fillStyle: bgColors[i],
                      hidden: false,
                      index: i,
                    };
                  });
                }
                return [];
              },
            },
          },
          tooltip: {
            backgroundColor: "#1F2937",
            titleColor: "#F9FAFB",
            bodyColor: "#F9FAFB",
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context: TooltipItem<"pie">) {
                const label = context.label || "";
                const value = context.parsed || 0;
                return `${label}: ${value}%`;
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
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
        Scheduled Posts
      </h2>

      <div className="flex flex-col items-center justify-between flex-1">
        {/* Chart Container */}
        <div className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[260px] h-[200px] sm:h-[240px] lg:h-[260px] flex items-center justify-center">
          <canvas ref={chartRef}></canvas>
        </div>

        {/* Note */}
        <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100 w-full mt-4">
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            Your carbon footprint includes direct emissions from your operations, like your
            buildings and vehicles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduledPostsPieChart;
