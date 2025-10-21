"use client";

import { useState } from "react";
import { Upload, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CampaignFormData) => void;
}

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

export default function CreateCampaignModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateCampaignModalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      brandName: "",
      minFollowers: "",
      niche: "",
      contentType: "",
      deliverables: "",
      startDate: "",
      endDate: "",
    });
    setLogoPreview("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[760px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1c1c1e]">
            Create a New Collaboration Campaign
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] mt-4">
          {/* Upload Brand Logo */}
          <div className="flex flex-col gap-3">
            <label className="text-xs text-[#1c1c1e]">Upload Brand Logo</label>
            <div className="flex items-center gap-[18px]">
              {/* Logo Preview Circle */}
              <div className="w-[60px] h-[60px] bg-[#e8ddff] rounded-full flex items-center justify-center overflow-hidden relative">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[#683fbe] text-2xl">🏢</div>
                )}
              </div>

              {/* Upload Button */}
              <label className="bg-[#683fbe] text-[#e8ddff] px-4 py-2 rounded-md text-xs flex items-center gap-3 cursor-pointer hover:bg-[#5632a0] transition-colors">
                <Upload className="w-[18px] h-[18px]" />
                <span>Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Row 1: Brand Name, Min Followers, Niche */}
          <div className="grid grid-cols-3 gap-10">
            {/* Brand Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#1c1c1e]">Brand Name</label>
              <input
                type="text"
                placeholder="e.g. Nykaa Beauty"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="h-[42px] px-3 py-2 border border-[#eaeaea] rounded text-[10.5px] text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
                required
              />
            </div>

            {/* Minimum Followers Required */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#1c1c1e]">Minimum Followers Required</label>
              <select
                value={formData.minFollowers}
                onChange={(e) => setFormData({ ...formData, minFollowers: e.target.value })}
                className="h-[42px] px-3 py-2 border border-[#eaeaea] rounded text-[10.5px] text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent appearance-none bg-white cursor-pointer"
                required
              >
                <option value="">Select Minimum Followers</option>
                <option value="1000">1,000+</option>
                <option value="5000">5,000+</option>
                <option value="10000">10,000+</option>
                <option value="25000">25,000+</option>
                <option value="50000">50,000+</option>
                <option value="100000">100,000+</option>
              </select>
            </div>

            {/* Niche */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#1c1c1e]">Niche</label>
              <select
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                className="h-[42px] px-3 py-2 border border-[#eaeaea] rounded text-[10.5px] text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent appearance-none bg-white cursor-pointer"
                required
              >
                <option value="">Select Niche</option>
                <option value="beauty">Beauty & Skincare</option>
                <option value="food">Food & Cooking</option>
                <option value="fashion">Fashion & Style</option>
                <option value="fitness">Fitness & Health</option>
                <option value="tech">Technology</option>
                <option value="travel">Travel</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>

          {/* Row 2: Content Type, Deliverables */}
          <div className="grid grid-cols-2 gap-10">
            {/* Content Type */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#1c1c1e]">Content Type</label>
              <input
                type="text"
                placeholder="e.g. Instagram Reel (30–60 sec)"
                value={formData.contentType}
                onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                className="h-[42px] px-3 py-2 border border-[#eaeaea] rounded text-[10.5px] text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
                required
              />
            </div>

            {/* Deliverables */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#1c1c1e]">Deliverables</label>
              <input
                type="text"
                placeholder="e.g. 3 posts"
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                className="h-[42px] px-3 py-2 border border-[#eaeaea] rounded text-[10.5px] text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Row 3: Start Date, End Date */}
          <div className="grid grid-cols-3 gap-10">
            {/* Start Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#1c1c1e]">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="h-[42px] w-full px-3 py-2 border border-[#eaeaea] rounded text-[10.5px] text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#a0a0a0] pointer-events-none" />
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#1c1c1e]">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="h-[42px] w-full px-3 py-2 border border-[#eaeaea] rounded text-[10.5px] text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#a0a0a0] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-[#683fbe] text-[#683fbe] rounded-full text-[10.5px] font-medium hover:bg-[#f5f0ff] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#683fbe] text-white rounded-full text-[10.5px] font-medium hover:bg-[#5632a0] transition-colors"
            >
              Publish Campaign
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
