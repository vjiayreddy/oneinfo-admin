"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Small helper to join class names conditionally (avoids adding a new dependency)
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Creators", href: "/creators", icon: "grid" },
  { label: "Content", href: "/content", icon: "pie" },
  { label: "Paid Collabs", href: "/paid-collabs", icon: "pie" },
  { label: "Setting", href: "/setting", icon: "pie" },
];

function Icon({ name, active }: { name: "grid" | "pie"; active?: boolean }) {
  const common = cn("h-5 w-5", active ? "text-[#6B39F3]" : "text-gray-500");
  if (name === "grid") {
    // Rounded grid icon resembling the mock
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="4" width="7" height="7" rx="2" />
        <rect x="13" y="4" width="7" height="7" rx="2" />
        <rect x="4" y="13" width="7" height="7" rx="2" />
        <rect x="13" y="13" width="7" height="7" rx="2" />
      </svg>
    );
  }
  // Pie-chart like icon used in mock for remaining items
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v9l7.5 4.33A9 9 0 1 1 12 3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
    </svg>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-[240px] shrink-0 bg-white border-r border-gray-200 py-6",
          "transition-transform duration-300 ease-in-out",
          // Fixed positioning on both mobile and desktop
          "fixed top-16 left-0 bottom-0 z-50",
          // Height: full height minus AppBar
          "h-[calc(100vh-4rem)]",
          // Scrollable content with custom scrollbar
          "overflow-y-auto overflow-x-hidden sidebar-scroll",
          // Show/hide on mobile based on isOpen state
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
      <nav className="mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive ? "bg-[#E9D7FF] text-[#6B39F3]" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#6B39F3] rounded-r" />
                  )}
                  <Icon name={item.icon as any} active={isActive} />
                  <span className={cn("text-[15px] font-medium", isActive ? "text-[#6B39F3]" : "text-gray-600")}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      </aside>
    </>
  );
}
