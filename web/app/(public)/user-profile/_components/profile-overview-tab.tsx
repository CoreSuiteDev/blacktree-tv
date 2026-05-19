"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
  User,
  Camera,
  CreditCard,
  Tv,
  Zap,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Hourglass,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useUserProfileStore } from "@/store/public/use-user-profile-store";

const ProfileOverview = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Binding data and methods directly from the Zustand store
  const {
    profile,
    editName,
    editEmail,
    editPhone,
    editUsername,
    countdownText,
    setProfile,
    setEditFields,
    setCountdownText,
    savePersonalDetails,
  } = useUserProfileStore();

  const hasActiveSubscription = !!profile?.membershipTier;

  // Handle Expiration Live Countdown synced directly to store metadata
  useEffect(() => {
    if (!hasActiveSubscription || !profile.expirationDate) return;

    const updateCountdown = () => {
      const difference = +new Date(profile.expirationDate) - +new Date();

      if (difference <= 0) {
        setCountdownText("Expired");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdownText(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [profile.expirationDate, hasActiveSubscription, setCountdownText]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setProfile({ avatar: localUrl });
    }
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      {/* SECTION 1: HERO CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Premium Avatar & Status Card */}
        <Card className="md:col-span-4 bg-card border-border flex flex-col items-center text-center justify-between p-6 min-h-[420px] relative overflow-hidden shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-destructive" />

          <div className="flex flex-col items-center mt-4 w-full">
            {/* Avatar Wrapper */}
            <div className="relative w-28 h-28 bg-background/50 rounded-full flex items-center justify-center border-2 border-primary/40 group overflow-hidden mb-4 shadow-xl transition-transform duration-300 hover:scale-105">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <User size={44} className="text-muted-foreground" />
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer text-[10px] font-bold text-foreground tracking-widest"
              >
                <Camera size={16} className="mb-1 text-primary" />
                CHANGE
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <h2 className="text-lg font-bold tracking-tight text-foreground font-sans truncate max-w-full">
              {profile.name || "Asif Hosen"}
            </h2>

            <span
              className={`text-[10px] font-extrabold mt-2.5 px-3 py-1 rounded-full border tracking-wider uppercase font-sans ${
                hasActiveSubscription
                  ? "text-foreground bg-primary/10 border-primary/20"
                  : "text-muted-foreground bg-background border-border"
              }`}
            >
              {hasActiveSubscription
                ? profile.membershipTier
                : "No Active Tier"}
            </span>
          </div>

          {/* Core Telemetry Info Lines */}
          <div className="w-full space-y-2.5 mt-6 pt-4 border-t border-border/60">
            <div className="flex justify-between items-center text-xs px-1">
              <span className="text-muted-foreground font-medium">Status</span>
              <span
                className={`font-bold uppercase text-[11px] ${
                  hasActiveSubscription
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {hasActiveSubscription ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Line 1: Purchase Date */}
            <div className="flex flex-col items-stretch text-left bg-background/30 p-2.5 rounded-lg border border-border/40 gap-1">
              <span className="text-[9px] uppercase text-muted-foreground font-bold tracking-wider block">
                Purchase Date
              </span>
              <div className="flex items-center gap-1.5 text-foreground font-mono text-[11px]">
                <CalendarDays size={12} className="text-primary" />
                <span>May 12, 2026</span>
              </div>
            </div>

            {/* Line 2: Subscription Ends In Countdown */}
            <div className="flex flex-col items-stretch text-left bg-background/30 p-2.5 rounded-lg border border-border/40 gap-1">
              <span className="text-[9px] uppercase text-muted-foreground font-bold tracking-wider block">
                Subscription Ends In
              </span>
              <div className="flex items-center gap-1.5 text-primary font-mono font-bold text-[11px]">
                <Hourglass size={12} className="text-primary animate-pulse" />
                <span>
                  {hasActiveSubscription ? countdownText : "No active cycle"}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Side: Core Personal Information Form */}
        <Card className="md:col-span-8 bg-card border-border flex flex-col justify-between min-h-[380px] shadow-md">
          <div>
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <User size={16} className="text-primary" />
                <CardTitle className="text-base tracking-tight font-sans">
                  Personal Information
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-muted-foreground font-sans pl-6">
                Update your public profile configuration and location identity
                metadata.
              </CardDescription>
            </CardHeader>

            <Separator className="bg-border" />

            <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 1: Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-0.5">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditFields({ editName: e.target.value })}
                  className="bg-background/50 border-border focus-visible:ring-primary h-10 text-sm text-foreground"
                />
              </div>

              {/* Field 2: Username */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-0.5">
                  Username
                </label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    value={editUsername || ""}
                    onChange={(e) =>
                      setEditFields({ editUsername: e.target.value })
                    }
                    className="bg-background/50 border-border focus-visible:ring-primary h-10 text-sm text-foreground"
                    placeholder="e.g. asifhosen"
                  />
                </div>
              </div>

              {/* Field 3: Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-0.5">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditFields({ editEmail: e.target.value })}
                  className="bg-background/50 border-border focus-visible:ring-primary h-10 text-sm text-foreground"
                />
              </div>

              {/* Field 4: Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-0.5">
                  Phone Number
                </label>
                <Input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditFields({ editPhone: e.target.value })}
                  className="bg-background/50 border-border focus-visible:ring-primary h-10 text-sm text-foreground"
                />
              </div>
            </CardContent>
          </div>

          <CardContent className="pt-0 flex justify-end">
            <Button
              onClick={savePersonalDetails}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold px-6 py-5 rounded-lg tracking-wider uppercase shadow-sm transition-all"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 2: MEMBERSHIP STATUS DETAILS ROW */}
      <Card className="bg-card border-border shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/80 pb-4 mb-5 gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-lg border ${
                  hasActiveSubscription
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "bg-background border-border text-muted-foreground"
                }`}
              >
                <CreditCard size={18} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-foreground font-sans">
                  Active Plan Architecture
                </h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Your streaming network package details and tier billing
                  cycles.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1">
              {hasActiveSubscription ? (
                <>
                  <span className="px-3 py-1 bg-background text-foreground border border-border font-bold text-[10px] tracking-widest uppercase rounded font-mono">
                    Next Renewal: June 12, 2026
                  </span>
                  <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    {countdownText} remaining
                  </span>
                </>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-background text-muted-foreground border border-border font-bold text-[10px] tracking-widest uppercase rounded">
                  <AlertCircle size={12} className="text-muted-foreground/60" />
                  Subscription Required
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-background/40 border border-border/80 p-4 rounded-xl flex items-center gap-3">
              <Zap
                className={`${hasActiveSubscription ? "text-primary" : "text-muted-foreground/60"} shrink-0`}
                size={20}
              />
              <div className="space-y-0.5">
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                  Tier Rate
                </span>
                <p className="text-sm font-bold text-foreground">
                  {hasActiveSubscription ? "$14.99" : "$0.00"}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    / month
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-background/40 border border-border/80 p-4 rounded-xl flex items-center gap-3">
              <Tv
                className={`${hasActiveSubscription ? "text-primary" : "text-muted-foreground/60"} shrink-0`}
                size={20}
              />
              <div className="space-y-0.5">
                <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                  Concurrent Streams
                </span>
                <p className="text-sm font-semibold text-foreground">
                  {hasActiveSubscription
                    ? "4 Screens Simultaneously"
                    : "0 Screens Available"}
                </p>
              </div>
            </div>

            <div className="bg-background/40 border border-border/80 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className={`${hasActiveSubscription ? "text-primary" : "text-muted-foreground/60"} shrink-0`}
                />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-muted-foreground block font-bold uppercase tracking-wider">
                    Payment Method
                  </span>
                  <p className="text-xs font-semibold text-foreground/90">
                    {hasActiveSubscription
                      ? "Visa ending in •••• 4242"
                      : "No payment configuration"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
