"use client";
import React, { useState } from "react";
import { User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";

const PersonalDetailsTab = () => {
  const { profile, setProfile } = useUserProfileStore();

  const [editName, setEditName] = useState<string>(() => profile?.name || "");
  const [editEmail, setEditEmail] = useState<string>(
    () => profile?.email || "",
  );
  const [editPhone, setEditPhone] = useState<string>(
    () => profile?.phone || "",
  );
  const [timezone, setTimezone] = useState<string>("Pacific Time (PT)");

  const savePersonalDetails = () => {
    setProfile({ name: editName, email: editEmail, phone: editPhone });
    alert("Personal modifications saved successfully!");
  };

  return (
    <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 flex flex-col justify-between h-full min-h-[320px]">
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-neutral-200 font-medium text-sm border-b border-neutral-900 pb-3">
          <User size={16} className="text-red-500" />
          <span>Personal Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-[#111622] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full bg-[#111622] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full bg-[#111622] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-[#111622] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-400 focus:outline-none focus:border-red-600 appearance-none cursor-pointer"
            >
              <option>Pacific Time (PT)</option>
              <option>Bangladesh Time (BST)</option>
              <option>Central European Time (CET)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={savePersonalDetails}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg tracking-wider"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;
