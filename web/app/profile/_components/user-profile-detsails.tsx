"use client";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import { useState } from "react";

import { TAB_META } from "@/constants/profile";
import BillingTab from "./billing-tab";
import PlaybackTab from "./playback-tab";
import ProfileOverview from "./profile-overview-tab";
import SecurityTab from "./security-tab";
import WatchlistTab from "./watchlist-tab";

const UserProfileDetails = () => {
  const { profile } = useUserProfileStore();
  const [activeTab] = useState<
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
    <section className="w-full  min-h-screen bg-black mt-16 text-white py-12 px-4 md:px-0  font-sans antialiased selection:bg-red-600 selection:text-white">
      <div className="container mx-auto space-y-6">
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

          {/* COLUMN 2: DYNAMIC LAYOUT DISPLAY FIELD */}
          <div className="lg:col-span-9">
            {activeTab === "details" ? (
              /* High Density Combined Overview Component Panel */
              <ProfileOverview />
            ) : (
              /* Secondary Tab Canvas Layout Wrapper */
              <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 min-h-112.5 animate-in fade-in duration-200">
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
