"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Smile,
  X,
  MessageSquare,
  Captions,
  Bookmark,
  VolumeX,
  Maximize,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHeroStore } from "@/store/public/use-hero-store";

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FilterBar } from "./live-filterbar";

// --- NEW COMPONENT: FILTER BAR ---

export function LivePlayer() {
  const { messages, addMessage, isChatOpen, setChatOpen, toggleChat } =
    useHeroStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(input);
    setInput("");
  };

  return (
    <section className="bg-black text-foreground p-4 lg:p-8 ">
      <div className="container mx-auto">
        {/* 1. TOP FILTER BAR */}
        <FilterBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* --- LEFT SIDE: VIDEO & INFO --- */}
          <div
            className={cn(
              "transition-all duration-500",
              isChatOpen ? "lg:col-span-8" : "lg:col-span-12",
            )}
          >
            {/* VIDEO PLAYER CONTAINER */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/5">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                loop
              >
                <source
                  src="/video/13208142_3840_2160_60fps.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Bottom Video Controls Overlay (Match image_641fd9.jpg) */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-fontground/80/90 text-sm font-medium">
                  <VolumeX className="w-4 h-4" />
                  <span>Tab to Unmute</span>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-[#E50914] hover:bg-[#E50914] border-none px-3 py-1 rounded-md text-[10px] font-black">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-1.5" />
                    LIVE NOW
                  </Badge>
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-fontground/80 border border-white/10">
                    <MessageSquare className="w-3 h-3" />
                    2.4M Watching
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-black/40 hover:bg-black/60 text-fontground/80 rounded-md border border-white/10"
                    >
                      <Captions className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-black/40 hover:bg-black/60 text-fontground/80 rounded-md border border-white/10"
                      onClick={toggleChat}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-black/40 hover:bg-black/60 text-fontground/80 rounded-md border border-white/10"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. TEXT INFO SECTION (BELOW VIDEO) */}
            <div className="mt-8 flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground uppercase tracking-tighter">
                  Beyond The Story
                </h1>
                <h2 className="text-xl font-bold text-foreground/90">
                  Episode 4: Finding Home
                </h2>
                <p className="text-zinc-400 text-[14px] max-w-2xl leading-relaxed">
                  A powerful journey of resilience, identity and community.
                  Exploring the depths of what it truly means to belong in an
                  ever-changing landscape.
                </p>
              </div>

              <Button
                variant="outline"
                className="bg-[#1A1A1A] border-white/10 hover:bg-zinc-800 text-fontground/80 rounded-xl gap-2 h-10 px-6"
              >
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* --- RIGHT SIDE: LIVE CHAT --- */}
          {isChatOpen && (
            <Card className="lg:col-span-4 flex flex-col bg-[#0A0A0A] border-white/5 rounded-2xl overflow-hidden h-[600px] shadow-2xl">
              <div className="p-4 flex justify-between items-center border-b border-white/5 bg-zinc-900/20">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-sm uppercase text-fontground/80 tracking-widest">
                    Live Chat
                  </h2>
                  <Badge
                    variant="outline"
                    className="text-[9px] border-white/20 text-zinc-400 py-0 h-5"
                  >
                    Top Chat
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-fontground/80"
                  >
                    <Maximize className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-fontground/80"
                    onClick={() => setChatOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 min-h-0">
                <ScrollArea ref={scrollRef} className="h-full">
                  <div className="p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-3 text-[13px]",
                          msg.isMod &&
                            "bg-[#E50914]/5 p-3 rounded-xl border border-[#E50914]/20",
                        )}
                      >
                        <Avatar className="h-7 w-7 rounded-lg">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                          />
                          <AvatarFallback>{msg.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <span
                            className={cn(
                              "font-bold text-xs",
                              msg.isMod ? "text-[#E50914]" : "text-zinc-400",
                            )}
                          >
                            {msg.user}
                          </span>
                          <p className="text-zinc-200 mt-0.5">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4 border-t border-white/5 bg-black">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 bg-[#1A1A1A] rounded-xl px-4 py-2 border border-white/5"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Send a message..."
                    className="bg-transparent border-none focus-visible:ring-0 text-sm p-0 h-8 text-fontground/80"
                  />
                  <Smile className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-zinc-300" />
                  <Button
                    type="submit"
                    disabled={!input.trim()}
                    size="icon"
                    variant="ghost"
                    className="text-[#E50914] hover:bg-transparent"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
