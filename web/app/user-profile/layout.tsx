"use client";
import React from "react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";

import { UserProfileSidebar } from "./_components/user-profile-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/assets/images/BTTV New Logo2 2.png";

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
      <div className="flex w-full bg-black text-white antialiased font-sans selection:bg-red-600 selection:text-white overflow-hidden">
        {/* NOTE: Sidebar-ti jodi shadcn use kore, tobe right-side implementation er jonno 
            UserProfileSidebar file-er bhetor <Sidebar side="right"> thaka lagbe jate eta right theke ashe. */}
        <UserProfileSidebar />

        {/* APPLICATION MAIN CONTROLLER VIEWPORT */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* ACTION HEADER CONTROLS */}
          {/* 💡 Choto device-e reverse row er jonno `flex-row-reverse md:flex-row` kora hoyeche */}
          <header className="flex h-12 shrink-0 items-center justify-between flex-row-reverse md:flex-row mt-3 px-4 md:px-6 bg-black z-10">
            {/* Sidebar Trigger Section (Mini device-e extreme right, desktop-e extreme left) */}
            {/* 💡 Choto device-e divider/text hide hobe ba default flex direction control pabe */}
            <div className="flex items-center gap-2 flex-row md:flex-row">
              <SidebarTrigger className="h-9 w-9 bg-neutral-950 border border-primary/80 text-primary/90 hover:text-primary hover:bg-primary transition-colors rounded-lg" />
              {/* Desktop e divider dekhabe, mobile-e proyojon na thakay hidden md:block kora holo tracking layout clean rakhte */}
              <div className="hidden md:block h-4 w-px bg-neutral-900 mx-1" />
              <span className="hidden md:inline text-xs text-neutral-500 font-bold uppercase tracking-wider">
                Account Menu
              </span>
            </div>

            {/* Home Navigation Logo Section (Mini device-e left, desktop-e right) */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              {/* 💡 h-10 w-10 dynamically standard dynamic scaling support korbe layout block tight rakhte */}
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                  src={logoImg}
                  alt="Home Logo"
                  fill
                  priority
                  className="object-contain h-full w-full"
                />
              </div>
            </Link>
          </header>

          {/* MAIN ROUTE DYNAMIC CONTENT CONTAINER */}
          <main className="flex-1 px-4 md:px-6 overflow-y-auto custom-scrollbar">
            <div className="w-full bg-neutral-950/40 border border-neutral-900/60 rounded-xl py-6 shadow-sm min-h-125">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default ProfileLayout;
