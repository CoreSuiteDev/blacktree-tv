"use client";
import React, { useState } from "react";
import {
  User,
  CreditCard,
  ShieldCheck,
  Sliders,
  LogOut,
  Bookmark,
} from "lucide-react";

import { useUserProfileStore } from "@/store/public/use-user-profile-store";

import WatchlistTab from "./watchlist-tab";
import PlaybackTab from "./playback-tab";
import SecurityTab from "./security-tab";
import BillingTab from "./billing-tab";
import ProfileOverview from "./profile-overview-tab"; // Your newly integrated combined panel

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
          {/* COLUMN 1: INTERACTIVE NAVIGATION HUB */}
          <div className="lg:col-span-3 bg-[#0c0c0c] border border-neutral-900 rounded-xl p-4 space-y-1.5 min-h-[380px] flex flex-col justify-between">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("details")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === "details"
                    ? "bg-neutral-900/90 text-white border-l-2 border-red-600 pl-3"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/30"
                }`}
              >
                <User
                  size={16}
                  className={activeTab === "details" ? "text-red-500" : ""}
                />
                Overview
              </button>

              <button
                onClick={() => setActiveTab("billing")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === "billing"
                    ? "bg-neutral-900/90 text-white border-l-2 border-red-600 pl-3"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/30"
                }`}
              >
                <CreditCard
                  size={16}
                  className={activeTab === "billing" ? "text-red-500" : ""}
                />
                Membership
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === "security"
                    ? "bg-neutral-900/90 text-white border-l-2 border-red-600 pl-3"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/30"
                }`}
              >
                <ShieldCheck
                  size={16}
                  className={activeTab === "security" ? "text-red-500" : ""}
                />
                Security & Privacy
              </button>

              <button
                onClick={() => setActiveTab("playback")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === "playback"
                    ? "bg-neutral-900/90 text-white border-l-2 border-red-600 pl-3"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/30"
                }`}
              >
                <Sliders
                  size={16}
                  className={activeTab === "playback" ? "text-red-500" : ""}
                />
                Preferences
              </button>

              <button
                onClick={() => setActiveTab("watchlist")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === "watchlist"
                    ? "bg-neutral-900/90 text-white border-l-2 border-red-600 pl-3"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/30"
                }`}
              >
                <Bookmark
                  size={16}
                  className={activeTab === "watchlist" ? "text-red-500" : ""}
                />
                Watchlist
              </button>
            </div>

            {/* Logout Action Module */}
            <div className="border-t border-neutral-900/80 mt-4 pt-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-neutral-400 hover:text-red-500 hover:bg-red-950/10 transition-all duration-200 uppercase tracking-widest text-[11px]">
                <LogOut size={15} /> Terminate Session
              </button>
            </div>
          </div>

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
