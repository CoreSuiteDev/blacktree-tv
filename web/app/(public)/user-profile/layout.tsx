"use client";
import React, { useState } from "react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { TAB_META } from "@/constants/profile";
import UserProfileSidebar from "./_components/user-profile-sidebar";
import { Button } from "@/components/ui/button";

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useUserProfileStore();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const segments = pathname.split("/");
  const currentTab = segments[2] || "details";

  const activeKey = currentTab as
    | "details"
    | "watchlist"
    | "billing"
    | "playback"
    | "security";

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
    <section className="w-full min-h-screen bg-black mt-16 text-white py-12 px-4 md:px-6 lg:px-8 font-sans antialiased selection:bg-red-600 selection:text-white relative">
      <div className="container mx-auto space-y-6">
        {/* Dynamic Context Header Section */}
        <div className="border-b border-neutral-900 pb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-300">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {TAB_META[activeKey]?.title || "Profile"}
            </h1>
            <p className="text-sm text-neutral-400 tracking-wide max-w-2xl">
              {TAB_META[activeKey]?.description ||
                "Manage your profile settings"}
            </p>
          </div>

          {/* Mini Device Sidebar Toggle Button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="outline"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-900 hover:text-white text-xs font-bold uppercase tracking-wider gap-2 h-10 px-4 rounded-lg"
            >
              <Menu size={16} className="text-red-600" />
              Profile Menu
            </Button>
          </div>
        </div>

        {/* Master Screen Component Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <UserProfileSidebar />
          </div>

          {/* MOBILE/TABLET SIDEBAR DRAWER OVERLAY (Scoped inside content viewport) */}
          {isMobileSidebarOpen && (
            <div className="fixed top-16 bottom-0 left-0 right-0 z-40 lg:hidden flex justify-end animate-in fade-in duration-200">
              {/* Backdrop - Scoped below Navbar */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                onClick={() => setIsMobileSidebarOpen(false)}
              />

              {/* Drawer Content - Fixed height container inside viewport */}
              <div className="relative w-full max-w-[290px] h-full bg-neutral-950 border-l border-neutral-900 p-6 flex flex-col shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-neutral-500 uppercase">
                      Navigation Panel
                    </span>
                    <button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-1 rounded-md text-neutral-400 hover:text-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Inside navigation clicks auto-closes the drawer */}
                  <div
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="pb-8"
                  >
                    <UserProfileSidebar />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COLUMN 2: DYNAMIC ROUTE DISPLAY FIELD */}
          <div className="lg:col-span-9 w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default ProfileLayout;
