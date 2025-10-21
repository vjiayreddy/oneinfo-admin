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

const CreatorInsights = () => {
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
        labels: ["Agency", "Communication", "Web Development", "Travel"],
        datasets: [
          {
            data: [85, 150, 56, 50], // Total: 341
            backgroundColor: [
              "#A78BFA", // Light purple
              "#8B5CF6", // Purple (largest - Communication)
              "#C4B5FD", // Lighter purple
              "#DDD6FE", // Lightest purple
            ],
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
                const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
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

  const creators = [
    {
      rank: 1,
      name: "@creator_one",
      followers: "254,300",
      dailyGrowth: "+320",
      autoDMs: "1,450",
      engagement: "8.7%",
    },
    {
      rank: 2,
      name: "@creator_one",
      followers: "254,300",
      dailyGrowth: "+320",
      autoDMs: "1,450",
      engagement: "8.7%",
    },
    {
      rank: 3,
      name: "@creator_one",
      followers: "254,300",
      dailyGrowth: "+320",
      autoDMs: "1,450",
      engagement: "8.7%",
    },
    {
      rank: 4,
      name: "@creator_one",
      followers: "254,300",
      dailyGrowth: "+320",
      autoDMs: "1,450",
      engagement: "8.7%",
    },
    {
      rank: 5,
      name: "@creator_one",
      followers: "254,300",
      dailyGrowth: "+320",
      autoDMs: "1,450",
      engagement: "8.7%",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
      {/* Left Section: Top Performing Creators Table */}
      <div className="lg:col-span-8 bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 flex flex-col">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Top Performing Creators
        </h2>

        {/* Table - Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pb-3 px-2">
                  Rank
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pb-3 px-2">
                  Creator Name
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pb-3 px-2">
                  Followers
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pb-3 px-2">
                  Daily Growth
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pb-3 px-2">
                  Auto DMs Sent
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pb-3 px-2">
                  Engagement Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {creators.map((creator, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      {creator.rank === 1 && (
                        <span className="text-lg">🏅</span>
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {creator.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm font-medium text-purple-600">
                      {creator.name}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm text-gray-900">{creator.followers}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm text-green-600 font-medium">
                      {creator.dailyGrowth}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm text-gray-900">{creator.autoDMs}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm font-medium text-gray-900">
                      {creator.engagement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards - Mobile */}
        <div className="sm:hidden space-y-4">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {creator.rank === 1 && <span className="text-lg">🏅</span>}
                  <span className="text-sm font-semibold text-gray-900">
                    Rank {creator.rank}
                  </span>
                </div>
                <span className="text-sm font-medium text-purple-600">
                  {creator.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">Followers:</span>
                  <span className="ml-1 font-medium text-gray-900">
                    {creator.followers}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Growth:</span>
                  <span className="ml-1 font-medium text-green-600">
                    {creator.dailyGrowth}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Auto DMs:</span>
                  <span className="ml-1 font-medium text-gray-900">
                    {creator.autoDMs}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Engagement:</span>
                  <span className="ml-1 font-medium text-gray-900">
                    {creator.engagement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Top Categories Pie Chart */}
      <div className="lg:col-span-4 bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 flex flex-col">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Top Categories
        </h2>

        <div className="flex flex-col items-center">
          {/* Total Count */}
          <div className="mb-4 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">341</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Total Companies</p>
          </div>

          {/* Chart Container */}
          <div className="w-full max-w-[280px] sm:max-w-[320px] h-[280px] sm:h-[320px]">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorInsights;
