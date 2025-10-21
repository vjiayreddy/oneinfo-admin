"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Collab {
  id: string;
  brandName: string;
  brandLogo: string;
  collabId: string;
  category: string;
  startDate: string;
  endDate: string;
  appliedCreators: number;
  totalCreators: number;
  status: "Active" | "In Active";
}

const mockCollabs: Collab[] = [
  {
    id: "1",
    brandName: "Nykaa Beauty",
    brandLogo: "https://via.placeholder.com/40",
    collabId: "CLB_122",
    category: "Beauty & Cosmetics",
    startDate: "2025-01-10",
    endDate: "2025-01-20",
    appliedCreators: 45,
    totalCreators: 100,
    status: "Active",
  },
  {
    id: "2",
    brandName: "Boat Lifestyle",
    brandLogo: "https://via.placeholder.com/40",
    collabId: "CLB_123",
    category: "Electronics",
    startDate: "2025-01-12",
    endDate: "2025-01-25",
    appliedCreators: 78,
    totalCreators: 150,
    status: "Active",
  },
  {
    id: "3",
    brandName: "Mamaearth",
    brandLogo: "https://via.placeholder.com/40",
    collabId: "CLB_124",
    category: "Beauty & Skincare",
    startDate: "2025-01-05",
    endDate: "2025-01-15",
    appliedCreators: 32,
    totalCreators: 80,
    status: "In Active",
  },
  {
    id: "4",
    brandName: "Zomato",
    brandLogo: "https://via.placeholder.com/40",
    collabId: "CLB_125",
    category: "Food & Beverage",
    startDate: "2025-01-15",
    endDate: "2025-02-01",
    appliedCreators: 120,
    totalCreators: 200,
    status: "Active",
  },
  {
    id: "5",
    brandName: "Myntra Fashion",
    brandLogo: "https://via.placeholder.com/40",
    collabId: "CLB_126",
    category: "Fashion & Lifestyle",
    startDate: "2025-01-08",
    endDate: "2025-01-18",
    appliedCreators: 65,
    totalCreators: 120,
    status: "Active",
  },
  {
    id: "6",
    brandName: "Swiggy Instamart",
    brandLogo: "https://via.placeholder.com/40",
    collabId: "CLB_127",
    category: "Food & Delivery",
    startDate: "2025-01-01",
    endDate: "2025-01-10",
    appliedCreators: 28,
    totalCreators: 60,
    status: "In Active",
  },
];

export default function PaidCollabsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "in-active">("active");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: "active", label: "Active", count: 4 },
    { id: "in-active", label: "In Active", count: 2 },
  ];

  // Define columns using TanStack Table
  const columns = useMemo<ColumnDef<Collab>[]>(
    () => [
      {
        accessorKey: "brandName",
        header: "Brand",
        size: 200,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">
                {row.original.brandName[0]}
              </span>
            </div>
            <span className="font-medium text-gray-900">
              {row.original.brandName}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "collabId",
        header: "Collab ID",
        size: 150,
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-purple-600">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 180,
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-900">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        size: 120,
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        size: 120,
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600">{getValue() as string}</span>
        ),
      },
      {
        id: "appliedCreators",
        header: "Applied Creators",
        size: 160,
        cell: ({ row }) => {
          return (
            <span className="text-sm text-gray-600">
              {row?.original?.appliedCreators}
            </span>
          );
        },
      },
    ],
    []
  );

  // Filter data based on search and tab
  const filteredData = useMemo(() => {
    return mockCollabs.filter((collab) => {
      const matchesSearch =
        collab.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collab.collabId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collab.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab =
        (activeTab === "active" && collab.status === "Active") ||
        (activeTab === "in-active" && collab.status === "In Active");

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Initialize table
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Fully Responsive */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            Paid Collab Management
          </h1>
          <p className="text-sm text-gray-600 mt-1 hidden sm:block">
            Manage and track all paid collaborations
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full xs:w-auto bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          size="default"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          <span className="font-medium">Add Collab</span>
        </Button>
      </div>

      {/* Search and Filters - Responsive */}
      {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
          <input
            type="text"
            placeholder="Search by brand or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="text-sm">Filters</span>
        </button>
      </div> */}

      {/* Tabs - Modern Card Style */}
      <div className="bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-3 py-2.5 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">
                {tab.id === "active" ? "Active" : "Inactive"}
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full min-w-[24px] text-center ${
                  activeTab === tab.id
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table with TanStack Table - Beautiful & Responsive */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Mobile: Show scroll hint */}
        <div className="sm:hidden px-4 py-2 bg-blue-50 border-b border-blue-100">
          <p className="text-xs text-blue-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Swipe left to see more
          </p>
        </div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <Table className="min-w-[800px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="cursor-pointer select-none font-semibold text-gray-700 h-12 px-4 sm:px-6"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex items-center gap-2 uppercase text-xs tracking-wider whitespace-nowrap">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="text-gray-400">
                          {{
                            asc: "↑",
                            desc: "↓",
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        style={{ width: cell.column.getSize() }}
                        className="px-4 py-3 sm:px-6 sm:py-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-sm font-medium">No results found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination - Responsive Design */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-200">
          {/* Results count - hidden on mobile */}
          <div className="hidden sm:block text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>
            {" "}-{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                filteredData.length
              )}
            </span>
            {" "}of{" "}
            <span className="font-semibold text-gray-900">
              {filteredData.length}
            </span>
            {" "}results
          </div>
          
          {/* Mobile: Compact info */}
          <div className="sm:hidden text-xs text-gray-600">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 px-2 sm:px-3 bg-white border-gray-300 hover:bg-gray-50"
            >
              <svg className="w-4 h-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
            {/* Page Numbers - hidden on very small screens */}
            <div className="hidden xs:flex items-center gap-1">
              {Array.from(
                { length: Math.min(table.getPageCount(), 5) },
                (_, i) => {
                  const currentPage = table.getState().pagination.pageIndex;
                  const totalPages = table.getPageCount();

                  let pageIndex;
                  if (totalPages <= 5) {
                    pageIndex = i;
                  } else if (currentPage <= 2) {
                    pageIndex = i;
                  } else if (currentPage >= totalPages - 3) {
                    pageIndex = totalPages - 5 + i;
                  } else {
                    pageIndex = currentPage - 2 + i;
                  }

                  const isActive = table.getState().pagination.pageIndex === pageIndex;

                  return (
                    <Button
                      key={pageIndex}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => table.setPageIndex(pageIndex)}
                      className={`h-9 w-9 ${
                        isActive
                          ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageIndex + 1}
                    </Button>
                  );
                }
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 px-2 sm:px-3 bg-white border-gray-300 hover:bg-gray-50"
            >
              <span className="hidden sm:inline">Next</span>
              <svg className="w-4 h-4 sm:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Add Collab Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Collab</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new paid collaboration.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4">
            {/* Brand Name */}
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name *</Label>
              <Input
                id="brandName"
                placeholder="Enter brand name"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion & Lifestyle</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="skincare">Beauty & Skincare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                />
              </div>
            </div>

            {/* Total Creators */}
            <div className="space-y-2">
              <Label htmlFor="totalCreators">Total Creators Required *</Label>
              <Input
                id="totalCreators"
                type="number"
                placeholder="Enter number of creators needed"
                min="1"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter collab description..."
                rows={3}
              />
            </div>
          </form>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Collab
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
