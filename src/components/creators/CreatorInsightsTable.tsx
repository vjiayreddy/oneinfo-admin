"use client";

import { useState, useMemo, useEffect, Fragment } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLazyQuery } from "@apollo/client/react";
import CreatorDetailView from "./CreatorDetailView";
import { GET_ALL_CREATORS } from "@/graphql/queries";
import { 
  Creator as APICreator, 
  GetAllCreatorsResponse, 
  GetAllCreatorsVariables 
} from "@/graphql/types";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";

// Transform API Creator to Table Creator format
interface TableCreator {
  id: string;
  name: string;
  avatar?: string;
  category: string;
  followers: string;
  followerGrowth: string;
  commentReplies: number;
  dmReplies: number;
  isActive: boolean;
}

export default function CreatorInsightsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL params
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const searchFromUrl = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCreator, setSelectedCreator] = useState<TableCreator | null>(null);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const pageSize = 50;

  // Update URL when page or search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (searchTerm) params.set("search", searchTerm);
    
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [currentPage, searchTerm, router]);

  // Use Apollo's useLazyQuery hook for manual query execution
  const [fetchCreators, { data, loading, error }] = useLazyQuery<GetAllCreatorsResponse, GetAllCreatorsVariables>(
    GET_ALL_CREATORS,
    {
      fetchPolicy: "network-only",
    }
  );

  // Fetch creators when page or search term changes
  useEffect(() => {
    fetchCreators({
      variables: {
        page: currentPage,
        limit: pageSize,
        filters: {
          searchTerm: searchTerm || null,
        },
      },
    });
  }, [currentPage, searchTerm, pageSize, fetchCreators]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Transform API creators to table format
  const transformedCreators = useMemo((): TableCreator[] => {
    if (!data?.getAllCreators?.data) return [];

    return data.getAllCreators.data.map((creator: APICreator): TableCreator => ({
      id: creator._id,
      name: creator.name,
      avatar: creator.profilePic,
      category: creator.contentCategories?.[0]?.contentCategoryName || "N/A",
      followers: creator.followersCount.toLocaleString(),
      followerGrowth: "+0", // Not available in API
      commentReplies: 0, // Not available in API
      dmReplies: 0, // Not available in API
      isActive: !creator.isBlocked,
    }));
  }, [data]);

  // Filter creators based on active tab
  const filteredCreators = useMemo(() => {
    return transformedCreators.filter((creator) => {
      return activeTab === "active" ? creator.isActive : !creator.isActive;
    });
  }, [transformedCreators, activeTab]);

  // Define columns
  const columns = useMemo<ColumnDef<TableCreator>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Creator Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-[#e8ddff] rounded-full flex-shrink-0" />
            <span className="truncate">{row.original.name}</span>
          </div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "category",
        header: "Category",
        enableSorting: true,
      },
      {
        accessorKey: "followers",
        header: "Followers",
        enableSorting: true,
      },
      {
        accessorKey: "followerGrowth",
        header: "Follower Growth",
        enableSorting: true,
      },
      {
        accessorKey: "commentReplies",
        header: "Comment Replies",
        cell: ({ row }) => row.original.commentReplies.toLocaleString(),
        enableSorting: true,
      },
      {
        accessorKey: "dmReplies",
        header: "DM Replies",
        enableSorting: true,
      },
    ],
    []
  );

  // Calculate total pages for server-side pagination
  const totalCount = data?.getAllCreators?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Initialize table (without client-side pagination)
  const table = useReactTable({
    data: filteredCreators,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true, // Disable client-side pagination
    pageCount: totalPages,
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="bg-white h-14 flex items-center justify-between px-[18px]">
        <div className="flex items-center gap-9">
          {/* Title */}
          <h2 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
            Creator Insights
          </h2>

          {/* Tabs */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-4 text-sm font-medium leading-5 border-b-2 transition-colors ${
                activeTab === "active"
                  ? "text-[#683fbe] border-[#683fbe]"
                  : "text-[#6e6e73] border-transparent"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-4 py-4 text-sm font-medium leading-5 border-b-2 transition-colors ${
                activeTab === "inactive"
                  ? "text-[#683fbe] border-[#683fbe]"
                  : "text-[#6e6e73] border-transparent"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 border border-[rgba(217,217,217,0.4)] rounded-md text-sm focus:outline-none focus:border-[#683fbe]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-2.5">
        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="bg-[#e8ddff] border border-[#eaeaea] rounded flex items-center text-xs font-normal text-[#1c1c1e] leading-[18px] mb-2.5">
          {table.getHeaderGroups().map((headerGroup) => (
            <Fragment key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <div key={header.id} className="flex-1">
                  {header.isPlaceholder ? null : (
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="w-full flex items-center gap-3 p-2.5 hover:bg-[#d8cdff] transition-colors"
                    >
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "asc" ? (
                          <ChevronUp className="w-3 h-3 text-[#683fbe]" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-[#683fbe]" />
                        )
                      ) : (
                        <ChevronUp className="w-3 h-3 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
            </div>

            {/* Table Rows */}
            <div className="flex flex-col gap-2.5">
              {loading ? (
                <div className="bg-white rounded p-8 text-center text-[#6e6e73]">
                  Loading creators...
                </div>
              ) : error ? (
                <div className="bg-white rounded p-8 text-center text-red-600">
                  Error loading creators: {error?.message || "An error occurred"}
                </div>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <div
                    key={row.id}
                    onClick={() => setSelectedCreator(row.original)}
                    className="bg-white rounded flex items-center text-xs font-normal text-[#1c1c1e] leading-[18px] hover:bg-gray-50 transition-colors cursor-pointer"
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
                  No creators found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <p className="text-sm text-[#6e6e73] text-center sm:text-left">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, totalCount)} of {totalCount} creators
            </p>
          </div>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="p-2 rounded border border-[#eaeaea] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#1c1c1e]" />
            </button>

            <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                // Show first 10 pages or pages around current page
                let pageNum;
                if (totalPages <= 10) {
                  pageNum = i + 1;
                } else if (currentPage <= 5) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 4) {
                  pageNum = totalPages - 9 + i;
                } else {
                  pageNum = currentPage - 4 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    disabled={loading}
                    className={`min-w-[32px] h-8 px-2 rounded text-sm font-medium transition-colors flex-shrink-0 ${
                      currentPage === pageNum
                        ? "bg-[#683fbe] text-white"
                        : "border border-[#eaeaea] text-[#1c1c1e] hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || loading}
              className="p-2 rounded border border-[#eaeaea] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#1c1c1e]" />
            </button>
          </div>
        </div>
      )}

      {/* Creator Detail View Modal */}
      {selectedCreator && (
        <CreatorDetailView
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          onBlock={() => {
            // Handle block action
            console.log("Block creator:", selectedCreator.id);
            setSelectedCreator(null);
          }}
        />
      )}
    </div>
  );
}
