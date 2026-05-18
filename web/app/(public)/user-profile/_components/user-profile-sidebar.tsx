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

type TabType = "details" | "watchlist" | "billing" | "playback" | "security";

interface UserProfileSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
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
  );
};

export default UserProfileSidebar;
