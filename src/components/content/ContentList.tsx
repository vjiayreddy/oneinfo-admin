"use client";

import { useState } from "react";

interface ContentItem {
  id: string;
  title: string;
  creator: string;
  category: string;
  status: "Published" | "Draft" | "Scheduled";
  views: string;
  engagement: string;
  date: string;
}

const ContentList = () => {
  const [activeTab, setActiveTab] = useState<"all" | "scheduled" | "reels">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "How to Build a Successful Social Media Strategy",
      creator: "@creator_one",
      category: "Marketing",
      status: "Published",
      views: "12.5K",
      engagement: "8.5%",
      date: "Oct 10, 2024",
    },
    {
      id: "2",
      title: "Top 10 Content Creation Tips for Beginners",
      creator: "@creator_two",
      category: "Tutorial",
      status: "Published",
      views: "9.8K",
      engagement: "7.2%",
      date: "Oct 09, 2024",
    },
    {
      id: "3",
      title: "The Future of Digital Marketing in 2025",
      creator: "@creator_three",
      category: "Marketing",
      status: "Draft",
      views: "-",
      engagement: "-",
      date: "Oct 08, 2024",
    },
    {
      id: "4",
      title: "Mastering Video Editing: A Complete Guide",
      creator: "@creator_one",
      category: "Tutorial",
      status: "Scheduled",
      views: "-",
      engagement: "-",
      date: "Oct 12, 2024",
    },
    {
      id: "5",
      title: "Brand Collaboration Best Practices",
      creator: "@creator_four",
      category: "Business",
      status: "Published",
      views: "15.2K",
      engagement: "9.1%",
      date: "Oct 07, 2024",
    },
  ];

  const scheduledPosts: ContentItem[] = [
    {
      id: "s1",
      title: "Mastering Video Editing: A Complete Guide",
      creator: "@creator_one",
      category: "Tutorial",
      status: "Scheduled",
      views: "-",
      engagement: "-",
      date: "Oct 12, 2024",
    },
    {
      id: "s2",
      title: "Social Media Trends for 2025",
      creator: "@creator_three",
      category: "Marketing",
      status: "Scheduled",
      views: "-",
      engagement: "-",
      date: "Oct 15, 2024",
    },
    {
      id: "s3",
      title: "Building Your Personal Brand Online",
      creator: "@creator_two",
      category: "Business",
      status: "Scheduled",
      views: "-",
      engagement: "-",
      date: "Oct 18, 2024",
    },
  ];

  const topReels: ContentItem[] = [
    {
      id: "r1",
      title: "Quick Marketing Tips - 60 Second Reel",
      creator: "@creator_one",
      category: "Marketing",
      status: "Published",
      views: "45.2K",
      engagement: "12.8%",
      date: "Oct 09, 2024",
    },
    {
      id: "r2",
      title: "Behind the Scenes: Content Creation",
      creator: "@creator_four",
      category: "Lifestyle",
      status: "Published",
      views: "38.7K",
      engagement: "11.5%",
      date: "Oct 08, 2024",
    },
    {
      id: "r3",
      title: "5 Tools Every Creator Needs",
      creator: "@creator_two",
      category: "Tutorial",
      status: "Published",
      views: "52.1K",
      engagement: "14.2%",
      date: "Oct 07, 2024",
    },
    {
      id: "r4",
      title: "Day in the Life of a Content Creator",
      creator: "@creator_three",
      category: "Lifestyle",
      status: "Published",
      views: "41.3K",
      engagement: "10.9%",
      date: "Oct 06, 2024",
    },
  ];

  const categories = ["All", "Marketing", "Tutorial", "Business", "Lifestyle"];
  const statuses = ["All", "Published", "Draft", "Scheduled"];

  // Filter content based on active tab
  const getDisplayedContent = () => {
    switch (activeTab) {
      case "scheduled":
        return scheduledPosts;
      case "reels":
        return topReels;
      default:
        return contentItems;
    }
  };

  const displayedContent = getDisplayedContent();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Manage and monitor all your content in one place
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Content
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex gap-4 sm:gap-8 min-w-max" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === "all"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Content
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === "all"
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-600"
            }`}>
              {contentItems.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("scheduled")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === "scheduled"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Scheduled Posts
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === "scheduled"
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-600"
            }`}>
              {scheduledPosts.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("reels")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === "reels"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Top Reels
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === "reels"
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-600"
            }`}>
              {topReels.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Content
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-thin">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Content
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Creator
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Views
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Engagement
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Date
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-xs">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-purple-600 font-medium">
                      {item.creator}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{item.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {item.engagement}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-200 max-h-[600px] overflow-y-auto scrollbar-thin">
          {displayedContent.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-gray-900 flex-1">
                    {item.title}
                  </h3>
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-600">Creator:</span>
                    <span className="ml-1 text-purple-600 font-medium">
                      {item.creator}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-1 text-gray-900">{item.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Views:</span>
                    <span className="ml-1 text-gray-900">{item.views}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Engagement:</span>
                    <span className="ml-1 text-gray-900 font-medium">
                      {item.engagement}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-600">{item.date}</span>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1-{displayedContent.length}</span> of{" "}
            <span className="font-medium">{displayedContent.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
