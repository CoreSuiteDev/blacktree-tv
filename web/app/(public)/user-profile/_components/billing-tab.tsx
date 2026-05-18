"use client";

import { CreditCard } from "lucide-react";

const BillingTab = () => {
  return (
    <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 h-full min-h-[320px]">
      <div className="flex items-center gap-2 text-neutral-200 font-medium text-sm border-b border-neutral-900 pb-3 mb-4">
        <CreditCard size={16} className="text-red-500" />
        <span>Membership & Billing</span>
      </div>
      <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-xl space-y-2">
        <p className="text-xs text-neutral-400 uppercase tracking-wider font-bold">
          Active Framework Plan
        </p>
        <p className="text-xl font-bold text-white">Premium Tier 4K HDR</p>
        <p className="text-xs text-neutral-500">
          Your invoice auto-renews monthly using linked instrument terminal
          maps.
        </p>
      </div>
    </div>
  );
};

export default BillingTab;
