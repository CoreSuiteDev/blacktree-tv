"use client";
import React from "react";
import { Sliders } from "lucide-react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";

const PlaybackTab = () => {
  const { profile, setProfile } = useUserProfileStore();

  return (
    <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 h-full min-h-[320px] space-y-4">
      <div className="flex items-center gap-2 text-neutral-200 font-medium text-sm border-b border-neutral-900 pb-3">
        <Sliders size={16} className="text-red-500" />
        <span>Playback Preferences</span>
      </div>

      <div className="flex items-center justify-between p-4 bg-neutral-900/40 border border-neutral-900 rounded-lg">
        <div>
          <p className="text-sm font-medium text-neutral-200">
            Autoplay Next Episode
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Stream linear visual paths automatically.
          </p>
        </div>
        <input
          type="checkbox"
          checked={!!profile?.autoplay}
          onChange={(e) => setProfile({ autoplay: e.target.checked })}
          className="w-4 h-4 accent-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PlaybackTab;
