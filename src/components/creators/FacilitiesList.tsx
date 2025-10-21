"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  assigned: string;
  sector: string;
  industry: string;
  country: string;
  address: string;
}

interface FacilitiesListProps {
  facilities?: Facility[];
}

const defaultFacilities: Facility[] = [
  {
    id: "1",
    name: "Royal Car Ltd",
    assigned: "Aman upadhyay",
    sector: "Industry",
    industry: "Manufacturing sector",
    country: "India",
    address: "Haryana, Gurgaon, Near station",
  },
  {
    id: "2",
    name: "Royal Car Ltd",
    assigned: "Aman upadhyay",
    sector: "Industry",
    industry: "Manufacturing sector",
    country: "India",
    address: "Haryana, Gurgaon, Near station",
  },
  {
    id: "3",
    name: "Royal Car Ltd",
    assigned: "Aman upadhyay",
    sector: "Industry",
    industry: "Manufacturing sector",
    country: "India",
    address: "Haryana, Gurgaon, Near station",
  },
  {
    id: "4",
    name: "Royal Car Ltd",
    assigned: "Aman upadhyay",
    sector: "Industry",
    industry: "Manufacturing sector",
    country: "India",
    address: "Haryana, Gurgaon, Near station",
  },
  {
    id: "5",
    name: "Royal Car Ltd",
    assigned: "Aman upadhyay",
    sector: "Industry",
    industry: "Manufacturing sector",
    country: "India",
    address: "Haryana, Gurgaon, Near station",
  },
  {
    id: "6",
    name: "Royal Car Ltd",
    assigned: "Aman upadhyay",
    sector: "Industry",
    industry: "Manufacturing sector",
    country: "India",
    address: "Haryana, Gurgaon, Near station",
  },
];

export default function FacilitiesList({ facilities = defaultFacilities }: FacilitiesListProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-3 h-3 text-[#717171]" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-3 h-3 text-[#717171]" />
    ) : (
      <ChevronDown className="w-3 h-3 text-[#717171]" />
    );
  };

  return (
    <div className="bg-white border border-[#eeeeee] rounded p-2.5 flex flex-col gap-2.5">
      {/* Title */}
      <h3 className="text-[15px] font-medium text-black">
        List of Facilities({facilities.length})
      </h3>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Table Header */}
          <div className="bg-neutral-50 rounded flex items-center text-[10px] text-[#717171] mb-2">
            <button
              onClick={() => handleSort("name")}
              className="flex items-center gap-1 p-2 w-[164px] hover:bg-gray-100 transition-colors"
            >
              <span>Facility Name</span>
              <SortIcon field="name" />
            </button>
            <div className="flex items-center gap-1 p-2 w-[164px]">
              <span>Assigned</span>
            </div>
            <button
              onClick={() => handleSort("sector")}
              className="flex items-center gap-1 p-2 w-[164px] hover:bg-gray-100 transition-colors"
            >
              <span>Sector</span>
              <SortIcon field="sector" />
            </button>
            <button
              onClick={() => handleSort("industry")}
              className="flex items-center gap-1 p-2 w-[164px] hover:bg-gray-100 transition-colors"
            >
              <span>Industry</span>
              <SortIcon field="industry" />
            </button>
            <button
              onClick={() => handleSort("country")}
              className="flex items-center gap-1 p-2 w-[164px] hover:bg-gray-100 transition-colors"
            >
              <span>Country</span>
              <SortIcon field="country" />
            </button>
            <button
              onClick={() => handleSort("address")}
              className="flex items-center gap-1 p-2 w-[164px] hover:bg-gray-100 transition-colors"
            >
              <span>Address</span>
              <SortIcon field="address" />
            </button>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-2">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white border border-[rgba(217,217,217,0.4)] rounded flex items-center text-[9px] text-black hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 p-2 w-[164px]">
                  <div className="w-6 h-6 bg-[#e8ddff] rounded-full flex-shrink-0" />
                  <span className="truncate">{facility.name}</span>
                </div>
                <div className="p-2 w-[164px] truncate">{facility.assigned}</div>
                <div className="p-2 w-[164px] truncate">{facility.sector}</div>
                <div className="p-2 w-[164px] truncate">{facility.industry}</div>
                <div className="p-2 w-[164px] truncate">{facility.country}</div>
                <div className="p-2 w-[164px] truncate">{facility.address}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
