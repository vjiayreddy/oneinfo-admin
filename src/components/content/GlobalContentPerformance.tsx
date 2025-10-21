"use client";

import { useState } from "react";

interface ContentPerformance {
  id: string;
  rank: number;
  thumbnail: string;
  caption: string;
  creatorName: string;
  creatorAvatar?: string;
  reach: number;
  likes: number;
  saves: number;
  comments: number;
  avgWatchTime: string;
}

interface GlobalContentPerformanceProps {
  scheduledPosts?: ContentPerformance[];
  topReels?: ContentPerformance[];
}

const defaultTopReels: ContentPerformance[] = [
  {
    id: "1",
    rank: 1,
    thumbnail: "",
    caption: '"Summer vibes are here!"',
    creatorName: "@creator_one",
    reach: 12450,
    likes: 1020,
    saves: 210,
    comments: 88,
    avgWatchTime: "14s",
  },
  {
    id: "2",
    rank: 2,
    thumbnail: "",
    caption: '"Summer vibes are here!"',
    creatorName: "@creator_one",
    reach: 12450,
    likes: 1020,
    saves: 210,
    comments: 88,
    avgWatchTime: "14s",
  },
  {
    id: "3",
    rank: 3,
    thumbnail: "",
    caption: '"Summer vibes are here!"',
    creatorName: "@creator_one",
    reach: 12450,
    likes: 1020,
    saves: 210,
    comments: 88,
    avgWatchTime: "14s",
  },
];

const getRankEmoji = (rank: number): string => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return `${rank}`;
  }
};

export default function GlobalContentPerformance({
  scheduledPosts = [],
  topReels = defaultTopReels,
}: GlobalContentPerformanceProps) {
  const [activeTab, setActiveTab] = useState<"scheduled" | "topReels">("topReels");

  const currentData = activeTab === "scheduled" ? scheduledPosts : topReels;

  return (
    <div className="flex flex-col gap-5">
      {/* Header with Tabs */}
      <div className="bg-white border-b border-[#eaeaea] flex items-center justify-between px-[18px] py-0 h-14">
        <div className="flex gap-9 items-center">
          {/* Title */}
          <h2 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
            Global Content Performance
          </h2>

          {/* Tabs */}
          <div className="flex h-14 items-center">
            <button
              onClick={() => setActiveTab("scheduled")}
              className={`flex items-center justify-center gap-2 px-4 h-full ${
                activeTab === "scheduled"
                  ? "border-b-2 border-[#683fbe] text-[#1c1c1e]"
                  : "text-[#6e6e73]"
              } text-sm font-medium leading-5 transition-colors hover:text-[#1c1c1e]`}
            >
              Scheduled Posts
            </button>
            <button
              onClick={() => setActiveTab("topReels")}
              className={`flex items-center justify-center gap-2 px-4 h-full ${
                activeTab === "topReels"
                  ? "border-b-2 border-[#683fbe] text-[#1c1c1e]"
                  : "text-[#6e6e73]"
              } text-sm font-medium leading-5 transition-colors hover:text-[#1c1c1e]`}
            >
              Top Reels
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="h-full flex items-center">
          <div className="w-px h-6 bg-[#eaeaea]" />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex flex-col items-end gap-2.5 w-full">
        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto w-full">
          <div className="min-w-[1000px]">
            {/* Table Header */}
            <div className="bg-[#e8ddff] border border-[#eaeaea] rounded flex items-start text-xs font-normal text-[#1c1c1e] leading-[18px] mb-2.5">
              <div className="w-[60px] px-2.5 py-2.5">
                <p className="truncate">Rank</p>
              </div>
              <div className="w-[118px] px-2.5 py-2.5">
                <p className="truncate">Video (Thumbnail)</p>
              </div>
              <div className="flex-1 px-2.5 py-2.5">
                <p className="truncate">Caption (Preview)</p>
              </div>
              <div className="flex-1 px-2.5 py-2.5">
                <p className="truncate">Creator Name</p>
              </div>
              <div className="flex-1 px-2.5 py-2.5">
                <p className="truncate">Reach</p>
              </div>
              <div className="flex-1 px-2.5 py-2.5">
                <p className="truncate">Likes</p>
              </div>
              <div className="flex-1 px-2.5 py-2.5">
                <p className="truncate">Saves</p>
              </div>
              <div className="flex-1 px-2.5 py-2.5">
                <p className="truncate">Comments</p>
              </div>
              <div className="flex-1 px-2.5 py-2.5">
                <p className="truncate">Avg Watch Time</p>
              </div>
            </div>

            {/* Table Rows */}
            {currentData.length > 0 ? (
              currentData.map((content) => (
                <div
                  key={content.id}
                  className="bg-white border border-[#eaeaea] rounded flex items-center h-28 text-xs font-normal text-[#1c1c1e] leading-[18px] mb-2.5 hover:bg-gray-50 transition-colors"
                >
                  {/* Rank */}
                  <div className="w-[60px] px-2.5 py-2">
                    <p className="truncate">
                      {getRankEmoji(content.rank)} {content.rank}
                    </p>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-[118px] px-2.5 py-2 flex items-center">
                    <div className="w-[70.5px] h-[94px] bg-[#d9d9d9] rounded overflow-hidden">
                      {content.thumbnail ? (
                        <img
                          src={content.thumbnail}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="flex-1 px-2.5 py-2">
                    <p className="truncate">{content.caption}</p>
                  </div>

                  {/* Creator Name */}
                  <div className="flex-1 px-2.5 py-2 flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-[#e8ddff] rounded-full flex-shrink-0 overflow-hidden">
                      {content.creatorAvatar ? (
                        <img
                          src={content.creatorAvatar}
                          alt={content.creatorName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#683fbe] text-xs font-medium">
                          {content.creatorName.charAt(1)}
                        </div>
                      )}
                    </div>
                    <p className="truncate">{content.creatorName}</p>
                  </div>

                  {/* Reach */}
                  <div className="flex-1 px-2.5 py-2">
                    <p className="truncate">{content.reach.toLocaleString()}</p>
                  </div>

                  {/* Likes */}
                  <div className="flex-1 px-2.5 py-2">
                    <p className="truncate">{content.likes.toLocaleString()}</p>
                  </div>

                  {/* Saves */}
                  <div className="flex-1 px-2.5 py-2">
                    <p className="truncate">{content.saves.toLocaleString()}</p>
                  </div>

                  {/* Comments */}
                  <div className="flex-1 px-2.5 py-2">
                    <p className="truncate">{content.comments.toLocaleString()}</p>
                  </div>

                  {/* Avg Watch Time */}
                  <div className="flex-1 px-2.5 py-2">
                    <p className="truncate">{content.avgWatchTime}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-[#eaeaea] rounded p-8 text-center text-[#6e6e73]">
                No content available
              </div>
            )}
          </div>
        </div>

        {/* View All Button */}
        <button className="px-4 py-2 rounded-full text-xs font-normal text-[#6e6e73] hover:bg-gray-100 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
}
