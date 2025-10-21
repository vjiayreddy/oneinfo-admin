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

interface Creator {
  rank: number;
  name: string;
  avatar?: string;
  followers: string;
  dailyGrowth: string;
  dmsSent: string;
  engagementRate: string;
}

interface Category {
  name: string;
  color: string;
}

interface TopPerformersProps {
  creators?: Creator[];
  categories?: Category[];
}

const defaultCreators: Creator[] = [
  {
    rank: 1,
    name: "@creator_one",
    followers: "25,430",
    dailyGrowth: "+320",
    dmsSent: "1,450",
    engagementRate: "8.7%",
  },
  {
    rank: 2,
    name: "@creator_two",
    followers: "23,120",
    dailyGrowth: "+280",
    dmsSent: "1,320",
    engagementRate: "7.9%",
  },
  {
    rank: 3,
    name: "@creator_three",
    followers: "20,890",
    dailyGrowth: "+240",
    dmsSent: "1,180",
    engagementRate: "7.2%",
  },
];

const defaultCategories: Category[] = [
  { name: "Agency", color: "#683fbe" },
  { name: "Communication", color: "#8B5CF6" },
  { name: "Communication", color: "#A78BFA" },
  { name: "Web Development", color: "#C4B5FD" },
  { name: "Travel", color: "#E8DDFF" },
];

function TopPerformersTable({ creators = defaultCreators }: { creators?: Creator[] }) {
  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank.toString();
    }
  };

  return (
    <div className="flex-1 bg-white border border-[#eaeaea] rounded p-[18px] flex flex-col gap-3.5 overflow-x-auto">
      <h3 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
        Top Performing Creators
      </h3>

      <div className="flex flex-col gap-2.5 min-w-[600px]">
        {/* Table Header */}
        <div className="bg-[#e8ddff] border border-[#eaeaea] rounded flex items-center text-xs font-normal text-[#1c1c1e] leading-[18px]">
          <div className="w-[60px] p-2.5">Rank</div>
          <div className="w-[150px] p-2.5">Creator Name</div>
          <div className="flex-1 p-2.5">Followers</div>
          <div className="flex-1 p-2.5">Daily Growth</div>
          <div className="flex-1 p-2.5">Auto DMs Sent</div>
          <div className="flex-1 p-2.5">Engagement Rate</div>
        </div>

        {/* Table Rows */}
        {creators.map((creator) => (
          <div
            key={creator.rank}
            className="bg-white border border-[#eaeaea] rounded flex items-center text-xs font-normal text-[#1c1c1e] leading-[18px]"
          >
            <div className="w-[60px] px-2.5 py-2 truncate">
              {getRankEmoji(creator.rank)} {creator.rank}
            </div>
            <div className="w-[150px] p-2.5 flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[#e8ddff] rounded-full flex-shrink-0" />
              <span className="truncate">{creator.name}</span>
            </div>
            <div className="flex-1 px-2.5 py-2 truncate">{creator.followers}</div>
            <div className="flex-1 px-2.5 py-2 truncate">{creator.dailyGrowth}</div>
            <div className="flex-1 px-2.5 py-2 truncate">{creator.dmsSent}</div>
            <div className="flex-1 px-2.5 py-2 truncate">{creator.engagementRate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopCategoriesChart({ categories = defaultCategories }: { categories?: Category[] }) {
  const chartData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map(() => 1),
        backgroundColor: categories.map((cat) => cat.color),
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "55%",
  };

  return (
    <div className="w-[217px] bg-white border border-[#eaeaea] rounded p-[18px] flex flex-col gap-3 flex-shrink-0">
      <h3 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
        Top categories
      </h3>

      <div className="flex flex-col gap-3 items-center">
        {/* Pie Chart */}
        <div className="w-[178px] h-[178px] relative">
          <Doughnut data={chartData} options={options} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xs text-[#683fbe] leading-[18px] w-20">
              341 Companies
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1 w-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-2.5 py-1 rounded"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs font-normal text-[#1c1c1e] leading-[18px]">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TopPerformers({ creators, categories }: TopPerformersProps) {
  return (
    <div className="flex gap-5 items-stretch min-h-[300px]">
      <TopPerformersTable creators={creators} />
      <TopCategoriesChart categories={categories} />
    </div>
  );
}
