import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: LucideIcon;
  bgColor?: string;
  iconColor?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  bgColor = "bg-[#f8f8f8]",
  iconColor = "text-[#683fbe]",
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-[#e66464]";
      default:
        return "text-[#6e6e73]";
    }
  };

  return (
    <div className="bg-white border border-[#eaeaea] rounded p-5 flex flex-col gap-3">
      {/* Icon and Title */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-normal text-[#6e6e73] leading-5">{title}</p>
        </div>
        {Icon && (
          <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-medium text-[#1c1c1e] leading-8">{value}</h3>
        {change && (
          <span className={`text-xs font-normal leading-4 ${getChangeColor()}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
