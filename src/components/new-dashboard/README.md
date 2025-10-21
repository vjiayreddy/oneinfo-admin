# Dashboard Components

A comprehensive dashboard component library built with React, TypeScript, and Chart.js.

## 📦 Components

### Dashboard.tsx
The main dashboard layout component that brings everything together.

**Usage:**
```tsx
import { Dashboard } from "@/components/new-dashboard";

export default function DashboardPage() {
  return <Dashboard />;
}
```

---

### Sidebar.tsx
Navigation sidebar with logo and menu items.

**Features:**
- ✅ Logo with company branding
- ✅ Active state highlighting
- ✅ Icon-based navigation
- ✅ Responsive design

**Props:** None (uses Next.js router for active states)

**Navigation Items:**
- Dashboard
- Creators
- Content
- Paid Collabs
- Settings

---

### Header.tsx
Top header bar with search, notifications, and user profile.

**Props:**
```typescript
interface HeaderProps {
  userName?: string;      // Default: "Rahul Kumar"
  userAvatar?: string;    // Optional avatar URL
  userRole?: string;      // Default: "Admin"
}
```

**Features:**
- ✅ Search bar with icon
- ✅ Notification bell with badge
- ✅ User profile dropdown
- ✅ Avatar with fallback initials

**Usage:**
```tsx
<Header 
  userName="John Doe" 
  userRole="Manager" 
  userAvatar="/path/to/avatar.jpg"
/>
```

---

### StatsCard.tsx
Reusable metric/statistics card component.

**Props:**
```typescript
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;                          // e.g., "+12.5%"
  changeType?: "increase" | "decrease" | "neutral";
  icon?: LucideIcon;
  bgColor?: string;                         // Tailwind class
  iconColor?: string;                       // Tailwind class
}
```

**Features:**
- ✅ Custom icons from lucide-react
- ✅ Color-coded change indicators
- ✅ Flexible styling options

**Usage:**
```tsx
import { Users } from "lucide-react";

<StatsCard
  title="Total Creators"
  value="1,234"
  change="+12.5%"
  changeType="increase"
  icon={Users}
  bgColor="bg-[#e8ddff]"
  iconColor="text-[#683fbe]"
/>
```

---

### LineChart.tsx
Line chart component using Chart.js for trend visualization.

**Props:**
```typescript
interface LineChartProps {
  title?: string;
  subtitle?: string;
  data?: number[];
  labels?: string[];
  height?: number;        // Default: 300
}
```

**Features:**
- ✅ Smooth curved lines
- ✅ Area fill with gradient
- ✅ Interactive tooltips
- ✅ Responsive design
- ✅ Custom styling

**Usage:**
```tsx
<LineChart
  title="Creator Growth"
  subtitle="Track your creator onboarding trends"
  data={[10, 25, 35, 20, 45, 40, 65, 50]}
  labels={["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"]}
  height={320}
/>
```

---

### PieChart.tsx
Doughnut chart component using Chart.js for percentage visualization.

**Props:**
```typescript
interface PieChartProps {
  title?: string;
  subtitle?: string;
  successPercentage?: number;  // Default: 60
  failedPercentage?: number;   // Default: 40
}
```

**Features:**
- ✅ Doughnut style with center cutout
- ✅ Custom color scheme (purple theme)
- ✅ Interactive tooltips
- ✅ Legend with percentages

**Usage:**
```tsx
<PieChart
  title="Scheduled Posts"
  subtitle="Track your post scheduling success rate"
  successPercentage={60}
  failedPercentage={40}
/>
```

---

### CreatorInsights.tsx
Creator statistics overview component with four metric cards.

**Props:**
```typescript
interface CreatorInsightsProps {
  totalCreators?: string;   // Default: "3,434"
  activeCreators?: string;  // Default: "3,434"
  totalDMs?: string;        // Default: "3,434K"
  avgGrowth?: string;       // Default: "34.54%"
}
```

**Features:**
- ✅ Four responsive stat cards
- ✅ Purple theme matching brand colors
- ✅ Trend indicators (down arrows)
- ✅ Decorative background waves
- ✅ Mobile-responsive grid layout

**Usage:**
```tsx
<CreatorInsights
  totalCreators="5,234"
  activeCreators="1,456"
  totalDMs="8,234K"
  avgGrowth="45.2%"
/>
```

---

### TopPerformers.tsx
Combined component showing top performing creators table and top categories pie chart.

**Props:**
```typescript
interface Creator {
  rank: number;
  name: string;
  avatar?: string;
  followers: string;
  dailyGrowth: string;
  dmsSent: string;
  engagementRate: string;
}

interface Category {
  name: string;
  color: string;
}

interface TopPerformersProps {
  creators?: Creator[];
  categories?: Category[];
}
```

**Features:**
- ✅ **Data Table** with rank, name, followers, growth metrics
- ✅ **Medal Emojis** for top 3 performers (🥇🥈🥉)
- ✅ **Doughnut Chart** showing category distribution
- ✅ **Color-coded Legend** for categories
- ✅ **Responsive Design** with horizontal scroll on mobile
- ✅ **Purple Theme** matching brand colors

**Table Columns:**
- Rank (with medal emojis)
- Creator Name (with avatar)
- Followers
- Daily Growth
- Auto DMs Sent
- Engagement Rate

**Usage:**
```tsx
<TopPerformers
  creators={[
    {
      rank: 1,
      name: "@creator_one",
      followers: "25,430",
      dailyGrowth: "+320",
      dmsSent: "1,450",
      engagementRate: "8.7%"
    }
  ]}
  categories={[
    { name: "Agency", color: "#683fbe" },
    { name: "Communication", color: "#8B5CF6" }
  ]}
/>
```

---

### EngagementStats.tsx
Stacked bar chart component showing Auto vs Manual DM engagement statistics.

**Props:**
```typescript
interface EngagementStatsProps {
  title?: string;         // Default: "Engagement & Usage Stats"
  autoData?: number[];    // Auto DMs data for each month
  manualData?: number[];  // Manual DMs data for each month
  labels?: string[];      // Month labels
}
```

**Features:**
- ✅ **Stacked Bar Chart** using Chart.js
- ✅ **Two Data Series**: Auto (light purple) and Manual (dark purple)
- ✅ **Y-axis Label**: "Daily Auto DMs" with rotated text
- ✅ **Custom Legend** in header area
- ✅ **K-notation** for thousands (2K, 4K, 6K, 8K)
- ✅ **Interactive Tooltips** with formatted values
- ✅ **Responsive Design** with fixed 300px height
- ✅ **Purple Theme** matching brand colors

**Chart Details:**
- Stacked bars with 35px thickness
- Light purple (#e8ddff) for Auto DMs
- Dark purple (#683fbe) for Manual DMs
- Y-axis range: 0 to 8K with 2K steps
- Rounded corners (4px) on bars

**Usage:**
```tsx
<EngagementStats
  title="Engagement & Usage Stats"
  autoData={[6000, 5500, 4500, 4000, 3800, 3600, 3400, 3200, 0, 0, 0]}
  manualData={[2000, 1500, 1200, 1200, 1200, 1200, 1200, 1200, 0, 0, 0]}
  labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
/>
```

---

### RecentActivity.tsx
Activity feed component for displaying recent actions.

**Props:**
```typescript
interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  avatar?: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  title?: string;
}
```

**Features:**
- ✅ User avatars with fallback initials
- ✅ Action descriptions
- ✅ Timestamps
- ✅ Hover effects

**Usage:**
```tsx
<RecentActivity
  title="Recent Activity"
  activities={[
    {
      id: "1",
      user: "John Doe",
      action: "Created a new campaign",
      timestamp: "2 hours ago"
    }
  ]}
/>
```

---

## 🎨 Design Tokens

The components use a consistent design system:

**Colors:**
- **Primary Purple**: `#683fbe`
- **Light Purple**: `#e8ddff`
- **Header Color**: `#1c1c1e`
- **Sub Text Color**: `#6e6e73`
- **Stroke Color**: `#eaeaea`
- **Red**: `#e66464`
- **White**: `#ffffff`
- **Background**: `#fafafa`

**Typography:**
- **H2**: Roboto Medium 24px / 32px line-height
- **H3**: Roboto Medium 20px / 28px line-height
- **H4**: Roboto Medium 18px / 26px line-height
- **Body**: Roboto Medium 14px / 20px line-height
- **Caption**: Roboto Regular 12px / 16px line-height

---

## 🛠️ Installation & Setup

### Dependencies
The dashboard uses Chart.js for data visualization. Make sure these are installed:

```bash
npm install chart.js react-chartjs-2
```

### Import Components
```tsx
// Import everything
import * as Dashboard from "@/components/new-dashboard";

// Or import specific components
import { 
  Dashboard, 
  Sidebar, 
  Header, 
  StatsCard, 
  LineChart, 
  PieChart, 
  RecentActivity 
} from "@/components/new-dashboard";
```

---

## 📊 Dashboard Layout

The main dashboard uses a responsive grid layout:

```
┌──────────┬─────────────────────────────────┐
│          │          Header                 │
│  Sidebar ├─────────────────────────────────┤
│          │                                 │
│          │  Stats Cards (4 columns)        │
│          │                                 │
│          ├─────────────────┬───────────────┤
│          │                 │               │
│          │  Line Chart     │  Pie Chart    │
│          │  (2/3 width)    │  (1/3 width)  │
│          │                 │               │
│          ├─────────────────┴───────────────┤
│          │                                 │
│          │  Recent Activity (2 columns)    │
│          │                                 │
└──────────┴─────────────────────────────────┘
```

---

## 🎯 Usage Examples

### Basic Dashboard Page
```tsx
import { Dashboard } from "@/components/new-dashboard";

export default function DashboardPage() {
  return <Dashboard />;
}
```

### Custom Dashboard with Your Data
```tsx
import { 
  Sidebar, 
  Header, 
  StatsCard, 
  LineChart 
} from "@/components/new-dashboard";
import { Users } from "lucide-react";

export default function CustomDashboard() {
  const myData = fetchMyData(); // Your data fetching logic

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName={myData.user.name} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {myData.stats.map((stat) => (
              <StatsCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={Users}
              />
            ))}
          </div>
          <LineChart
            data={myData.chartData}
            labels={myData.chartLabels}
          />
        </main>
      </div>
    </div>
  );
}
```

---

## 📝 Notes

- All components are **client-side** (`"use client"`) for Next.js App Router
- Components use **TypeScript** for type safety
- Charts use **Chart.js** and **react-chartjs-2**
- Icons from **lucide-react**
- Fully **responsive** design
- **Tailwind CSS** for styling

---

## 🔧 Customization

### Changing Colors
Update the color values in each component or create a theme configuration file.

### Adding New Stats
Add more `StatsCard` components with different metrics and icons.

### Custom Charts
Extend the `LineChart` or `PieChart` components with additional Chart.js options.

### Navigation Items
Modify the `navItems` array in `Sidebar.tsx` to add/remove menu items.

---

## 🚀 Ready to Use!

All components are modular and can be used independently or together as a complete dashboard solution.
