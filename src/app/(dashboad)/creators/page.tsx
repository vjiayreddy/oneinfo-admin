"use client";

import { useState } from "react";
import CreatorsList from "@/components/creators/CreatorsList";

// Mock data for creators
const creatorsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    category: "Fashion",
    followers: "125K",
    engagement: "4.8%",
    status: "Active",
    joinedDate: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    category: "Technology",
    followers: "89K",
    engagement: "5.2%",
    status: "Active",
    joinedDate: "Feb 20, 2024",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    category: "Lifestyle",
    followers: "256K",
    engagement: "6.1%",
    status: "Active",
    joinedDate: "Dec 10, 2023",
  },
  {
    id: 4,
    name: "David Martinez",
    email: "d.martinez@example.com",
    category: "Fitness",
    followers: "178K",
    engagement: "5.5%",
    status: "Pending",
    joinedDate: "Mar 5, 2024",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    category: "Beauty",
    followers: "312K",
    engagement: "7.2%",
    status: "Active",
    joinedDate: "Nov 8, 2023",
  },
];

export default function CreatorsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Creators</h1>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* <button className="flex-1 lg:flex-none px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[100px]">
                Export
              </button>
              <button className="flex-1 lg:flex-none px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap min-w-[130px]">
                + Add Creator
              </button> */}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 border-b border-gray-200 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "all"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              All Creators
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "active"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`pb-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "pending"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`pb-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "inactive"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1 md:max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search creators by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-11 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
              <svg
                className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button className="px-5 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm min-w-[120px]">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
          </button>
        </div>

        {/* Creators List */}
        <CreatorsList creators={creatorsData} />
      </main>
    </div>
  );
}
