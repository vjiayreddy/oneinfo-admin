# Content Components

This directory contains components for the Content section of the admin dashboard.

## Components Overview

1. **ContentList** - Existing content list component
2. **GlobalContentPerformance** - Performance table with tabs for Scheduled Posts and Top Reels

---

## GlobalContentPerformance

A comprehensive content performance component with tabbed navigation showing video/reel metrics.

### Features

- ✅ **Tab Navigation** - Toggle between "Scheduled Posts" and "Top Reels"
- ✅ **Performance Table** - 9 columns of metrics
- ✅ **Video Thumbnails** - Vertical thumbnail preview (70.5px × 94px)
- ✅ **Rank Display** - Medal emojis (🥇 🥈 🥉) for top 3
- ✅ **Creator Avatars** - Circular profile pictures
- ✅ **Horizontal Scroll** - Responsive on small screens
- ✅ **View All Button** - Load more content
- ✅ **Hover Effects** - Row hover states

### Table Columns

1. **Rank** - Position with emoji (60px)
2. **Video (Thumbnail)** - Video thumbnail (118px)
3. **Caption (Preview)** - Text preview (flex)
4. **Creator Name** - Username with avatar (flex)
5. **Reach** - Total reach count (flex)
6. **Likes** - Like count (flex)
7. **Saves** - Save count (flex)
8. **Comments** - Comment count (flex)
9. **Avg Watch Time** - Watch duration (flex)

### Props

```typescript
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
```

### Usage

```tsx
import { GlobalContentPerformance } from "@/components/content";

export default function ContentPage() {
  return (
    <div className="p-6">
      <GlobalContentPerformance
        topReels={[
          {
            id: "1",
            rank: 1,
            thumbnail: "/path/to/thumbnail.jpg",
            caption: '"Summer vibes are here!"',
            creatorName: "@creator_one",
            creatorAvatar: "/path/to/avatar.jpg",
            reach: 12450,
            likes: 1020,
            saves: 210,
            comments: 88,
            avgWatchTime: "14s"
          }
        ]}
        scheduledPosts={[]}
      />
    </div>
  );
}
```

### Styling Details

**Header:**
- Background: White (#ffffff)
- Border: Bottom border (#eaeaea)
- Height: 56px (3.5rem)
- Title: 18px, Medium, #1c1c1e
- Tab Active: Purple border (#683fbe), Dark text (#1c1c1e)
- Tab Inactive: Gray text (#6e6e73)

**Table Header:**
- Background: Light purple (#e8ddff)
- Border: #eaeaea
- Text: 12px, Regular, #1c1c1e
- Padding: 10.675px

**Table Rows:**
- Background: White (#ffffff)
- Border: #eaeaea
- Height: 112px (28rem)
- Text: 12px, Regular, #1c1c1e
- Hover: Light gray background

**Thumbnail:**
- Size: 70.5px × 94px
- Background: #d9d9d9 (placeholder)
- Corner radius: Slight rounding

**Creator Avatar:**
- Size: 24px × 24px
- Background: Light purple (#e8ddff)
- Shape: Circular
- Text: Purple (#683fbe)

**Rank Emojis:**
- 1st place: 🥇
- 2nd place: 🥈
- 3rd place: 🥉
- Others: Number only

### Responsive Behavior

**Desktop (≥ 1000px):**
- Full width table
- All columns visible
- No horizontal scroll

**Tablet/Mobile (< 1000px):**
- Horizontal scroll enabled
- Minimum width: 1000px
- All columns remain readable

### Color Tokens

- **Primary Purple**: #683fbe
- **Light Purple**: #e8ddff
- **Dark Text**: #1c1c1e
- **Gray Text**: #6e6e73
- **Border**: #eaeaea
- **White**: #ffffff
- **Placeholder**: #d9d9d9

### Typography

- **Title**: Roboto Medium, 18px, line-height 26px
- **Tab**: Roboto Medium, 14px, line-height 20px
- **Table**: Roboto Regular, 12px, line-height 18px
- **Button**: Roboto Regular, 12px

### Features Breakdown

#### Tab Navigation
```tsx
// Active tab state management
const [activeTab, setActiveTab] = useState<"scheduled" | "topReels">("topReels");

// Tab switching
onClick={() => setActiveTab("topReels")}
```

#### Rank Display
```tsx
const getRankEmoji = (rank: number): string => {
  switch (rank) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return `${rank}`;
  }
};
```

#### Number Formatting
```tsx
// Format numbers with commas
{content.reach.toLocaleString()} // 12450 → 12,450
```

### Integration Example

The component is already integrated in `/app/(dashboad)/content/page.tsx`:

```tsx
import GlobalContentPerformance from "@/components/content/GlobalContentPerformance";

const ContentPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <GlobalContentPerformance />
        <ContentList />
      </div>
    </div>
  );
};
```

### Default Data

The component includes 3 sample top reels for demonstration:
- Rank 1-3 with medal emojis
- Same caption: "Summer vibes are here!"
- Same creator: @creator_one
- Metrics: 12,450 reach, 1,020 likes, 210 saves, 88 comments, 14s watch time

### Future Enhancements

- [ ] Add sorting functionality to table headers
- [ ] Add search/filter capabilities
- [ ] Add date range selector
- [ ] Add export functionality
- [ ] Add detailed view modal on row click
- [ ] Add pagination for large datasets
- [ ] Add loading states
- [ ] Add error states

---

## File Structure

```
content/
├── ContentList.tsx              # Existing content list
├── GlobalContentPerformance.tsx # New performance table
├── index.ts                     # Component exports
└── README.md                    # This file
```

---

## Notes

- The component uses Tailwind CSS for styling
- Responsive design with horizontal scroll for small screens
- Purple theme matching the admin dashboard design system
- Follows existing component patterns in the codebase
- Ready for real data integration via props
