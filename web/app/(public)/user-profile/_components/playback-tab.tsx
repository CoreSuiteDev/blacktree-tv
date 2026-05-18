"use client";

import React, { useState } from "react";
import {
  Sliders,
  Tv,
  ShieldAlert,
  MonitorPlay,
  Volume2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Data Matrices with strict literal types for stability
const QUALITY_OPTIONS = [
  { value: "auto", label: "Auto (Dynamic Resolution Matching)" },
  { value: "uhd", label: "Ultra HD 4K (Forces High Bitrate Matrix)" },
  { value: "fhd", label: "Full HD 1080p (Optimized Data Safe)" },
  { value: "save", label: "Data Saver (Mobile Networks Tier)" },
] as const;

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English (Original Mix Master)" },
  { value: "es", label: "Español (Castilian Dubbing)" },
  { value: "bn", label: "বাংলা (Bengali Translation Architecture)" },
] as const;

const PlaybackTab = () => {
  const { profile, setProfile } = useUserProfileStore();

  // Local states to handle custom popover open states
  const [openQuality, setOpenQuality] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  // States initialized with strict default fallbacks
  const [quality, setQuality] = useState<string>("auto");
  const [language, setLanguage] = useState<string>("en");

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full">
      {/* SECTION 1: COMPONENT HEADER */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-muted rounded-lg border border-border">
            <Sliders size={18} className="text-primary" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-foreground tracking-wide font-sans">
              Playback Preferences
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Configure your automated stream delivery pipelines, data
              consumption limits, and restrictions.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: TOGGLE CONTROL INTERFACES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* INTERFACE A: AUTOPLAY CONFIGURATION */}
        <div className="flex items-center justify-between p-4 bg-card text-card-foreground border border-border rounded-xl shadow-sm transition-all hover:border-border/80">
          <div className="flex gap-3 items-start pr-4">
            <div className="p-2 bg-muted rounded-lg border border-border/40 text-muted-foreground mt-0.5">
              <MonitorPlay size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold tracking-tight text-foreground font-sans">
                Autoplay Next Episode
              </p>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                Stream linear visual sequences automatically without manual
                trigger interventions.
              </p>
            </div>
          </div>
          <Switch
            checked={!!profile?.autoplay}
            onCheckedChange={(checked) => setProfile({ autoplay: checked })}
          />
        </div>

        {/* INTERFACE B: MATURE CONTENT RESTRICTION */}
        <div className="flex items-center justify-between p-4 bg-card text-card-foreground border border-border rounded-xl shadow-sm transition-all hover:border-border/80">
          <div className="flex gap-3 items-start pr-4">
            <div className="p-2 bg-muted rounded-lg border border-border/40 text-muted-foreground mt-0.5">
              <ShieldAlert size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold tracking-tight text-foreground font-sans">
                R-Rated & Mature Content
              </p>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                Bypass warning barriers and permit unrated explicit materials
                directly inside your active stream.
              </p>
            </div>
          </div>
          <Switch
            checked={!!profile?.matureContent}
            onCheckedChange={(checked) =>
              setProfile({ matureContent: checked })
            }
          />
        </div>
      </div>

      <Separator className="bg-border/60" />

      {/* SECTION 3: MEDIA RESOLUTION & LANGUAGE - POP-OVER REPLACEMENTS */}
      <div className="bg-card text-card-foreground border border-border rounded-xl p-5 space-y-4 shadow-sm">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold block font-sans">
          Stream Delivery Environment
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* POPOVER CONTROL 1: VIDEO QUALITY */}
          <div className="space-y-2 flex flex-col">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-0.5 font-sans">
              <Tv size={12} className="text-primary" />
              Video Quality Target
            </label>

            <Popover open={openQuality} onOpenChange={setOpenQuality}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openQuality}
                  className="bg-muted/40 border-border hover:bg-muted/60 justify-between h-10 text-xs text-foreground/90 font-sans font-normal w-full px-3"
                >
                  {quality
                    ? QUALITY_OPTIONS.find((opt) => opt.value === quality)
                        ?.label
                    : "Select Target Quality..."}
                  <ChevronsUpDown
                    size={14}
                    className="ml-2 shrink-0 opacity-50"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-popover border border-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 w-[var(--radix-popover-trigger-width)]">
                <Command className="bg-transparent">
                  <CommandList>
                    <CommandGroup>
                      {QUALITY_OPTIONS.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.value}
                          onSelect={() => {
                            setQuality(opt.value);
                            setOpenQuality(false);
                          }}
                          className="text-xs cursor-pointer aria-selected:bg-muted aria-selected:text-foreground py-2.5 px-3 rounded-lg flex items-center justify-between"
                        >
                          <span>{opt.label}</span>
                          <Check
                            size={14}
                            className={cn(
                              "text-primary",
                              quality === opt.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <p className="text-[10px] text-muted-foreground font-sans pl-0.5">
              Affects cellular data consumption pipelines across terminal device
              linkings.
            </p>
          </div>

          {/* POPOVER CONTROL 2: DEFAULT LANGUAGE */}
          <div className="space-y-2 flex flex-col">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-0.5 font-sans">
              <Volume2 size={12} className="text-primary" />
              Primary Audio Stream
            </label>

            <Popover open={openLang} onOpenChange={setOpenLang}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openLang}
                  className="bg-muted/40 border-border hover:bg-muted/60 justify-between h-10 text-xs text-foreground/90 font-sans font-normal w-full px-3"
                >
                  {language
                    ? LANGUAGE_OPTIONS.find((opt) => opt.value === language)
                        ?.label
                    : "Select Default Language..."}
                  <ChevronsUpDown
                    size={14}
                    className="ml-2 shrink-0 opacity-50"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-popover border border-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 w-[var(--radix-popover-trigger-width)]">
                <Command className="bg-transparent">
                  <CommandList>
                    <CommandGroup>
                      {LANGUAGE_OPTIONS.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.value}
                          onSelect={() => {
                            setLanguage(opt.value);
                            setOpenLang(false);
                          }}
                          className="text-xs cursor-pointer aria-selected:bg-muted aria-selected:text-foreground py-2.5 px-3 rounded-lg flex items-center justify-between"
                        >
                          <span>{opt.label}</span>
                          <Check
                            size={14}
                            className={cn(
                              "text-primary",
                              language === opt.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <p className="text-[10px] text-muted-foreground font-sans pl-0.5">
              Overrides asset defaults to stream chosen linguistic acoustics
              whenever available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybackTab;
