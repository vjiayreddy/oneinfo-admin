# Paid Collabs Components

This directory contains components for the Paid Collaboration features.

## Components Overview

1. **CreateCampaignModal** - Modal dialog for creating new collaboration campaigns

---

## CreateCampaignModal

A comprehensive form modal built with **shadcn/ui Dialog** for creating new paid collaboration campaigns.

### Features

- ✅ **shadcn Dialog** - Uses @radix-ui/react-dialog
- ✅ **Brand Logo Upload** - Image upload with preview
- ✅ **Form Validation** - All fields required
- ✅ **Date Pickers** - Start and end date selection
- ✅ **Dropdown Selects** - Min followers and niche selection
- ✅ **Responsive Layout** - Grid-based form layout
- ✅ **Purple Theme** - Matching design system

### Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **Brand Logo** | File Upload | ❌ | Image upload with circular preview |
| **Brand Name** | Text Input | ✅ | Campaign brand name |
| **Min Followers** | Dropdown | ✅ | Minimum follower requirement (1K-100K+) |
| **Niche** | Dropdown | ✅ | Campaign category/niche |
| **Content Type** | Text Input | ✅ | Type of content required |
| **Deliverables** | Text Input | ✅ | Number and type of deliverables |
| **Start Date** | Date Picker | ✅ | Campaign start date |
| **End Date** | Date Picker | ✅ | Campaign end date |

### Data Structure

```typescript
interface CampaignFormData {
  brandName: string;
  brandLogo?: File;
  minFollowers: string;
  niche: string;
  contentType: string;
  deliverables: string;
  startDate: string;
  endDate: string;
}
```

### Props

```typescript
interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CampaignFormData) => void;
}
```

### Usage

```tsx
import { CreateCampaignModal } from "@/components/paid-collabs";
import { useState } from "react";

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: CampaignFormData) => {
    console.log("Campaign data:", data);
    // Send to API, update state, etc.
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Create Campaign
      </button>

      <CreateCampaignModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

### Integration with PaidCollabManagement

The modal is integrated into the `PaidCollabManagement` component and opens when clicking the "Create New Campaign" button:

```tsx
// In PaidCollabManagement.tsx
const [isModalOpen, setIsModalOpen] = useState(false);

<button onClick={() => setIsModalOpen(true)}>
  Create New Campaign
</button>

<CreateCampaignModal
  open={isModalOpen}
  onOpenChange={setIsModalOpen}
  onSubmit={(data) => {
    console.log("Campaign created:", data);
  }}
/>
```

### Form Layout

**Row 1 (3 columns):**
- Brand Name (text input)
- Minimum Followers Required (dropdown)
- Niche (dropdown)

**Row 2 (2 columns):**
- Content Type (text input)
- Deliverables (text input)

**Row 3 (2 columns):**
- Start Date (date picker)
- End Date (date picker)

### Styling

**Modal:**
- Max width: 760px
- Max height: 90vh
- Overflow: Scroll
- Background: White
- Border radius: 15px
- Padding: 36px

**Title:**
- Font: Roboto Bold
- Size: 24px
- Color: #1c1c1e
- Line height: 30px

**Labels:**
- Font: Roboto Regular
- Size: 12px
- Color: #1c1c1e
- Line height: 18px

**Inputs:**
- Height: 42px
- Border: 1px solid #eaeaea
- Border radius: 4px
- Padding: 7px 12px
- Font size: 10.5px
- Placeholder: #a0a0a0
- Focus ring: #683fbe

**Logo Preview:**
- Size: 60px × 60px
- Background: #e8ddff
- Shape: Circular
- Icon: 🏢 (default)

**Upload Button:**
- Background: #683fbe
- Text: #e8ddff
- Padding: 8px 16px
- Border radius: 6px
- Icon: Upload (lucide)
- Hover: #5632a0

**Action Buttons:**
- Cancel: Border #683fbe, Text #683fbe, Rounded full
- Submit: Background #683fbe, Text white, Rounded full
- Padding: 12px 24px
- Font size: 10.5px

### Dropdown Options

**Minimum Followers:**
- 1,000+
- 5,000+
- 10,000+
- 25,000+
- 50,000+
- 100,000+

**Niche:**
- Beauty & Skincare
- Food & Cooking
- Fashion & Style
- Fitness & Health
- Technology
- Travel
- Lifestyle

### Logo Upload

**Features:**
- File input (hidden)
- Circular preview (60px)
- Image preview on upload
- Default icon when empty
- Accept: image/*

**Preview:**
```tsx
{logoPreview ? (
  <img src={logoPreview} alt="Logo" />
) : (
  <div>🏢</div>
)}
```

### Date Pickers

**Features:**
- Native HTML date input
- Calendar icon on right
- Gray placeholder text
- Focus ring on interaction

**Icon:**
- Calendar icon from lucide-react
- Size: 24px
- Color: #a0a0a0
- Position: Absolute right

### Form Validation

All fields are **required** except the brand logo:
- Brand Name: Required text
- Min Followers: Required dropdown selection
- Niche: Required dropdown selection
- Content Type: Required text
- Deliverables: Required text
- Start Date: Required date
- End Date: Required date

### Form Submission

**On Submit:**
1. Prevents default form behavior
2. Calls `onSubmit` callback with form data
3. Closes modal
4. Form data includes File object for logo

**On Cancel:**
1. Resets all form fields
2. Clears logo preview
3. Closes modal

### Color Tokens

- **Primary Purple**: #683fbe
- **Hover Purple**: #5632a0
- **Light Purple**: #e8ddff
- **Dark Text**: #1c1c1e
- **Placeholder**: #a0a0a0
- **Border**: #eaeaea
- **White**: #ffffff

### Typography

- **Title**: Roboto Bold, 24px, line-height 30px
- **Labels**: Roboto Regular, 12px, line-height 18px
- **Inputs**: Roboto Regular, 10.5px
- **Buttons**: Roboto Medium, 10.5px

### Accessibility

- Form labels properly associated
- Required fields marked
- Focus states on all inputs
- Keyboard navigation supported
- ARIA labels from shadcn Dialog

### State Management

```typescript
const [formData, setFormData] = useState<CampaignFormData>({
  brandName: "",
  minFollowers: "",
  niche: "",
  contentType: "",
  deliverables: "",
  startDate: "",
  endDate: "",
});

const [logoPreview, setLogoPreview] = useState<string>("");
```

### File Handling

```typescript
const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setFormData({ ...formData, brandLogo: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
```

### Future Enhancements

- [ ] Add image cropping functionality
- [ ] Add file size validation
- [ ] Add multi-select for niches
- [ ] Add budget input field
- [ ] Add campaign description textarea
- [ ] Add tags/keywords input
- [ ] Add location targeting
- [ ] Add age range targeting
- [ ] Add success toast notification
- [ ] Add error handling/validation messages
- [ ] Add loading state on submit
- [ ] Add draft save functionality

---

## File Structure

```
paid-collabs/
├── CreateCampaignModal.tsx  # Campaign creation modal
├── index.ts                  # Component exports
└── README.md                 # This file
```

---

## Notes

- Uses **shadcn/ui Dialog** component (@radix-ui/react-dialog)
- Uses **lucide-react** for icons (Upload, Calendar)
- Follows Next.js 15 App Router patterns
- Purple theme matching admin dashboard
- Fully responsive form layout
- Form validation with HTML5 required attributes
- File upload with image preview
- Ready for API integration via onSubmit callback
