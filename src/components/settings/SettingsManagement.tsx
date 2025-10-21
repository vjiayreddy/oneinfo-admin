"use client";

import { useState } from "react";
import { Crown } from "lucide-react";

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

interface SubscriptionCardProps {
  plan: PlanData;
  standardPrice: number;
  offerPrice: number;
  expireDays: number;
  alertDays: number;
  onStandardPriceChange: (value: number) => void;
  onOfferPriceChange: (value: number) => void;
  onExpireDaysChange: (value: number) => void;
  onAlertDaysChange: (value: number) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  standardPrice,
  offerPrice,
  expireDays,
  alertDays,
  onStandardPriceChange,
  onOfferPriceChange,
  onExpireDaysChange,
  onAlertDaysChange,
}) => {
  return (
    <div className="bg-white border border-[#eaeaea] rounded-lg p-3.5 sm:p-4 flex flex-col gap-3.5">
      <div className="flex flex-col gap-3.5">
        {/* Plan Header Card */}
        <div className="bg-white border border-[#eaeaea] rounded-xl p-3">
          <div className="flex items-center gap-3.5">
            {/* Crown Icon */}
            <div className="w-10 h-10 flex-shrink-0">
              <Crown className="w-full h-full" style={{ color: plan.crownColor }} />
            </div>

            {/* Plan Info */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-[#1c1c1e] tracking-tight">
                {plan.name}
              </h3>
              <p className="text-xs leading-tight">
                <span className="text-lg font-medium text-[#1c1c1e]">₹{offerPrice} </span>
                <span className="text-[9px] text-[#1c1c1e]">{plan.duration}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Edit Subscription Form */}
        <div className="bg-white border border-[#eaeaea] rounded p-4 sm:p-[18px] flex flex-col gap-3.5">
          <p className="text-[13px] font-medium text-[#1c1c1e]">Edit Subscription</p>

          {/* Standard Price */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6e6e73]">Standard Price</label>
            <input
              type="number"
              value={standardPrice}
              onChange={(e) => onStandardPriceChange(Number(e.target.value))}
              className="h-[33px] px-3 py-2 bg-white border border-[#eaeaea] rounded text-[9px] text-[#1c1c1e] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
            />
          </div>

          {/* Offer Price */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6e6e73]">Offer Price</label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => onOfferPriceChange(Number(e.target.value))}
              className="h-[33px] px-3 py-2 bg-white border border-[#eaeaea] rounded text-[9px] text-[#1c1c1e] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
            />
          </div>

          {/* Expire in (days) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6e6e73]">Expire in (days)</label>
            <input
              type="number"
              value={expireDays}
              onChange={(e) => onExpireDaysChange(Number(e.target.value))}
              className="h-[33px] px-3 py-2 bg-white border border-[#eaeaea] rounded text-[9px] text-[#1c1c1e] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
            />
          </div>

          {/* Alert After (days) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6e6e73]">Alert After (days)</label>
            <input
              type="number"
              value={alertDays}
              onChange={(e) => onAlertDaysChange(Number(e.target.value))}
              className="h-[33px] px-3 py-2 bg-white border border-[#eaeaea] rounded text-[9px] text-[#1c1c1e] focus:outline-none focus:ring-2 focus:ring-[#683fbe] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsManagement = () => {
  // State for Basic plan
  const [basicStandard, setBasicStandard] = useState(999);
  const [basicOffer, setBasicOffer] = useState(499);
  const [basicExpire, setBasicExpire] = useState(30);
  const [basicAlert, setBasicAlert] = useState(25);

  // State for Standard plan
  const [standardStandard, setStandardStandard] = useState(2499);
  const [standardOffer, setStandardOffer] = useState(999);
  const [standardExpire, setStandardExpire] = useState(90);
  const [standardAlert, setStandardAlert] = useState(85);

  // State for Premium plan
  const [premiumStandard, setPremiumStandard] = useState(1999);
  const [premiumOffer, setPremiumOffer] = useState(1999);
  const [premiumExpire, setPremiumExpire] = useState(365);
  const [premiumAlert, setPremiumAlert] = useState(360);

  const plans: PlanData[] = [
    {
      id: "basic",
      name: "Basic",
      standardPrice: basicStandard,
      offerPrice: basicOffer,
      duration: "for 1 Month",
      expireDays: basicExpire,
      alertDays: basicAlert,
      crownColor: "#FFD700",
    },
    {
      id: "standard",
      name: "Standard",
      standardPrice: standardStandard,
      offerPrice: standardOffer,
      duration: "for 3 Months",
      expireDays: standardExpire,
      alertDays: standardAlert,
      crownColor: "#C0C0C0",
    },
    {
      id: "premium",
      name: "Premium",
      standardPrice: premiumStandard,
      offerPrice: premiumOffer,
      duration: "for 12 Months",
      expireDays: premiumExpire,
      alertDays: premiumAlert,
      crownColor: "#CD7F32",
    },
  ];

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

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="bg-white h-14 flex items-center px-[18px]">
        <h1 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
          Manage Subscription Plans
        </h1>
      </div>

      {/* Plans Container */}
      <div className="flex flex-col gap-10">
        {/* Plans Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <SubscriptionCard
            plan={plans[0]}
            standardPrice={basicStandard}
            offerPrice={basicOffer}
            expireDays={basicExpire}
            alertDays={basicAlert}
            onStandardPriceChange={setBasicStandard}
            onOfferPriceChange={setBasicOffer}
            onExpireDaysChange={setBasicExpire}
            onAlertDaysChange={setBasicAlert}
          />

          {/* Standard Plan */}
          <SubscriptionCard
            plan={plans[1]}
            standardPrice={standardStandard}
            offerPrice={standardOffer}
            expireDays={standardExpire}
            alertDays={standardAlert}
            onStandardPriceChange={setStandardStandard}
            onOfferPriceChange={setStandardOffer}
            onExpireDaysChange={setStandardExpire}
            onAlertDaysChange={setStandardAlert}
          />

          {/* Premium Plan */}
          <SubscriptionCard
            plan={plans[2]}
            standardPrice={premiumStandard}
            offerPrice={premiumOffer}
            expireDays={premiumExpire}
            alertDays={premiumAlert}
            onStandardPriceChange={setPremiumStandard}
            onOfferPriceChange={setPremiumOffer}
            onExpireDaysChange={setPremiumExpire}
            onAlertDaysChange={setPremiumAlert}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="bg-[#e8ddff] text-[#6e6e73] px-6 py-3 rounded-full text-[10.5px] font-medium hover:bg-[#d4c5f9] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
