"use client";

import React from "react";
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Download,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INVOICE_HISTORY } from "@/constants/profile";

const BillingTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full">
      {/* SECTION 1: COMPONENT HEADER */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-muted rounded-lg border border-border">
            <CreditCard size={18} className="text-primary" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-foreground tracking-wide font-sans">
              Membership & Billing
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Manage your subscription architecture, payment instruments, and
              invoices.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: GRID LAYOUT FOR PLAN & PAYMENT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* CARD A: ACTIVE PLAN DETAILS (7 Columns) */}
        <div className="md:col-span-7 bg-card text-card-foreground border border-border rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm">
          {/* Top Decorative Gradient Line using theme primary */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-mono font-bold tracking-widest bg-primary/5 text-primary border-primary/20 px-2 py-0.5"
                >
                  Current Plan
                </Badge>
                <h4 className="text-xl font-extrabold text-foreground tracking-tight mt-2 font-sans">
                  Premium Tier 4K HDR
                </h4>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-foreground font-mono">
                  $14.99
                </p>
                <p className="text-[10px] text-muted-foreground font-medium font-sans">
                  With VAT / month
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-muted/40 p-3 rounded-lg border border-border/60 font-mono text-[11px]">
              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] uppercase block tracking-wider font-sans font-bold">
                  Next Billing Date
                </span>
                <div className="flex items-center gap-1.5 text-foreground/90">
                  <Calendar size={12} className="text-primary" />
                  <span>June 12, 2026</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] uppercase block tracking-wider font-sans font-bold">
                  Payment Term
                </span>
                <div className="flex items-center gap-1.5 text-foreground/90">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>Auto-Renew On</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 mt-5 pt-3 border-t border-border/40">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-4 rounded-lg tracking-wide uppercase"
            >
              Upgrade Plan <Zap size={12} className="ml-1.5 fill-current" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted font-bold text-xs px-4 rounded-lg tracking-wide uppercase"
            >
              Cancel Membership
            </Button>
          </div>
        </div>

        {/* CARD B: PAYMENT METHOD DISPLAY (5 Columns) */}
        <div className="md:col-span-5 bg-card text-card-foreground border border-border rounded-xl p-5 flex flex-col justify-between min-h-[220px] shadow-sm">
          <div className="space-y-3">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold block font-sans">
              Default Instrument
            </span>

            {/* Holographic Styled Credit Card Shell matched to system tokens */}
            <div className="w-full bg-gradient-to-br from-muted/50 to-muted border border-border p-4 rounded-xl space-y-4 relative overflow-hidden group shadow-inner">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl transition-all group-hover:bg-primary/10" />

              <div className="flex justify-between items-center">
                <div className="w-8 h-5 bg-card rounded-sm border border-border flex items-center justify-center text-[8px] font-mono tracking-widest text-muted-foreground font-bold">
                  CHIP
                </div>
                <span className="text-xs font-black italic tracking-wider bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-sans">
                  VISA
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-mono font-bold tracking-widest text-foreground">
                  •••• •••• •••• 4242
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                  <span className="uppercase font-sans font-semibold">
                    Asif Hosen
                  </span>
                  <span>12 / 29</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-border bg-transparent text-foreground/90 hover:bg-muted font-bold text-xs py-4 rounded-lg tracking-wide mt-3 uppercase"
          >
            Update Gateway{" "}
            <ArrowUpRight size={13} className="ml-1.5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* SECTION 3: TRANSACTION LOG MATRIX (INVOICE HISTORY) */}
      <div className="bg-card text-card-foreground border border-border rounded-xl p-5 space-y-3 shadow-sm">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold block font-sans">
          Historical Statement Vault
        </span>

        <div className="border border-border rounded-xl overflow-hidden bg-muted/10">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  <th className="py-3 px-4 font-semibold">Invoice ID</th>
                  <th className="py-3 px-4 font-semibold">Billing Date</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs text-foreground/90 font-mono divide-y divide-border/60">
                {INVOICE_HISTORY.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-muted/30 transition-all duration-150"
                  >
                    <td className="py-3.5 px-4 font-medium text-muted-foreground">
                      {invoice.id}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {invoice.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      {invoice.amount}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-none font-sans">
                        <CheckCircle2 size={10} /> {invoice.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent hover:border-border rounded-md transition-all"
                      >
                        <Download size={13} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTab;
