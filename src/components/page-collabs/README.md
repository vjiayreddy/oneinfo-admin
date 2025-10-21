# Paid Collab Management Components

This directory contains components for the Paid Collaboration Management section.

## Components Overview

1. **PaidCollabManagement** - Complete collaboration management table with tabs, search, sorting, and pagination

---

## PaidCollabManagement

A comprehensive table component built with **@tanstack/react-table** for managing paid brand collaborations.

### Features

- ✅ **TanStack Table** - Powered by @tanstack/react-table v8
- ✅ **Active/Inactive Tabs** - Toggle between active and inactive collaborations
- ✅ **Global Search** - Real-time search across all columns
- ✅ **Sortable Columns** - Click column headers to sort (5 sortable columns)
- ✅ **Pagination** - Navigate through large datasets
- ✅ **Responsive Design** - Horizontal scroll on mobile devices
- ✅ **Brand Logos** - Circular avatar display for brands
- ✅ **Create Campaign** - Purple action button

### Table Columns

| Column | Sortable | Width | Description |
|--------|----------|-------|-------------|
| **Brand Name** | ✅ | Flex | Brand name with logo/avatar |
| **Collab ID** | ❌ | Flex | Unique collaboration identifier |
| **Category** | ✅ | Flex | Campaign category |
| **Start Date** | ✅ | Flex | Campaign start date |
| **End Date** | ✅ | Flex | Campaign end date |
| **Applied Creators** | ✅ | Flex | Number of creators applied |

### Data Structure

```typescript
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
```

### Props

```typescript
interface PaidCollabManagementProps {
  collabs?: Collab[];
  onCreateCampaign?: () => void;
}
```

### Usage

```tsx
import { PaidCollabManagement } from "@/components/page-collabs";

export default function CollabsPage() {
  const handleCreateCampaign = () => {
    console.log("Create new campaign");
    // Navigate to campaign creation page
  };

  return (
    <div className="p-6">
      <PaidCollabManagement
        collabs={[
          {
            id: "1",
            brandName: "Nykaa Beauty",
            brandLogo: "/logos/nykaa.png",
            collabId: "CLB_122",
            category: "Beauty & Skincare",
            startDate: "01 Aug 2025",
            endDate: "24 Aug 2025",
            appliedCreators: 15,
            isActive: true
          }
        ]}
        onCreateCampaign={handleCreateCampaign}
      />
    </div>
  );
}
```

### Default Sample Data

The component includes 7 sample collaborations:
- 5 active collabs (various brands and categories)
- 2 inactive collabs
- Categories: Food & Cooking, Beauty & Skincare, Technology
- Date range: August-September 2025

### Styling

**Header:**
- Background: White (#ffffff)
- Height: 56px (3.5rem)
- Title: 18px, Medium, #1c1c1e
- Tab Active: Purple border (#683fbe), Purple text
- Tab Inactive: Gray text (#6e6e73)

**Search Input:**
- Width: 320px
- Height: 48px
- Border: rgba(217,217,217,0.4)
- Focus: Purple ring (#683fbe)

**Create Button:**
- Background: Purple (#683fbe)
- Text: White, 10.5px
- Border radius: 24px (full rounded)
- Hover: Darker purple (#5632a0)

**Table Header:**
- Background: Light purple (#e8ddff)
- Border: #eaeaea
- Text: 12px, Regular, #1c1c1e

**Table Rows:**
- Background: White
- Text: 12px, Regular, #1c1c1e
- Hover: Light gray background
- Gap: 10px between rows

**Brand Avatar:**
- Size: 24px × 24px
- Background: Light purple (#e8ddff)
- Text: Purple (#683fbe)
- Shape: Circular

**Pagination:**
- Active page: Purple background (#683fbe)
- Inactive pages: Gray text (#6e6e73)
- Arrows: Border with hover effect
- Responsive: Stacks vertically on mobile

### Responsive Behavior

**Desktop (≥ 900px):**
- Full width table
- All columns visible
- No horizontal scroll
- Horizontal pagination layout

**Mobile (< 900px):**
- Horizontal scroll enabled
- Minimum width: 900px
- All columns preserved
- Vertical pagination layout

### Tab Functionality

**Active Tab:**
- Shows only active collaborations (isActive: true)
- Purple underline indicator
- Purple text color

**Inactive Tab:**
- Shows only inactive collaborations (isActive: false)
- Purple underline when selected
- Default gray text when not selected

### Search Functionality

- **Global Filter** - Searches across all columns
- **Real-time** - Updates as you type
- **Case-insensitive** - Matches regardless of case
- **Clear state** - Managed by TanStack Table

### Sorting Features

**Sortable Columns:**
1. Brand Name
2. Category
3. Start Date
4. End Date
5. Applied Creators

**Sort Indicators:**
- Unsorted: Up/Down chevrons stacked
- Ascending: Single up chevron
- Descending: Single down chevron
- Hover: Purple color on sortable headers

**Sort Behavior:**
- Click once: Sort ascending
- Click twice: Sort descending
- Click third time: Remove sort

### Pagination

**Features:**
- 10 items per page (default)
- Page number buttons
- Previous/Next arrows
- Result count display
- Disabled state when no more pages

**Controls:**
- Previous button (left arrow)
- Page number buttons (1, 2, 3...)
- Next button (right arrow)

**Page Info:**
```
Showing 1 to 10 of 25 results
```

### Color Tokens

- **Primary Purple**: #683fbe
- **Hover Purple**: #5632a0
- **Light Purple**: #e8ddff
- **Dark Text**: #1c1c1e
- **Gray Text**: #6e6e73
- **Border**: #eaeaea
- **White**: #ffffff
- **Input Border**: rgba(217,217,217,0.4)

### Typography

- **Title**: Roboto Medium, 18px, line-height 26px
- **Tab**: Roboto Medium, 14px, line-height 20px
- **Button**: Roboto Medium, 10.5px, line-height 12px
- **Table**: Roboto Regular, 12px, line-height 18px
- **Pagination**: Roboto Medium, 14px

### TanStack Table Configuration

```typescript
const table = useReactTable({
  data: filteredCollabs,
  columns,
  state: {
    sorting,
    globalFilter: searchQuery,
  },
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
```

### Brand Logo Display

**With Logo:**
```tsx
<img src={brandLogo} alt={brandName} />
```

**Without Logo (Fallback):**
```tsx
<div className="bg-[#e8ddff] text-[#683fbe]">
  {brandName.charAt(0)}
</div>
```

### Accessibility

- Keyboard navigation on sortable headers
- Disabled states for pagination buttons
- ARIA labels (can be enhanced)
- Focus states on interactive elements

### Performance

- **Memoized Columns** - Prevent unnecessary re-renders
- **Filtered Data** - Only renders current tab's data
- **Pagination** - Renders only current page (10 items)
- **Global Search** - Efficient filtering via TanStack Table

### Future Enhancements

- [ ] Add filters (date range, category, etc.)
- [ ] Add bulk actions (select multiple rows)
- [ ] Add export functionality (CSV, Excel)
- [ ] Add campaign detail view modal
- [ ] Add edit/delete actions per row
- [ ] Add status badges (Active/Inactive)
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add empty state illustrations
- [ ] Add advanced search filters

---

## File Structure

```
page-collabs/
├── PaidCollabManagement.tsx  # Main component
├── index.ts                   # Component exports
└── README.md                  # This file
```

---

## Integration Example

```tsx
// app/(dashboard)/collabs/page.tsx
import { PaidCollabManagement } from "@/components/page-collabs";

export default function CollabsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PaidCollabManagement />
    </div>
  );
}
```

---

## Notes

- Uses **@tanstack/react-table v8** for table functionality
- Uses **lucide-react** for icons (Search, Chevron icons)
- Follows existing component patterns from CreatorInsightsTable
- Purple theme matching the admin dashboard design system
- Fully responsive with horizontal scroll
- Ready for real data integration via props
- Create Campaign button callback allows easy integration
