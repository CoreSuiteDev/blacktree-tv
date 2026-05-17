"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  User,
  CreditCard,
  Tv,
  ShieldCheck,
  Sliders,
  LogOut,
  KeyRound,
  Smartphone,
  Laptop,
  Camera,
  Mail,
  Clock,
  Trash2,
  Bookmark,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  useUserProfileStore,
  PlaylistItem,
  Device,
} from "@/store/public/use-user-profile-store";

const UserProfileDetails = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, setProfile, revokeDevice, removeFromWatchlist } =
    useUserProfileStore();

  const [activeTab, setActiveTab] = useState<
    "details" | "watchlist" | "billing" | "playback" | "security"
  >("details");

  // Initialize state directly from store or fallbacks
  const [editName, setEditName] = useState<string>(() => profile?.name || "");
  const [editEmail, setEditEmail] = useState<string>(
    () => profile?.email || "",
  );
  const [editPhone, setEditPhone] = useState<string>(
    () => profile?.phone || "",
  );

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Determine days left derived directly during render
  let daysLeft = 0;
  if (profile?.expirationDate) {
    const difference = +new Date(profile.expirationDate) - +new Date();
    if (difference > 0) {
      daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    }
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setProfile({ avatar: localUrl });
    }
  };

  const savePersonalDetails = () => {
    setProfile({ name: editName, email: editEmail, phone: editPhone });
    alert("Personal profile dimensions have updated successfully!");
  };

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert(
        "Please balance all parameter entries for processing security upgrades.",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      alert(
        "Validation failed. New and Confirmation strings must mismatch precisely zero characters.",
      );
      return;
    }
    alert("Security matrix verified. Credentials assigned successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!profile) {
    return (
      <div className="text-white text-center py-16">
        Loading profile context...
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#070707] text-white py-16 px-4 lg:px-0 font-sans mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* --- SIDEBAR DASHBOARD NAVIGATION --- */}
          <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-6">
            {/* INTEGRATED SIDEBAR PROFILE HEADER */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-neutral-900">
              <div className="relative w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center border-2 border-red-600/40 group shadow-inner overflow-hidden mb-4">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User size={44} className="text-neutral-500" />
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer text-[10px] font-bold tracking-wider border-none text-white"
                >
                  <Camera size={16} className="mb-1 text-red-500" />
                  UPLOAD
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <h1 className="text-xl font-semibold tracking-tight text-neutral-100 truncate w-full max-w-[220px]">
                {profile.name}
              </h1>
              <p className="text-[10px] text-neutral-500 tracking-wide mt-1">
                Client ID: #BTV-99482
              </p>

              <div className="flex flex-col items-center gap-2 mt-4 w-full">
                <span className="w-full bg-red-950/40 text-red-500 border border-red-900/50 text-[10px] font-bold py-1 rounded-sm uppercase tracking-wider text-center">
                  {profile.membershipTier}
                </span>
                <span className="w-full flex items-center justify-center gap-1.5 text-neutral-400 text-xs bg-neutral-900 py-1 border border-neutral-800 rounded-sm">
                  <Clock size={12} className="text-red-500" />
                  <b className="text-neutral-200">{daysLeft} Days</b> Left
                </span>
              </div>
            </div>

            {/* DASHBOARD MANUS / LINKS */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-neutral-500 tracking-[0.2em] uppercase px-3 mb-3">
                Account Workspace
              </p>

              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "details" ? "bg-neutral-900 text-white border-l-2 border-red-600 pl-2" : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"}`}
              >
                <User
                  size={16}
                  className={activeTab === "details" ? "text-red-500" : ""}
                />
                Personal Details
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("watchlist")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "watchlist" ? "bg-neutral-900 text-white border-l-2 border-red-600 pl-2" : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"}`}
              >
                <Bookmark
                  size={16}
                  className={activeTab === "watchlist" ? "text-red-500" : ""}
                />
                My Saved Playlist
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("billing")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "billing" ? "bg-neutral-900 text-white border-l-2 border-red-600 pl-2" : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"}`}
              >
                <CreditCard
                  size={16}
                  className={activeTab === "billing" ? "text-red-500" : ""}
                />
                Subscription Details
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("playback")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "playback" ? "bg-neutral-900 text-white border-l-2 border-red-600 pl-2" : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"}`}
              >
                <Sliders
                  size={16}
                  className={activeTab === "playback" ? "text-red-500" : ""}
                />
                Playback Controls
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "security" ? "bg-neutral-900 text-white border-l-2 border-red-600 pl-2" : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"}`}
              >
                <ShieldCheck
                  size={16}
                  className={activeTab === "security" ? "text-red-500" : ""}
                />
                Security Terminal
              </button>

              <div className="border-t border-neutral-900 mt-4 pt-4">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-950/10 transition-colors"
                >
                  <LogOut size={16} /> Terminate Session
                </button>
              </div>
            </div>
          </div>

          {/* --- DASHBOARD VIEWPORTS --- */}
          <div className="md:col-span-2">
            {/* VIEWPORT: PERSONAL DETAILS */}
            {activeTab === "details" && (
              <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-6">
                <div className="border-b border-neutral-900 pb-4">
                  <h3 className="text-base font-semibold tracking-wide text-neutral-200">
                    Personal Properties
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Control operational system email destinations and tags.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Display Pseudonym
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Communication Channel (Email)
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-3 text-neutral-600"
                          size={16}
                        />
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full bg-[#111] border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Phone Link
                      </label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={savePersonalDetails}
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold px-6 py-3 rounded-md uppercase tracking-wider"
                  >
                    Save Structural Alterations
                  </Button>
                </div>
              </div>
            )}

            {/* VIEWPORT: WATCHLIST */}
            {activeTab === "watchlist" && (
              <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-6">
                <div className="border-b border-neutral-900 pb-4">
                  <h3 className="text-base font-semibold tracking-wide text-neutral-200">
                    My Saved Playlist Collection
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Quick access entries reserved for structural media
                    consumption streams.
                  </p>
                </div>

                {!profile.watchlist || profile.watchlist.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic text-center py-8">
                    Your dashboard custom playlist is completely empty.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.watchlist.map((item: PlaylistItem) => (
                      <div
                        key={item.id}
                        className="group relative flex items-center gap-4 p-3 bg-neutral-900/40 rounded-lg border border-neutral-900 overflow-hidden"
                      >
                        <div className="relative w-16 h-20 bg-neutral-800 rounded flex-shrink-0 overflow-hidden">
                          <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center text-xs text-neutral-500 font-bold">
                            POSTER
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-neutral-200 truncate group-hover:text-red-500 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {item.year} • IMDb:{" "}
                            <b className="text-neutral-400">{item.rating}</b>
                          </p>

                          <div className="flex items-center gap-3 mt-3">
                            <button
                              type="button"
                              className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-white uppercase font-bold tracking-wider transition-colors border-none bg-transparent"
                            >
                              <Eye size={12} /> Streaming Now
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromWatchlist(item.id)}
                              className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-red-500 uppercase font-bold tracking-wider transition-colors border-none bg-transparent"
                            >
                              <Trash2 size={12} /> Wipe
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEWPORT: BILLING */}
            {activeTab === "billing" && (
              <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-6">
                <div className="border-b border-neutral-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold tracking-wide text-neutral-200">
                      Subscription & Billing Engine
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Review recurring account subscription layers and next
                      invoice milestones.
                    </p>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-md px-4 py-2 tracking-wide text-xs uppercase shadow-md self-start sm:self-center">
                    Extend Membership
                  </Button>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                      Active Plan Framework
                    </p>
                    <p className="text-lg font-bold text-neutral-200">
                      {profile.membershipTier}
                    </p>
                    <p className="text-xs text-neutral-400">
                      Resolution tier mapping: Up to 4K Ultra HD + HDR stream
                      pipes.
                    </p>
                  </div>
                  <div className="space-y-1 sm:text-right">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                      Expiration Cycle Metric
                    </p>
                    <p className="text-lg font-bold text-red-500">
                      {daysLeft} Days Remaining
                    </p>
                    <p className="text-xs text-neutral-400">
                      Account status expires:{" "}
                      {profile.expirationDate
                        ? new Date(profile.expirationDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Primary Invoice Instrument
                  </p>
                  <div className="flex items-center justify-between p-4 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-neutral-900 px-2.5 py-1.5 rounded border border-neutral-800 text-xs font-black italic tracking-tighter text-neutral-400">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-200">
                          •••• •••• •••• 4821
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Expires 11/29
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-neutral-400 hover:text-white font-bold uppercase tracking-wider border-none bg-transparent"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEWPORT: PLAYBACK */}
            {activeTab === "playback" && (
              <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-6">
                <div className="border-b border-neutral-900 pb-4">
                  <h3 className="text-base font-semibold tracking-wide text-neutral-200">
                    Playback Configurations
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Fine-tune automated continuous media feed settings.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/40 border border-neutral-900">
                    <div>
                      <p className="text-sm font-medium text-neutral-300">
                        Autoplay Next Episode
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Instruct UI loop mechanisms to spool sequential media
                        nodes instantly.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!profile.autoplay}
                      onChange={(e) =>
                        setProfile({ autoplay: e.target.checked })
                      }
                      className="w-4 h-4 accent-red-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/40 border border-neutral-900">
                    <div>
                      <p className="text-sm font-medium text-neutral-300">
                        Restrict Mature Audiovisual Content
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Filter explicit layout indices from direct content
                        search structures.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!profile.matureContent}
                      onChange={(e) =>
                        setProfile({ matureContent: e.target.checked })
                      }
                      className="w-4 h-4 accent-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* VIEWPORT: SECURITY TERMINAL */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <form
                  onSubmit={handlePasswordReset}
                  className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-6"
                >
                  <div className="border-b border-neutral-900 pb-4">
                    <h3 className="text-base font-semibold tracking-wide text-neutral-200">
                      Credential Matrix Overhaul
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Change validation keys to safe-keep terminal access logs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Current Password Verification
                      </label>
                      <div className="relative">
                        <KeyRound
                          className="absolute left-3 top-3 text-neutral-600"
                          size={16}
                        />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-[#111] border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          New Password Variant
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          Confirm Mutation Match
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3 rounded-md uppercase tracking-wider"
                    >
                      Re-Key Account Validation
                    </Button>
                  </div>
                </form>

                <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-6">
                  <div className="border-b border-neutral-900 pb-4">
                    <h3 className="text-base font-semibold tracking-wide text-neutral-200">
                      Authorized Machine Nodes
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Isolate or revoke external terminals accessing your active
                      premium pipeline profiles.
                    </p>
                  </div>

                  <div className="divide-y divide-neutral-900">
                    {profile.devices?.map((device: Device) => {
                      const DeviceIcon =
                        device.icon === "Tv"
                          ? Tv
                          : device.icon === "Smartphone"
                            ? Smartphone
                            : Laptop;
                      return (
                        <div
                          key={device.id}
                          className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-neutral-900 rounded-lg text-neutral-400">
                              <DeviceIcon size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-neutral-200 flex items-center gap-2">
                                {device.name}
                                {device.current && (
                                  <span className="bg-emerald-950 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                    Current Pipe
                                  </span>
                                )}
                              </p>
                              <p className="text-[11px] text-neutral-500 mt-0.5">
                                {device.location}
                              </p>
                            </div>
                          </div>

                          {!device.current && (
                            <button
                              type="button"
                              onClick={() => revokeDevice(device.id)}
                              className="text-xs text-neutral-500 hover:text-red-500 font-semibold uppercase tracking-wider transition-colors border-none bg-transparent"
                            >
                              Revoke Access
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileDetails;
