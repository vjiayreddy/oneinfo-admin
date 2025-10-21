import { Clock } from "lucide-react";

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

const defaultActivities: Activity[] = [
  {
    id: "1",
    user: "John Doe",
    action: "Created a new campaign",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: "Jane Smith",
    action: "Updated content settings",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "Added new creator",
    timestamp: "5 hours ago",
  },
  {
    id: "4",
    user: "Sarah Williams",
    action: "Scheduled 5 posts",
    timestamp: "Yesterday",
  },
];

export default function RecentActivity({
  activities = defaultActivities,
  title = "Recent Activity",
}: RecentActivityProps) {
  return (
    <div className="bg-white border border-[#eaeaea] rounded p-5 flex flex-col gap-4">
      {/* Header */}
      <h3 className="text-lg font-medium text-[#1c1c1e] leading-[26px]">
        {title}
      </h3>

      {/* Activity List */}
      <div className="flex flex-col gap-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded transition-colors"
          >
            {/* Avatar */}
            <div className="w-10 h-10 bg-[#e8ddff] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#683fbe] font-medium text-sm">
                {activity.user.charAt(0)}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1c1c1e] leading-5">
                {activity.user}
              </p>
              <p className="text-sm text-[#6e6e73] leading-5 mt-0.5">
                {activity.action}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-[#6e6e73]" />
                <span className="text-xs text-[#6e6e73] leading-4">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
