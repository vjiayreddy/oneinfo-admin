"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  title?: string;
  subtitle?: string;
  successPercentage?: number;
  failedPercentage?: number;
}

export default function PieChart({
  title = "Scheduled Posts",
  subtitle = "Your carbon footprint includes direct emissions from your operations, like your buildings and vehicles.",
  successPercentage = 60,
  failedPercentage = 40,
}: PieChartProps) {
  const chartData = {
    labels: ["Successful", "Failed"],
    datasets: [
      {
        data: [successPercentage, failedPercentage],
        backgroundColor: ["#683fbe", "rgba(192, 163, 255, 0.9)"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
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
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="bg-white border border-[#eaeaea] rounded p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
          {title}
        </h3>
        <p className="text-sm text-[#6e6e73] leading-5">{subtitle}</p>
      </div>

      {/* Chart */}
      <div className="flex items-center justify-center h-[211px] my-4">
        <div className="w-[180px] h-[180px]">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 py-2">
          <div className="w-3 h-3 bg-[rgba(192,163,255,0.9)]"></div>
          <span className="text-xs font-normal text-[#1c1c1e] leading-[18px]">
            Failed: {failedPercentage}%
          </span>
        </div>
        <div className="flex items-center gap-2.5 py-2">
          <div className="w-3 h-3 bg-[#683fbe]"></div>
          <span className="text-xs font-normal text-[#1c1c1e] leading-[18px]">
            Successful: {successPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
