"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  KeyRound,
  Fingerprint,
  Smartphone,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SecurityTab = () => {
  // Local state for interactive UI toggles
  const [twoFactor, setTwoFactor] = useState(false);

  // Mock handler for credential update execution
  const handleUpdateCredentials = () => {
    // Pipeline logic for password reset triggering
    console.log("Initiating secure credential renegotiation pipeline.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full">
      {/* SECTION 1: COMPONENT HEADER */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-muted rounded-lg border border-border">
            <ShieldAlert size={18} className="text-primary" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-foreground tracking-wide font-sans">
              Security Infrastructure
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Manage your cryptographic credentials, multi-factor verification
              nodes, and active session boundaries.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRIMARY CREDENTIAL CONTROL PANEL */}
      <div className="bg-card text-card-foreground border border-border rounded-xl p-5 space-y-4 shadow-sm">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold block font-sans">
          Cryptographic Identification
        </span>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-muted/30 border border-border/60 p-4 rounded-xl gap-4 transition-all hover:border-border">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-muted rounded-lg border border-border/40 text-muted-foreground mt-0.5">
              <KeyRound size={16} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold tracking-tight text-foreground font-sans">
                Master Account Password
              </h4>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                Last altered approximately 3 months ago. We recommend cyclic
                rotation every 180 days.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleUpdateCredentials}
            className="h-9 px-4 text-xs font-bold border-border/80 hover:bg-muted text-foreground font-sans transition-all self-start sm:self-center shrink-0"
          >
            Update Credentials
          </Button>
        </div>
      </div>

      <Separator className="bg-border/60" />

      {/* SECTION 3: MULTI-FACTOR & ADVANCED SECURITY CONTROL MAPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* INTERFACE A: TWO-FACTOR AUTHENTICATION */}
        <div className="flex items-center justify-between p-4 bg-card text-card-foreground border border-border rounded-xl shadow-sm transition-all hover:border-border/80">
          <div className="flex gap-3 items-start pr-4">
            <div className="p-2 bg-muted rounded-lg border border-border/40 text-muted-foreground mt-0.5">
              <Fingerprint size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold tracking-tight text-foreground font-sans">
                Two-Factor Verification (2FA)
              </p>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                Enforce multi-layered validation logic via external
                authenticator engines.
              </p>
            </div>
          </div>
          <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
        </div>

        {/* INTERFACE B: ACTIVE SESSIONS MONITOR */}
        <div className="flex items-center justify-between p-4 bg-card text-card-foreground border border-border rounded-xl shadow-sm transition-all hover:border-border/80">
          <div className="flex gap-3 items-start pr-4">
            <div className="p-2 bg-muted rounded-lg border border-border/40 text-muted-foreground mt-0.5">
              <Smartphone size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold tracking-tight text-foreground font-sans">
                Active Terminal Sessions
              </p>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                1 device currently authenticated from Dhaka, Bangladesh.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted shrink-0 rounded-lg"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* SECTION 4: GLOBAL ACCOUNT REVOCATION BARRIER */}
      <div className="p-4 bg-destructive/5 border border-destructive/10 rounded-xl flex items-center justify-between transition-all hover:border-destructive/20 mt-2">
        <div className="flex gap-3 items-start pr-4">
          <div className="p-2 bg-destructive/10 rounded-lg text-destructive mt-0.5">
            <LogOut size={16} />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-bold tracking-tight text-destructive font-sans">
              Terminate All Other Sessions
            </p>
            <p className="text-xs text-muted-foreground/80 font-sans leading-relaxed">
              Instantly revoke token authorizations and sign out of all
              concurrent devices except this terminal.
            </p>
          </div>
        </div>
        <Button
          variant="destructive"
          className="h-9 px-4 text-xs font-bold font-sans transition-all shrink-0 bg-destructive/90 hover:bg-destructive"
        >
          Revoke Access
        </Button>
      </div>
    </div>
  );
};

export default SecurityTab;
