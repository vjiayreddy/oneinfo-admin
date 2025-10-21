"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import CreateCampaignModal from "@/components/paid-collabs/CreateCampaignModal";

interface Collab {
  id: string;
  brandName: string;
  brandLogo?: string;
  collabId: string;
  category: string;
  startDate: string;
  endDate: string;
  appliedCreators: number;
  isActive: boolean;
}

interface PaidCollabManagementProps {
  collabs?: Collab[];
  onCreateCampaign?: () => void;
}

const defaultCollabs: Collab[] = [
  {
    id: "1",
    brandName: "Nykaa Beauty",
    collabId: "CLB_122",
    category: "Food & Cooking",
    startDate: "01 Aug 2025",
    endDate: "24 Aug 2025",
    appliedCreators: 15,
    isActive: true,
  },
  {
    id: "2",
    brandName: "Nykaa Beauty",
    collabId: "CLB_122",
    category: "Food & Cooking",
    startDate: "01 Aug 2025",
    endDate: "24 Aug 2025",
    appliedCreators: 15,
    isActive: true,
  },
  {
    id: "3",
    brandName: "Nykaa Beauty",
    collabId: "CLB_122",
    category: "Food & Cooking",
    startDate: "01 Aug 2025",
    endDate: "24 Aug 2025",
    appliedCreators: 15,
    isActive: true,
  },
  {
    id: "4",
    brandName: "Mamaearth",
    collabId: "CLB_123",
    category: "Beauty & Skincare",
    startDate: "05 Aug 2025",
    endDate: "28 Aug 2025",
    appliedCreators: 22,
    isActive: true,
  },
  {
    id: "5",
    brandName: "Boat",
    collabId: "CLB_124",
    category: "Technology",
    startDate: "10 Aug 2025",
    endDate: "30 Aug 2025",
    appliedCreators: 18,
    isActive: false,
  },
  {
    id: "6",
    brandName: "Sugar Cosmetics",
    collabId: "CLB_125",
    category: "Beauty & Skincare",
    startDate: "12 Aug 2025",
    endDate: "02 Sep 2025",
    appliedCreators: 30,
    isActive: true,
  },
  {
    id: "7",
    brandName: "Zomato",
    collabId: "CLB_126",
    category: "Food & Cooking",
    startDate: "15 Aug 2025",
    endDate: "05 Sep 2025",
    appliedCreators: 25,
    isActive: false,
  },
];

export default function PaidCollabManagement({
  collabs = defaultCollabs,
  onCreateCampaign,
}: PaidCollabManagementProps) {
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter collabs based on active tab
  const filteredCollabs = useMemo(() => {
    return collabs.filter((collab) => {
      return activeTab === "active" ? collab.isActive : !collab.isActive;
    });
  }, [collabs, activeTab]);

  // Define columns
  const columns = useMemo<ColumnDef<Collab>[]>(
    () => [
      {
        accessorKey: "brandName",
        header: "Brand Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-[#e8ddff] rounded-full flex-shrink-0 overflow-hidden">
              {row.original.brandLogo ? (
                <img
                  src={row.original.brandLogo}
                  alt={row.original.brandName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#683fbe] text-xs font-medium">
                  {row.original.brandName.charAt(0)}
                </div>
              )}
            </div>
            <span className="truncate">{row.original.brandName}</span>
          </div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "collabId",
        header: "Collab ID",
        cell: ({ row }) => <span className="truncate">{row.original.collabId}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <span className="truncate">{row.original.category}</span>,
        enableSorting: true,
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => <span className="truncate">{row.original.startDate}</span>,
        enableSorting: true,
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => <span className="truncate">{row.original.endDate}</span>,
        enableSorting: true,
      },
      {
        accessorKey: "appliedCreators",
        header: "Applied Creators",
        cell: ({ row }) => <span className="truncate">{row.original.appliedCreators}</span>,
        enableSorting: true,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredCollabs,
    columns,
    state: {
      sorting,
      globalFilter: searchQuery,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchQuery,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Header Section */}
      <div className="bg-white h-14 flex items-center justify-between px-[18px]">
        <div className="flex gap-9 items-center">
          {/* Title */}
          <h2 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
            Paid Collab Management
          </h2>

          {/* Tabs */}
          <div className="flex h-14 items-center">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex items-center justify-center gap-2 px-4 h-full ${
                activeTab === "active"
                  ? "border-b-2 border-[#683fbe] text-[#683fbe]"
                  : "text-[#6e6e73]"
              } text-sm font-medium leading-5 transition-colors hover:text-[#683fbe]`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`flex items-center justify-center gap-2 px-4 h-full ${
                activeTab === "inactive"
                  ? "border-b-2 border-[#683fbe] text-[#683fbe]"
                  : "text-[#6e6e73]"
              } text-sm font-medium leading-5 transition-colors hover:text-[#683fbe]`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Search and Create Button */}
        <div className="flex gap-8 items-center">
          {/* Search Input */}
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search collabs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-[rgba(217,217,217,0.4)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
            />
          </div>

          {/* Create Campaign Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#683fbe] text-white px-6 py-3 rounded-full text-[10.5px] font-medium leading-3 hover:bg-[#5632a0] transition-colors"
          >
            Create New Campaign
          </button>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Table Header */}
          <div className="bg-[#e8ddff] border border-[#eaeaea] rounded flex items-center text-xs font-normal text-[#1c1c1e] leading-[18px] mb-2.5">
            {table.getHeaderGroups().map((headerGroup) => (
              <>
                {headerGroup.headers.map((header) => (
                  <div key={header.id} className="flex-1 px-2.5 py-2.5">
                    {header.isPlaceholder ? null : (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                        className={`flex items-center gap-3 w-full ${
                          header.column.getCanSort() ? "cursor-pointer hover:text-[#683fbe]" : ""
                        }`}
                      >
                        <span className="truncate">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {header.column.getCanSort() && (
                          <div className="flex-shrink-0">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <div className="w-3 h-3 flex flex-col justify-center">
                                <ChevronUp className="w-3 h-1.5 -mb-1" />
                                <ChevronDown className="w-3 h-1.5" />
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </>
            ))}
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-2.5">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  className="bg-white rounded flex items-center text-xs font-normal text-[#1c1c1e] leading-[18px] hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="flex-1 px-2.5 py-2 truncate">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="bg-white rounded p-8 text-center text-[#6e6e73]">
                No collabs found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          {/* Page Info */}
          <div className="text-sm text-[#6e6e73] order-2 sm:order-1 text-center sm:text-left">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} results
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded border border-[#eaeaea] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#1c1c1e]" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={`flex-shrink-0 min-w-[32px] h-8 px-2 rounded text-sm font-medium transition-colors ${
                    table.getState().pagination.pageIndex === pageIndex
                      ? "bg-[#683fbe] text-white"
                      : "text-[#6e6e73] hover:bg-gray-100"
                  }`}
                >
                  {pageIndex + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded border border-[#eaeaea] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#1c1c1e]" />
            </button>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={(data) => {
          console.log("Campaign created:", data);
          if (onCreateCampaign) {
            onCreateCampaign();
          }
        }}
      />
    </div>
  );
}
