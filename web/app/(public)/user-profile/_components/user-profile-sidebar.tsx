"use client";

import React from "react";
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

export type TabType =
  | "details"
  | "watchlist"
  | "billing"
  | "playback"
  | "security";

interface UserProfileSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onLogout?: () => void; // Added for flexible authentication lifecycle management
}

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  // Navigation matrix map to optimize rendering lines
  const navigationItems = [
    { id: "details", label: "Overview", icon: User },
    { id: "billing", label: "Membership", icon: CreditCard },
    { id: "security", label: "Security & Privacy", icon: ShieldCheck },
    { id: "playback", label: "Preferences", icon: Sliders },
    { id: "watchlist", label: "Watchlist", icon: Bookmark },
  ] as const;

  return (
    <div className="lg:col-span-3 bg-card border border-border rounded-xl p-4 h-full min-h-[380px] flex flex-col justify-between shadow-sm">
      {/* SECTION 1: INTERACTIVE NAVIGATION TABS */}
      <div className="space-y-1">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
            </button>
          );
        })}
      </div>

      {/* SECTION 2: GLOBAL SESSION TERMINATION INTERFACE */}
      <div className="border-t border-border/60 pt-3 mt-4">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full flex items-center justify-start gap-3 px-4 py-3 h-auto rounded-lg text-[10px] font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 uppercase tracking-wider font-sans"
        >
          <LogOut size={14} className="shrink-0" />
          logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
