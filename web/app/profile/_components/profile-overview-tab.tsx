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
  Mail,
  Phone,
  AtSign,
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
    initializeForm,
  } = useUserProfileStore();

  const hasActiveSubscription = !!profile?.membershipTier;

  // Initialize form fields on component mount
  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

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
    <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SECTION 1: HERO CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Premium Avatar & Status Card */}
        <Card className="lg:col-span-4 bg-neutral-950/40 backdrop-blur-md border border-neutral-900 shadow-2xl flex flex-col items-center text-center justify-between p-6 min-h-[440px] relative overflow-hidden rounded-2xl transition-all duration-300 hover:border-neutral-800/80">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-red-600 via-rose-500 to-amber-500" />

          <div className="flex flex-col items-center mt-6 w-full">
            {/* Avatar Wrapper */}
            <div className="relative w-32 h-32 rounded-full flex items-center justify-center border-2 border-dashed border-red-500/20 hover:border-red-500/40 p-1.5 transition-all duration-500 group">
              <div className="relative w-full h-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 shadow-xl">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt="Avatar"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-400">
                    <User size={48} className="text-neutral-500 transition-colors duration-300" />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <Camera size={20} className="mb-1 text-red-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">
                    Change
                  </span>
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <h2 className="text-xl font-extrabold tracking-tight text-white mt-4 max-w-full truncate font-sans hover:text-red-500 transition-colors duration-300">
              {profile.name || "Asif Hosen"}
            </h2>

            <span
              className={`text-[9px] font-extrabold mt-3 px-3 py-1.5 rounded-full border tracking-widest uppercase font-sans transition-all duration-300 ${
                hasActiveSubscription
                  ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                  : "text-neutral-400 bg-neutral-900/50 border-neutral-800"
              }`}
            >
              {hasActiveSubscription
                ? profile.membershipTier
                : "No Active Tier"}
            </span>
          </div>

          {/* Core Telemetry Info Lines */}
          <div className="w-full space-y-3 mt-6 pt-4 border-t border-neutral-900/80">
            <div className="flex justify-between items-center text-xs px-1">
              <span className="text-neutral-400 font-medium">Account Status</span>
              <span className="flex items-center gap-1.5 font-bold uppercase text-[11px]">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    hasActiveSubscription ? "bg-emerald-500 animate-pulse" : "bg-neutral-600"
                  }`}
                />
                <span
                  className={
                    hasActiveSubscription ? "text-emerald-500" : "text-neutral-400"
                  }
                >
                  {hasActiveSubscription ? "Active" : "Inactive"}
                </span>
              </span>
            </div>

            {/* Line 1: Purchase Date */}
            <div className="flex justify-between items-center bg-neutral-950/40 p-3 rounded-xl border border-neutral-900 hover:border-neutral-850/80 transition-colors duration-300">
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase text-neutral-500 font-bold tracking-wider">
                  Purchase Date
                </span>
                <span className="text-[11px] font-semibold text-neutral-300 mt-0.5">
                  May 12, 2026
                </span>
              </div>
              <CalendarDays size={14} className="text-neutral-500" />
            </div>

            {/* Line 2: Subscription Ends In Countdown */}
            <div className="flex justify-between items-center bg-neutral-950/40 p-3 rounded-xl border border-neutral-900 hover:border-neutral-850/80 transition-colors duration-300">
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase text-neutral-500 font-bold tracking-wider">
                  Time Remaining
                </span>
                <span
                  className={`text-[11px] font-mono font-bold mt-0.5 ${
                    hasActiveSubscription ? "text-red-500" : "text-neutral-400"
                  }`}
                >
                  {hasActiveSubscription ? countdownText : "No active cycle"}
                </span>
              </div>
              <Hourglass
                size={14}
                className={`text-neutral-500 ${
                  hasActiveSubscription ? "animate-pulse text-red-500" : ""
                }`}
              />
            </div>
          </div>
        </Card>

        {/* Right Side: Core Personal Information Form */}
        <Card className="lg:col-span-8 bg-neutral-950/40 backdrop-blur-md border border-neutral-900 shadow-2xl flex flex-col justify-between p-6 min-h-[440px] rounded-2xl transition-all duration-300 hover:border-neutral-800/80">
          <div className="w-full">
            <div className="flex items-center gap-2.5 pb-2">
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                <User size={16} />
              </div>
              <h3 className="text-base font-extrabold tracking-tight text-white font-sans">
                Personal Information
              </h3>
            </div>
            <p className="text-xs text-neutral-400 font-sans pb-4">
              Update your account details and identity parameters for public display.
            </p>
            <Separator className="bg-neutral-900/80 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 1: Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest pl-0.5">
                  Full Name
                </label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors duration-300">
                    <User size={15} />
                  </span>
                  <Input
                    type="text"
                    value={editName}
                    onChange={(e) =>
                      setEditFields({ editName: e.target.value })
                    }
                    className="bg-neutral-900/30 border-neutral-800 focus-visible:border-red-500/50 focus-visible:ring-1 focus-visible:ring-red-500/50 hover:border-neutral-700 h-11 text-xs text-white pl-10 rounded-xl transition-all font-sans"
                    placeholder="Your Full Name"
                  />
                </div>
              </div>

              {/* Field 2: Username */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest pl-0.5">
                  Username
                </label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors duration-300">
                    <AtSign size={15} />
                  </span>
                  <Input
                    type="text"
                    value={editUsername || ""}
                    onChange={(e) =>
                      setEditFields({ editUsername: e.target.value })
                    }
                    className="bg-neutral-900/30 border-neutral-800 focus-visible:border-red-500/50 focus-visible:ring-1 focus-visible:ring-red-500/50 hover:border-neutral-700 h-11 text-xs text-white pl-10 rounded-xl transition-all font-sans"
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Field 3: Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest pl-0.5">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors duration-300">
                    <Mail size={15} />
                  </span>
                  <Input
                    type="email"
                    value={editEmail}
                    onChange={(e) =>
                      setEditFields({ editEmail: e.target.value })
                    }
                    className="bg-neutral-900/30 border-neutral-800 focus-visible:border-red-500/50 focus-visible:ring-1 focus-visible:ring-red-500/50 hover:border-neutral-700 h-11 text-xs text-white pl-10 rounded-xl transition-all font-sans"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Field 4: Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest pl-0.5">
                  Phone Number
                </label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors duration-300">
                    <Phone size={15} />
                  </span>
                  <Input
                    type="text"
                    value={editPhone}
                    onChange={(e) =>
                      setEditFields({ editPhone: e.target.value })
                    }
                    className="bg-neutral-900/30 border-neutral-800 focus-visible:border-red-500/50 focus-visible:ring-1 focus-visible:ring-red-500/50 hover:border-neutral-700 h-11 text-xs text-white pl-10 rounded-xl transition-all font-sans"
                    placeholder="+8801700000000"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end mt-auto w-full">
            <Button
              onClick={savePersonalDetails}
              className="bg-gradient-to-r from-red-600 to-rose-700 text-white font-extrabold hover:from-red-700 hover:to-rose-800 text-xs px-6 py-5 rounded-xl tracking-widest uppercase hover:shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </div>

      {/* SECTION 2: MEMBERSHIP STATUS DETAILS ROW */}
      <Card className="bg-neutral-950/40 backdrop-blur-md border border-neutral-900 shadow-2xl p-6 rounded-2xl transition-all duration-300 hover:border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-900/80 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                hasActiveSubscription
                  ? "bg-red-500/10 border-red-500/20 text-red-500"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400"
              }`}
            >
              <CreditCard size={18} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-extrabold text-white font-sans">
                Active Plan Architecture
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                Your streaming network package details and tier billing cycles.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5">
            {hasActiveSubscription ? (
              <>
                <span className="px-3 py-1 bg-neutral-900/80 text-neutral-200 border border-neutral-800/60 font-bold text-[10px] tracking-widest uppercase rounded-lg font-mono">
                  Next Renewal: June 12, 2026
                </span>
                <span className="text-[10px] font-mono font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20">
                  {countdownText} remaining
                </span>
              </>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/50 text-neutral-400 border border-neutral-800 font-bold text-[10px] tracking-widest uppercase rounded-lg">
                <AlertCircle size={13} className="text-neutral-500" />
                Subscription Required
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-neutral-900/20 border border-neutral-900/80 hover:border-neutral-800/60 p-4 rounded-xl flex items-center gap-3.5 transition-all duration-300 hover:translate-y-[-2px] group">
            <div className="p-2.5 bg-neutral-900/80 rounded-lg text-neutral-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all duration-300">
              <Zap size={18} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] text-neutral-500 block font-bold uppercase tracking-wider">
                Tier Rate
              </span>
              <p className="text-sm font-extrabold text-white">
                {hasActiveSubscription ? "$14.99" : "$0.00"}{" "}
                <span className="text-xs font-normal text-neutral-400">
                  / month
                </span>
              </p>
            </div>
          </div>

          <div className="bg-neutral-900/20 border border-neutral-900/80 hover:border-neutral-800/60 p-4 rounded-xl flex items-center gap-3.5 transition-all duration-300 hover:translate-y-[-2px] group">
            <div className="p-2.5 bg-neutral-900/80 rounded-lg text-neutral-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all duration-300">
              <Tv size={18} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] text-neutral-500 block font-bold uppercase tracking-wider">
                Concurrent Screens
              </span>
              <p className="text-sm font-semibold text-white">
                {hasActiveSubscription
                  ? "4 Screens Simultaneously"
                  : "0 Screens Available"}
              </p>
            </div>
          </div>

          <div className="bg-neutral-900/20 border border-neutral-900/80 hover:border-neutral-800/60 p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:translate-y-[-2px] group">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-neutral-900/80 rounded-lg text-neutral-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all duration-300">
                <CheckCircle2 size={18} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-neutral-500 block font-bold uppercase tracking-wider">
                  Payment Method
                </span>
                <p className="text-xs font-semibold text-white">
                  {hasActiveSubscription
                    ? "Visa ending in •••• 4242"
                    : "No payment configuration"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileOverview;
