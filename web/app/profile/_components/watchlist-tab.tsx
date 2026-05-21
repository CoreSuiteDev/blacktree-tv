"use client";

import React from "react";
import { Bookmark, Trash2, Film, Star, Calendar } from "lucide-react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import { Button } from "@/components/ui/button";

const WatchlistTab = () => {
  const { profile, removeFromWatchlist } = useUserProfileStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full">
      {/* SECTION 1: COMPONENT HEADER */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-muted rounded-lg border border-border">
            <Bookmark size={18} className="text-primary" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-foreground tracking-wide font-sans">
              My Saved Watchlist
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Curate, monitor, and manage your personalized queue of premium
              media assets and streams.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: GRID CONTAINER FOR WATCHLIST ITEMS */}
      {!profile?.watchlist || profile.watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-border/80 bg-card rounded-xl p-16 text-center shadow-sm">
          <div className="p-3 bg-muted rounded-full border border-border text-muted-foreground mb-3">
            <Film size={20} className="opacity-60" />
          </div>
          <p className="text-xs font-medium text-muted-foreground/80 font-sans tracking-wide">
            Your custom playlist queue is currently empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.watchlist.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between p-3.5 bg-card text-card-foreground border border-border rounded-xl shadow-sm transition-all hover:border-border/80"
            >
              {/* ITEM META CLUSTER */}
              <div className="flex items-center gap-3">
                {/* Visual Placeholder Asset Node */}
                <div className="h-10 w-10 shrink-0 bg-muted border border-border/40 rounded-lg flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                  <Film size={16} />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold tracking-tight text-foreground font-sans line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-sans font-medium">
                    <span className="flex items-center gap-0.5">
                      <Calendar size={10} className="opacity-70" />
                      {item.year}
                    </span>
                    <span className="text-border/80">•</span>
                    <span className="flex items-center gap-0.5 text-amber-500/90 font-bold">
                      <Star size={10} className="fill-amber-500/20" />
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION: TERMINATE FROM QUEUE */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromWatchlist(item.id)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 rounded-lg h-8 w-8 transition-all"
                aria-label={`Remove ${item.title} from watchlist`}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistTab;
