"use client";
import React, { useState } from "react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";

import WatchlistTab from "./watchlist-tab";
import PlaybackTab from "./playback-tab";
import SecurityTab from "./security-tab";
import BillingTab from "./billing-tab";
import ProfileOverview from "./profile-overview-tab";
import UserProfileSidebar from "./user-profile-sidebar";

const TAB_META = {
  details: {
    title: "Account Overview",
    description:
      "Manage your premium identity parameters, system data synchronization, and contact configurations.",
  },
  billing: {
    title: "Membership & Billing",
    description:
      "Review automated premium invoices, switch network plan nodes, or view historical tracking metadata.",
  },
  security: {
    title: "Security & Privacy Settings",
    description:
      "Secure operational login systems, check valid sessions, and optimize configuration metrics.",
  },
  playback: {
    title: "Streaming Preferences",
    description:
      "Adjust localization profiles, default content formats, sound signatures, and system parameters.",
  },
  watchlist: {
    title: "Your Watchlist Workspace",
    description:
      "Organize, execute, or clear bookmarks customized for temporary viewing segments.",
  },
};

const UserProfileDetails = () => {
  const { profile } = useUserProfileStore();
  const [activeTab, setActiveTab] = useState<
    "details" | "watchlist" | "billing" | "playback" | "security"
  >("details");

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
    <section className="w-full min-h-screen bg-black mt-16 text-white py-12 px-4 md:px-8 font-sans antialiased selection:bg-red-600 selection:text-white">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Dynamic Context Header Section */}
        <div className="border-b border-neutral-900 pb-5 transition-all duration-300">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {TAB_META[activeTab].title}
          </h1>
          <p className="text-sm text-neutral-400 mt-2 tracking-wide max-w-2xl">
            {TAB_META[activeTab].description}
          </p>
        </div>

        {/* Master Screen Component Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: INTERACTIVE NAVIGATION HUB (Called from separation component) */}
          <UserProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* COLUMN 2: DYNAMIC LAYOUT DISPLAY FIELD */}
          <div className="lg:col-span-9">
            {activeTab === "details" ? (
              /* High Density Combined Overview Component Panel */
              <ProfileOverview
                profile={profile}
                setProfile={useUserProfileStore.getState().setProfile}
              />
            ) : (
              /* Secondary Tab Canvas Layout Wrapper */
              <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 min-h-[450px] animate-in fade-in duration-200">
                {activeTab === "watchlist" && <WatchlistTab />}
                {activeTab === "billing" && <BillingTab />}
                {activeTab === "playback" && <PlaybackTab />}
                {activeTab === "security" && <SecurityTab />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileDetails;
