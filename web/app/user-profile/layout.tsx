"use client";
import React from "react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";

import { UserProfileSidebar } from "./_components/user-profile-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useUserProfileStore();

  if (!profile) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-neutral-500 tracking-wider">
            Acquiring cloud profile records...
          </span>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex  w-full  bg-black text-white antialiased font-sans selection:bg-red-600 selection:text-white overflow-hidden">
        {/* NATIVE SIDEBAR (Handles Desktop Collapse & Mobile Overlay natively) */}
        <UserProfileSidebar />

        {/* APPLICATION MAIN CONTROLLER VIEWPORT - Added h-screen and overflow-hidden to separate layout controls */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Action Header Controls (STAY FIXED ON TOP) */}
          <header className="flex h-12 shrink-0 items-center gap-2 mt-3 px-4 sm:px-6 lg:px-8  bg-black z-10">
            <SidebarTrigger className="h-9 w-9 bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors rounded-lg" />
            <div className="h-4 w-[1px] bg-neutral-900 mx-1" />
            <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
              Account Menu
            </span>
          </header>

          {/* MAIN ROUTE DYNAMIC CONTENT CONTAINER (SCROLLS INDEPENDENTLY) */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
            <div className="w-full bg-neutral-950/40 border border-neutral-900/60 rounded-xl p-6 shadow-sm min-h-[500px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default ProfileLayout;
