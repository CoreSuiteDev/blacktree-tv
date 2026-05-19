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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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

export function UserProfileSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <Sidebar className="border-r border-border bg-card shadow-sm">
      <SidebarHeader className="px-4 py-3 border-b border-border/40">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground/70">
          Account Settings
        </h3>
      </SidebarHeader>

      {/* SECTION 2: INTERACTIVE NAVIGATION LINKS */}
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.path;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 h-auto rounded-lg text-xs font-bold tracking-wide transition-all duration-200",
                        isActive
                          ? "bg-muted text-foreground border-l-2 border-primary pl-3"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                      )}
                    >
                      <Link href={item.path}>
                        <IconComponent
                          size={15}
                          className={cn(
                            "transition-colors shrink-0",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground/70",
                          )}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* SECTION 3: GLOBAL SESSION TERMINATION INTERFACE */}
      <SidebarFooter className="p-4 border-t border-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full flex items-center bg-primary text-primary-foreground hover:bg-primary/90 justify-start gap-3 px-4 py-3 h-auto rounded-lg text-[10px] font-bold transition-all duration-200 uppercase tracking-wider"
            >
              <LogOut size={14} className="shrink-0" />
              <span>logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
