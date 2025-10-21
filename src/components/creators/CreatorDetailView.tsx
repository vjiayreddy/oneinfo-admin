"use client";

import CreatorProfileHeader from "./CreatorProfileHeader";
import FacilitiesList from "./FacilitiesList";
import { X } from "lucide-react";

interface Creator {
  id: string;
  name: string;
  avatar?: string;
  category: string;
  followers: string;
  followerGrowth: string;
  commentReplies: number;
  dmReplies: number;
  isActive: boolean;
  // Additional details
  username?: string;
  email?: string;
  instagramUserId?: string;
  phone?: string;
  joinedDate?: string;
  lastActive?: string;
}

interface CreatorDetailViewProps {
  creator: Creator;
  onClose: () => void;
  onBlock?: () => void;
}

export default function CreatorDetailView({
  creator,
  onClose,
  onBlock,
}: CreatorDetailViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-gray-900">Creator Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-5">
          {/* Profile Header */}
          <CreatorProfileHeader
            name={creator.name}
            category={creator.category}
            followers={creator.followers}
            username={creator.username || "@" + creator.name.toLowerCase().replace(/\s/g, "_")}
            email={creator.email || creator.name.toLowerCase().replace(/\s/g, ".") + "@example.com"}
            instagramUserId={creator.instagramUserId || "456782398"}
            phone={creator.phone || "+91 98765 43210"}
            joinedDate={creator.joinedDate || "12 July 2024"}
            lastActive={creator.lastActive || "6 Oct 2025, 8:45 PM"}
            avatar={creator.avatar}
            onBlock={onBlock}
          />

          {/* Facilities List */}
          <FacilitiesList />
        </div>
      </div>
    </div>
  );
}
