"use client";

import LineChart from "./LineChart";
import PieChart from "./PieChart";
import CreatorInsights from "./CreatorInsights";
import TopPerformers from "./TopPerformers";
import EngagementStats from "./EngagementStats";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-[#1c1c1e] leading-8">
            Dashboard
          </h1>
          <p className="text-sm text-[#6e6e73] leading-5 mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="mb-6">
          <CreatorInsights
            totalCreators="5,234"
            activeCreators="1,456"
            totalDMs="8,234K"
            avgGrowth="45.2%"
          />
        </div>

        <div className="mb-6">
          <TopPerformers
            creators={[
              {
                rank: 1,
                name: "@creator_one",
                followers: "25,430",
                dailyGrowth: "+320",
                dmsSent: "1,450",
                engagementRate: "8.7%",
              },
              // ... more creators
            ]}
            categories={[
              { name: "Agency", color: "#683fbe" },
              { name: "Communication", color: "#8B5CF6" },
              // ... more categories
            ]}
          />
        </div>
        <div className="mb-6">
          <EngagementStats
            title="Engagement & Usage Stats"
            autoData={[6000, 5500, 4500, 4000, 3800, 3600, 3400, 3200, 0, 0, 0]}
            manualData={[
              2000, 1500, 1200, 1200, 1200, 1200, 1200, 1200, 0, 0, 0,
            ]}
            labels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Line Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <LineChart
              title="Creator Growth"
              subtitle="Track your creator onboarding trends over time"
              data={[10, 25, 35, 20, 45, 40, 65, 50]}
              labels={[
                "Q1 2023",
                "Q2 2023",
                "Q3 2023",
                "Q4 2023",
                "Q1 2024",
                "Q2 2024",
                "Q3 2024",
                "Q4 2024",
              ]}
              height={320}
            />
          </div>

          {/* Pie Chart - Takes 1 column */}
          <div>
            <PieChart
              title="Scheduled Posts"
              subtitle="Your carbon footprint includes direct emissions from your operations, like your buildings and vehicles."
              successPercentage={60}
              failedPercentage={40}
            />
          </div>
        </div>

    
      </div>
    </div>
  );
}
