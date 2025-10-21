"use client";

import { PaidCollabManagement } from "@/components/page-collabs";

const PaidCollabsPage = () => {
  const handleCreateCampaign = () => {
    console.log("Create new campaign");
    // TODO: Navigate to campaign creation page or open modal
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PaidCollabManagement onCreateCampaign={handleCreateCampaign} />
    </div>
  );
};

export default PaidCollabsPage;