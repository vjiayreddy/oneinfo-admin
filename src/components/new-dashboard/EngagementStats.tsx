"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EngagementStatsProps {
  title?: string;
  autoData?: number[];
  manualData?: number[];
  labels?: string[];
}

export default function EngagementStats({
  title = "Engagement & Usage Stats",
  autoData = [6000, 5500, 4500, 4000, 3800, 3600, 3400, 3200, 0, 0, 0],
  manualData = [2000, 1500, 1200, 1200, 1200, 1200, 1200, 1200, 0, 0, 0],
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
}: EngagementStatsProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Auto",
        data: autoData,
        backgroundColor: "#e8ddff",
        borderRadius: 4,
        barThickness: 35,
      },
      {
        label: "Manual",
        data: manualData,
        backgroundColor: "#683fbe",
        borderRadius: 4,
        barThickness: 35,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1c1c1e",
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#1c1c1e",
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 8000,
        grid: {
          color: "#eaeaea",
        },
        ticks: {
          color: "#1c1c1e",
          font: {
            size: 12,
          },
          callback: function (value: any) {
            if (value === 0) return "0.00";
            return `${value / 1000}K`;
          },
          stepSize: 2000,
        },
        title: {
          display: true,
          text: "Daily Auto DMs",
          color: "#1c1c1e",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white border border-[#eaeaea] rounded p-[18px] flex flex-col gap-9">
      {/* Header with Legend */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
          {title}
        </h3>
        
        {/* Legend */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-[19px] h-[19px] bg-[#e8ddff]" />
            <span className="text-sm font-medium text-[#1c1c1e] leading-5">
              Auto
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[19px] h-[19px] bg-[#683fbe]" />
            <span className="text-sm font-medium text-[#1c1c1e] leading-5">
              Manual
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
