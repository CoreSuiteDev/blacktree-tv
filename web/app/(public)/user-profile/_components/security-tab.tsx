"use client";
import React from "react";
import { KeyRound, ShieldAlert, ShieldCheck } from "lucide-react";

const SecurityTab = () => {
  return (
    <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 h-full min-h-[320px] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-neutral-200 font-medium text-sm border-b border-neutral-900 pb-3">
          <ShieldAlert size={16} className="text-red-500" />
          <span>Security</span>
        </div>

        <div className="bg-[#111] border border-neutral-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-neutral-200">Password</h4>
            <p className="text-xs text-neutral-500 mt-1">
              Last changed 3 months ago
            </p>
          </div>
          <button className="text-xs text-red-500 font-bold hover:underline">
            Update
          </button>
        </div>
      </div>
      {/* SECTION 3: INLINE INTEGRATED QUICK SECURITY CONTROL PANEL */}
      <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6">
        <div className="flex items-center gap-2.5 text-neutral-200 font-semibold text-sm border-b border-neutral-900 pb-3 mb-4">
          <ShieldCheck size={16} className="text-red-500" />
          <span>Security Snapshot</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#111111]/40 border border-neutral-900 p-4 rounded-xl gap-4">
          <div className="flex items-start gap-3">
            <KeyRound size={18} className="text-neutral-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Account Password</h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Last altered approximately 3 months ago.
              </p>
            </div>
          </div>
          <button className="text-xs font-bold text-red-500 hover:text-red-400 tracking-wider uppercase bg-red-500/5 hover:bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/10 transition-all self-start sm:self-center">
            Update Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
