"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  CreditCard,
  ShieldCheck,
  Sliders,
  Bookmark,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const UserProfileSidebar = () => {
  const pathname = usePathname();

  // Navigation matrix map with official routing paths
  const navigationItems = [
    { id: "details", label: "Overview", icon: User, path: "/user-profile" },
    {
      id: "billing",
      label: "Membership",
      icon: CreditCard,
      path: "/user-profile/billing",
    },
    {
      id: "security",
      label: "Security & Privacy",
      icon: ShieldCheck,
      path: "/user-profile/security",
    },
    {
      id: "playback",
      label: "Preferences",
      icon: Sliders,
      path: "/user-profile/playback",
    },
    {
      id: "watchlist",
      label: "Watchlist",
      icon: Bookmark,
      path: "/user-profile/watchlist",
    },
  ] as const;

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="lg:col-span-3 bg-card border border-border rounded-xl p-4 h-full min-h-[380px] flex flex-col justify-between shadow-sm">
      {/* SECTION 1: INTERACTIVE NAVIGATION LINKS */}
      <div className="space-y-1">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;

          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold tracking-wide font-sans transition-all duration-200",
                isActive
                  ? "bg-muted text-foreground border-l-2 border-primary pl-3"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              )}
            >
              <IconComponent
                size={15}
                className={cn(
                  "transition-colors shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground/70",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* SECTION 2: GLOBAL SESSION TERMINATION INTERFACE */}
      <div className="border-t border-border/60 pt-3 mt-4">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center bg-primary/90 justify-start gap-3 px-4 py-3 h-auto rounded-lg text-[10px] font-bold text-muted-foreground  hover:bg-primary transition-all duration-200 uppercase tracking-wider font-sans"
        >
          <LogOut size={14} className="shrink-0" />
          logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
