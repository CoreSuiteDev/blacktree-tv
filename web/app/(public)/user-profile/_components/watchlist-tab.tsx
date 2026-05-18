"use client";
import React from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";

const WatchlistTab = () => {
  const { profile, removeFromWatchlist } = useUserProfileStore();

  return (
    <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 h-full min-h-[320px]">
      <div className="flex items-center gap-2 text-neutral-200 font-medium text-sm border-b border-neutral-900 pb-3 mb-4">
        <Bookmark size={16} className="text-red-500" />
        <span>My Saved Watchlist</span>
      </div>

      {!profile?.watchlist || profile.watchlist.length === 0 ? (
        <p className="text-sm text-neutral-500 italic text-center py-12">
          Your playlist is completely empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profile.watchlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-neutral-900/50 rounded-lg border border-neutral-900"
            >
              <div>
                <h4 className="text-sm font-medium text-neutral-200">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {item.year} • Rating: {item.rating}
                </p>
              </div>
              <button
                onClick={() => removeFromWatchlist(item.id)}
                className="text-neutral-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistTab;
