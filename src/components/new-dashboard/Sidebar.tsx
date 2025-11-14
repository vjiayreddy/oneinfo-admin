"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Creators",
    href: "/creators",
    icon: Users,
  },
  {
    label: "Content",
    href: "/content",
    icon: FileText,
  },
  {
    label: "Paid Collabs",
    href: "/paid-collabs",
    icon: DollarSign,
  },
  {
    label: "Setting",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen bg-white border-r border-[#eaeaea] flex-shrink-0">
      <div className="h-full overflow-y-auto p-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-[61px] h-[61px] bg-[#683fbe] rounded flex items-center justify-center p-1">
            <svg
              width="45"
              height="34"
              viewBox="0 0 45 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.5 0L0 17L22.5 34L45 17L22.5 0Z" fill="white" />
            </svg>
          </div>
          <h1 className="text-xl font-medium text-[#683fbe] leading-[28px]">
            Oneinfo.ai
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${
                  isActive
                    ? "bg-[#e8ddff] border-l-[2.5px] border-[#683fbe] text-[#683fbe]"
                    : "text-[#6e6e73] hover:bg-gray-50 rounded-full"
                }`}
              >
                <Icon className="w-[22px] h-[22px]" />
                <span className="text-sm font-medium leading-5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
