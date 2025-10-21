"use client";

import { TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: "up" | "down";
}

function InsightCard({ title, value, trend }: StatCardProps) {
  return (
    <div className="flex-1 min-w-0 bg-[#e8ddff] border border-[#eaeaea] rounded-[5px] p-4 relative overflow-hidden">
      <div className="flex flex-col gap-2.5 relative z-10">
        <p className="text-sm font-medium text-[#1c1c1e] leading-5">{title}</p>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-[#1c1c1e] leading-8">
            {value}
          </h3>
          {trend === "down" && (
            <TrendingDown className="w-3.5 h-2 text-[#e66464]" />
          )}
        </div>
      </div>
      
      {/* Decorative background waves */}
      <div className="absolute bottom-0 right-0 opacity-30">
        <svg width="90" height="60" viewBox="0 0 90 60" fill="none">
          <path
            d="M0 30 Q 22.5 10, 45 30 T 90 30 L 90 60 L 0 60 Z"
            fill="#683fbe"
            opacity="0.2"
          />
        </svg>
      </div>
    </div>
  );
}

interface CreatorInsightsProps {
  totalCreators?: string;
  activeCreators?: string;
  totalDMs?: string;
  avgGrowth?: string;
}

export default function CreatorInsights({
  totalCreators = "3,434",
  activeCreators = "3,434",
  totalDMs = "3,434K",
  avgGrowth = "34.54%",
}: CreatorInsightsProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <InsightCard
          title="Total Creators Registered"
          value={totalCreators}
          trend="down"
        />
        <InsightCard
          title="Active Creators Today"
          value={activeCreators}
          trend="down"
        />
        <InsightCard
          title="Total DMs Sent (All Creators)"
          value={totalDMs}
          trend="down"
        />
        <InsightCard
          title="Avg Growth % Across Creators"
          value={avgGrowth}
        />
      </div>
    </div>
  );
}
