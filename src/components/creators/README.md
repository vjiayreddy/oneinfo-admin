# Creators Components

This directory contains components for the Creators section of the admin dashboard.

## Components Overview

1. **CreatorInsightsTable** - Main table with search, tabs, sorting, and pagination
2. **CreatorDetailView** - Modal that shows detailed creator information
3. **CreatorProfileHeader** - Creator profile section with personal details
4. **FacilitiesList** - Table showing list of facilities assigned to creator

---

### CreatorInsightsTable

A comprehensive table component built with **@tanstack/react-table** for displaying creator insights with search, tabs, sorting, and pagination.

**Features:**
- ✅ **TanStack Table** - Powered by @tanstack/react-table v8
- ✅ **Active/Inactive Tabs** - Toggle between active and inactive creators
- ✅ **Global Search** - Real-time search across all columns
- ✅ **Sortable Columns** - Click column headers to sort (ascending/descending)
- ✅ **Pagination** - 10 items per page with page navigation
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Purple Theme** - Matches brand colors (#683fbe)
- ✅ **Interactive UI** - Hover effects and smooth transitions

**Columns:**
- Creator Name (with avatar)
- Category
- Followers
- Follower Growth
- Comment Replies
- DM Replies

**Props:**
```typescript
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
}

interface CreatorInsightsTableProps {
  creators?: Creator[];
}
```

**Usage:**
```tsx
import { CreatorInsightsTable } from "@/components/creators";

export default function Page() {
  return (
    <div className="p-6">
      <CreatorInsightsTable 
        creators={[
          {
            id: "1",
            name: "@creator_one",
            category: "Food & Cooking",
            followers: "25,430",
            followerGrowth: "+320",
            commentReplies: 1450,
            dmReplies: 15,
            isActive: true
          }
        ]}
      />
    </div>
  );
}
```

**Sorting:**
- Click any column header to sort
- First click: ascending order
- Second click: descending order
- Managed by TanStack Table's `getSortedRowModel`

**Tabs:**
- **Active**: Shows creators where `isActive: true`
- **Inactive**: Shows creators where `isActive: false`

**Search:**
- Global search across all table data
- Real-time filtering using `getFilteredRowModel`
- Case-insensitive

**Pagination:**
- 10 creators per page (configurable)
- Previous/Next navigation buttons
- Numbered page buttons
- Shows current range (e.g., "Showing 1 to 10 of 12 creators")
- Powered by `getPaginationRowModel`

## TanStack Table Features Used

- **getCoreRowModel** - Base table functionality
- **getSortedRowModel** - Column sorting
- **getFilteredRowModel** - Global search filtering
- **getPaginationRowModel** - Pagination controls
- **flexRender** - Flexible cell rendering
- **Column Definitions** - Type-safe column configuration

## Design System

**Colors:**
- Primary: `#683fbe` (Purple)
- Background: `#e8ddff` (Light Purple)
- Text: `#1c1c1e` (Dark)
- Sub Text: `#6e6e73` (Gray)
- Border: `#eaeaea` (Light Gray)

**Typography:**
- Title: 18px, Medium (Roboto)
- Body: 14px, Medium (Roboto)
- Table Text: 12px, Regular (Roboto)

---

### CreatorDetailView

Modal component that displays comprehensive creator information when a creator row is clicked.

**Features:**
- ✅ **Full-screen Modal** - Overlay with centered content
- ✅ **Scrollable Content** - Max height with overflow scroll
- ✅ **Close Button** - X icon in top-right corner
- ✅ **Profile Header** - Complete creator information
- ✅ **Facilities List** - Shows assigned facilities
- ✅ **Block Action** - Red block button

**Props:**
```typescript
interface CreatorDetailViewProps {
  creator: Creator;
  onClose: () => void;
  onBlock?: () => void;
}
```

**Usage:**
```tsx
{selectedCreator && (
  <CreatorDetailView
    creator={selectedCreator}
    onClose={() => setSelectedCreator(null)}
    onBlock={() => handleBlock(selectedCreator.id)}
  />
)}
```

**Auto-opens when:** User clicks any row in CreatorInsightsTable

---

### CreatorProfileHeader

Displays detailed creator profile information in a card layout.

**Features:**
- ✅ **Avatar Display** - Circular profile picture or initials
- ✅ **Block Button** - Red action button in header
- ✅ **Grid Layout** - 5 columns of information
- ✅ **Labeled Fields** - Small gray labels with black values

**Information Displayed:**
- Profile Picture
- Category
- Followers
- Username
- Email
- Instagram User ID
- Phone
- Joined Date
- Last Active

**Props:**
```typescript
interface CreatorProfileHeaderProps {
  name: string;
  category: string;
  followers: string;
  username: string;
  email: string;
  instagramUserId: string;
  phone: string;
  joinedDate: string;
  lastActive: string;
  avatar?: string;
  onBlock?: () => void;
}
```

**Styling:**
- White background with border
- Labels: 9px, gray (#787878)
- Values: 10px, black
- Block button: Red (#e66464) on light red background (#ffefef)

---

### FacilitiesList

Table component showing facilities assigned to a creator.

**Features:**
- ✅ **Sortable Columns** - Click headers to sort
- ✅ **Horizontal Scroll** - Responsive on small screens
- ✅ **Count Display** - Shows total number of facilities
- ✅ **6 Columns** - Facility Name, Assigned, Sector, Industry, Country, Address
- ✅ **Avatar Icons** - Circular icons for each facility

**Columns:**
1. Facility Name (with icon)
2. Assigned (person name)
3. Sector
4. Industry
5. Country
6. Address

**Props:**
```typescript
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
```

**Usage:**
```tsx
<FacilitiesList
  facilities={[
    {
      id: "1",
      name: "Royal Car Ltd",
      assigned: "Aman Upadhyay",
      sector: "Industry",
      industry: "Manufacturing sector",
      country: "India",
      address: "Haryana, Gurgaon, Near station"
    }
  ]}
/>
```

**Styling:**
- Header: Neutral gray background (#f5f5f5)
- Text: 9-10px
- Rows: White with light border
- Hover: Gray background

---

## User Flow

1. User views **CreatorInsightsTable** with all creators
2. User clicks on any creator row
3. **CreatorDetailView** modal opens
4. Modal shows:
   - **CreatorProfileHeader** with personal info
   - **FacilitiesList** with assigned facilities
5. User can:
   - View all details
   - Click "Block" button
   - Close modal with X button

## Integration Example

```tsx
import { CreatorInsightsTable } from "@/components/creators";

export default function CreatorsPage() {
  return (
    <div className="p-6">
      <CreatorInsightsTable />
    </div>
  );
}
```

The table automatically handles:
- Modal opening on row click
- Modal closing
- Block action callbacks

---
