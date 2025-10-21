"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  title?: string;
  subtitle?: string;
  data?: number[];
  labels?: string[];
  height?: number;
}

export default function LineChart({
  title = "Creator Growth",
  subtitle = "Track your creator onboarding trends",
  data = [10, 25, 35, 20, 45, 40, 65, 50],
  labels = ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
  height = 300,
}: LineChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Creators",
        data,
        borderColor: "#683fbe",
        backgroundColor: "rgba(104, 63, 190, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#683fbe",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
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
            return `Creators: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#eaeaea",
        },
        ticks: {
          color: "#6e6e73",
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6e6e73",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white border border-[#eaeaea] rounded p-5 flex flex-col gap-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-[#6e6e73] leading-5 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Chart */}
      <div style={{ height: `${height}px` }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
