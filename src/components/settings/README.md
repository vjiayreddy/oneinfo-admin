# Settings Components

This directory contains components for the Settings section of the admin dashboard.

## Components Overview

1. **SettingsManagement** - Subscription plan management interface

---

## SettingsManagement

A comprehensive subscription management component for editing pricing and plan details across three tiers.

### Features

- ✅ **Three Subscription Tiers** - Basic, Standard, Premium
- ✅ **Editable Fields** - Standard price, offer price, expiry days, alert days
- ✅ **Crown Icons** - Unique colored crown for each tier (Gold, Silver, Bronze)
- ✅ **Fully Responsive** - Mobile (1 column), Tablet (2 columns), Desktop (3 columns)
- ✅ **Single Save Button** - Save all changes at once
- ✅ **Real-time Updates** - Local state management with useState
- ✅ **Focus States** - Purple ring on input focus

### Subscription Tiers

| Tier | Standard Price | Offer Price | Duration | Expire Days | Alert Days | Crown Color |
|------|----------------|-------------|----------|-------------|------------|-------------|
| **Basic** | ₹999 | ₹499 | 1 Month | 30 | 25 | Gold (#FFD700) |
| **Standard** | ₹2,499 | ₹999 | 3 Months | 90 | 85 | Silver (#C0C0C0) |
| **Premium** | ₹1,999 | ₹1,999 | 12 Months | 365 | 360 | Bronze (#CD7F32) |

### Data Structure

```typescript
interface PlanData {
  id: string;
  name: string;
  standardPrice: number;
  offerPrice: number;
  duration: string;
  expireDays: number;
  alertDays: number;
  crownColor: string;
}
```

### Component Structure

```
SettingsManagement
├── Header ("Manage Subscription Plans")
├── Plans Grid (Responsive)
│   ├── Basic Card
│   │   ├── Plan Header (Crown + Name + Price)
│   │   └── Edit Form (4 inputs)
│   ├── Standard Card
│   │   ├── Plan Header
│   │   └── Edit Form
│   └── Premium Card
│       ├── Plan Header
│       └── Edit Form
└── Save Button (Right-aligned)
```

### Usage

```tsx
import { SettingsManagement } from "@/components/settings";

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <SettingsManagement />
    </div>
  );
}
```

### Card Layout

Each subscription card contains:

**1. Plan Header Card:**
- Crown icon (40px × 40px, colored)
- Plan name (14px, medium)
- Price display (18px offer price + 9px duration)

**2. Edit Subscription Form:**
- Title: "Edit Subscription" (13px, medium)
- 4 input fields:
  - Standard Price
  - Offer Price
  - Expire in (days)
  - Alert After (days)

### Responsive Breakpoints

**Mobile (< 640px):**
```css
grid-cols-1
```
- Single column layout
- Full width cards
- Stacked vertically

**Tablet (640px - 1024px):**
```css
sm:grid-cols-2
```
- Two columns
- 50% width per card
- 6px gap

**Desktop (≥ 1024px):**
```css
lg:grid-cols-3
```
- Three columns
- 33.33% width per card
- 6px gap

### Styling

**Header:**
- Background: White (#ffffff)
- Height: 56px
- Padding: 0 18px
- Text: 18px, Medium, #1c1c1e

**Card Outer:**
- Background: White
- Border: 1px solid #eaeaea
- Border radius: 8px
- Padding: 14-16px
- Gap: 14px between sections

**Plan Header:**
- Background: White
- Border: 1px solid #eaeaea
- Border radius: 12px
- Padding: 12px
- Crown size: 40px × 40px

**Form Container:**
- Background: White
- Border: 1px solid #eaeaea
- Border radius: 4px
- Padding: 18px
- Gap: 14px between fields

**Input Fields:**
- Height: 33px
- Padding: 8px 12px
- Border: 1px solid #eaeaea
- Border radius: 4px
- Text: 9px, #1c1c1e
- Label: 12px, #6e6e73
- Focus: 2px ring #683fbe

**Save Button:**
- Background: #e8ddff
- Text: #6e6e73
- Padding: 12px 24px
- Border radius: 24px (full)
- Font: 10.5px, Medium
- Hover: #d4c5f9

### Crown Colors

**Basic Plan:**
- Color: #FFD700 (Gold)
- Represents entry-level tier

**Standard Plan:**
- Color: #C0C0C0 (Silver)
- Represents mid-tier

**Premium Plan:**
- Color: #CD7F32 (Bronze)
- Represents top-tier

### State Management

Each plan has individual state for all editable fields:

```typescript
// Basic Plan States
const [basicStandard, setBasicStandard] = useState(999);
const [basicOffer, setBasicOffer] = useState(499);
const [basicExpire, setBasicExpire] = useState(30);
const [basicAlert, setBasicAlert] = useState(25);

// Standard Plan States
const [standardStandard, setStandardStandard] = useState(2499);
const [standardOffer, setStandardOffer] = useState(999);
const [standardExpire, setStandardExpire] = useState(90);
const [standardAlert, setStandardAlert] = useState(85);

// Premium Plan States
const [premiumStandard, setPremiumStandard] = useState(1999);
const [premiumOffer, setPremiumOffer] = useState(1999);
const [premiumExpire, setPremiumExpire] = useState(365);
const [premiumAlert, setPremiumAlert] = useState(360);
```

### Save Functionality

```typescript
const handleSaveChanges = () => {
  const updatedPlans = {
    basic: {
      standardPrice: basicStandard,
      offerPrice: basicOffer,
      expireDays: basicExpire,
      alertDays: basicAlert,
    },
    standard: {
      standardPrice: standardStandard,
      offerPrice: standardOffer,
      expireDays: standardExpire,
      alertDays: standardAlert,
    },
    premium: {
      standardPrice: premiumStandard,
      offerPrice: premiumOffer,
      expireDays: premiumExpire,
      alertDays: premiumAlert,
    },
  };
  console.log("Plans updated:", updatedPlans);
  // TODO: Send to API
};
```

### Form Fields Detail

**Standard Price:**
- Type: Number input
- Purpose: Regular pricing before discount
- Validation: Number only

**Offer Price:**
- Type: Number input
- Purpose: Discounted/promotional price
- Displayed in plan header

**Expire in (days):**
- Type: Number input
- Purpose: Subscription validity period
- Examples: 30, 90, 365

**Alert After (days):**
- Type: Number input
- Purpose: When to alert user before expiry
- Typically: expire days - 5

### Color Tokens

- **Header Text**: #1c1c1e
- **Sub Text**: #6e6e73
- **Border**: #eaeaea
- **White**: #ffffff
- **Light Purple**: #e8ddff (button bg)
- **Purple Hover**: #d4c5f9
- **Focus Ring**: #683fbe
- **Gold Crown**: #FFD700
- **Silver Crown**: #C0C0C0
- **Bronze Crown**: #CD7F32

### Typography

- **Title**: Roboto Medium, 18px, line-height 26px
- **Plan Name**: Roboto Medium, 14px
- **Price**: Roboto Medium, 18px
- **Duration**: Roboto Regular, 9px
- **Section Title**: Roboto Medium, 13px
- **Label**: Roboto Regular, 12px
- **Input**: Roboto Regular, 9px
- **Button**: Roboto Medium, 10.5px

### Accessibility

- All inputs have associated labels
- Focus states clearly visible
- Number inputs for numeric values
- Keyboard navigation supported
- Semantic HTML structure

### Icons

Uses **lucide-react** Crown icon:
```tsx
import { Crown } from "lucide-react";

<Crown 
  className="w-full h-full" 
  style={{ color: plan.crownColor }} 
/>
```

### Responsive Design Details

**Mobile (< 640px):**
- 1 column grid
- Full width cards
- Padding: 14px
- Gap: 24px between cards

**Tablet (640px - 1024px):**
- 2 columns grid
- ~48% width per card
- Padding: 16px
- Gap: 24px

**Desktop (≥ 1024px):**
- 3 columns grid
- ~32% width per card
- Padding: 16px
- Gap: 24px

### Example Output on Save

```json
{
  "basic": {
    "standardPrice": 999,
    "offerPrice": 499,
    "expireDays": 30,
    "alertDays": 25
  },
  "standard": {
    "standardPrice": 2499,
    "offerPrice": 999,
    "expireDays": 90,
    "alertDays": 85
  },
  "premium": {
    "standardPrice": 1999,
    "offerPrice": 1999,
    "expireDays": 365,
    "alertDays": 360
  }
}
```

### Future Enhancements

- [ ] Add API integration for saving plans
- [ ] Add success/error toast notifications
- [ ] Add validation (e.g., offer price ≤ standard price)
- [ ] Add currency selector (₹, $, €, etc.)
- [ ] Add plan features list
- [ ] Add enable/disable toggle per plan
- [ ] Add plan deletion confirmation
- [ ] Add undo/reset changes
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add plan comparison view
- [ ] Add analytics (subscribers per plan)

---

## File Structure

```
settings/
├── SettingsManagement.tsx  # Main component
├── index.ts                 # Component exports
└── README.md                # This file
```

---

## Integration Example

The component is already integrated in the settings page:

```tsx
// app/(dashboard)/settings/page.tsx
import SettingsManagement from "@/components/settings/SettingsManagement";

const SettingsPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <SettingsManagement />
    </div>
  );
};

export default SettingsPage;
```

---

## Notes

- Uses **lucide-react** for Crown icons
- Follows Figma design specifications exactly
- Fully responsive across all devices
- Purple theme matching admin dashboard
- Independent state management per plan
- Single save button for all plans
- Ready for API integration
- No external form libraries required
- Uses Tailwind CSS utility classes
- Maintains data integrity with controlled inputs
