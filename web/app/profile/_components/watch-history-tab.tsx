"use client";

import React, { useState } from "react";
import { History, Trash2, Film, Star, Calendar, RefreshCw } from "lucide-react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import { Button } from "@/components/ui/button";

const WatchHistoryTab = () => {
  const { profile, removeFromWatchHistory, clearWatchHistory } = useUserProfileStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleClearHistory = () => {
    clearWatchHistory();
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SECTION 1: HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-4 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 text-red-500">
            <History size={18} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white tracking-wide font-sans">
              Watch History
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Review your recently played movies, series, and streaming logs.
            </p>
          </div>
        </div>

        {profile?.watchHistory && profile.watchHistory.length > 0 && (
          <div className="relative">
            {!showClearConfirm ? (
              <Button
                variant="outline"
                onClick={() => setShowClearConfirm(true)}
                className="h-9 px-4 text-xs font-bold border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 text-red-500 font-sans transition-all duration-300 rounded-xl"
              >
                Clear All History
              </Button>
            ) : (
              <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-900 p-1.5 rounded-xl animate-in fade-in duration-200">
                <span className="text-[10px] font-bold text-neutral-400 px-2">Are you sure?</span>
                <Button
                  onClick={handleClearHistory}
                  className="h-7 px-2.5 text-[10px] font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                >
                  Yes, Clear
                </Button>
                <Button
                  onClick={() => setShowClearConfirm(false)}
                  className="h-7 px-2.5 text-[10px] font-bold bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white rounded-lg transition-all"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 2: ITEMS GRID */}
      {!profile?.watchHistory || profile.watchHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-neutral-900 bg-neutral-950/40 backdrop-blur-md rounded-2xl p-16 text-center shadow-2xl">
          <div className="p-3 bg-neutral-900 rounded-full border border-neutral-850 text-neutral-400 mb-3">
            <Film size={20} className="opacity-60" />
          </div>
          <p className="text-xs font-medium text-neutral-400 font-sans tracking-wide">
            Your watch history is currently empty. Start streaming!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.watchHistory.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between p-4 bg-neutral-950/40 backdrop-blur-md border border-neutral-900 rounded-2xl shadow-2xl transition-all duration-300 hover:border-neutral-800/80 hover:bg-neutral-950/60"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Visual Asset Node */}
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 shrink-0 bg-neutral-900 border border-neutral-850 rounded-xl flex items-center justify-center text-neutral-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all duration-350">
                    <Film size={18} />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold tracking-tight text-white font-sans line-clamp-1 group-hover:text-red-500 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-sans font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} className="opacity-70" />
                        {formatDate(item.watchedAt)}
                      </span>
                      {item.rating && (
                        <>
                          <span className="text-neutral-800">•</span>
                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star size={10} className="fill-amber-500/20" />
                            {item.rating}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Individual Item Remove Action */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromWatchHistory(item.id)}
                  className="text-neutral-500 hover:text-red-500 hover:bg-red-500/10 shrink-0 rounded-xl h-8 w-8 border border-transparent hover:border-neutral-800/60 transition-all duration-300"
                  aria-label={`Remove ${item.title} from history`}
                >
                  <Trash2 size={13} />
                </Button>
              </div>

              {/* Progress Telemetry */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold font-mono text-neutral-500">
                  <span>{item.duration}</span>
                  <span className={item.progress === 100 ? "text-emerald-500" : "text-red-500"}>
                    {item.progress === 100 ? "Completed" : `${item.progress}% watched`}
                  </span>
                </div>
                <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.progress === 100 ? "bg-emerald-600" : "bg-red-600"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchHistoryTab;
