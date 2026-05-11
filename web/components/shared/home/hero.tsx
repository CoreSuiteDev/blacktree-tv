"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Smile,
  X,
  CheckCircle2,
  MessageSquare,
  Captions,
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

export function HeroSection() {
  const { messages, addMessage, isChatOpen, setChatOpen, toggleChat } =
    useHeroStore();
  const [input, setInput] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to bottom logic
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
    <section className="text-foreground p-4  overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        {/* --- LEFT SIDE: VIDEO PLAYER --- */}
        <div
          className={cn(
            "relative rounded-xl overflow-hidden bg-black border border-border transition-all duration-700 ease-in-out shadow-2xl",
            isChatOpen
              ? "lg:col-span-8 h-[400px] lg:h-[650px]"
              : "lg:col-span-12 h-[500px] lg:h-[700px]",
          )}
        >
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

          {/* Top Right: Indicators using Shadcn Badge Logic Style */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <Badge className="bg-primary hover:bg-primary px-2.5 py-1 rounded-md text-[11px] font-bold text-primary-foreground shadow-lg border-none">
              <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse mr-1.5" />
              LIVE
            </Badge>
            <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-white border border-white/10 shadow-lg">
              2.4M Watching
            </div>
          </div>

          {/* Bottom Overlay Section */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex justify-between items-end gap-4 pointer-events-none">
            {/* Left Side: Title & Description */}
            <div
              className={cn(
                "transition-all duration-1000 transform",
                showOverlay
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">
                Beyond The Story
              </h1>
              <p className="text-white/80 text-xs font-medium max-w-sm line-clamp-1">
                Episode 4: Finding Home — A cinematic journey.
              </p>
            </div>

            {/* Bottom Right: Action Buttons (Re-enabling pointer events) */}
            <div className="flex items-center gap-2 z-30 pointer-events-auto">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60 rounded-lg transition-all"
              >
                <Captions className="h-4.5 w-4.5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60 rounded-lg transition-all text-[10px] font-bold"
              >
                CC
              </Button>

              {!isChatOpen && (
                <Button
                  onClick={toggleChat}
                  className="h-9 w-9 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 rounded-lg animate-in fade-in zoom-in duration-300 p-0"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: LIVE CHAT --- */}
        {isChatOpen && (
          <Card className="lg:col-span-4 flex flex-col bg-card border-border rounded-xl overflow-hidden h-[400px] lg:h-[650px] shadow-xl animate-in slide-in-from-right-10 duration-500 border">
            {/* Chat Header */}
            <div className="p-4 flex justify-between items-center border-b border-border shrink-0 bg-card/50 backdrop-blur-sm z-10">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm tracking-tight uppercase">
                  Live Chat
                </h2>
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 min-h-0 relative overflow-hidden">
              <ScrollArea ref={scrollRef} className="h-full w-full">
                <div className="p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3 text-[13px]",
                        msg.isMod &&
                          "bg-primary/5 p-2 rounded-lg border-l-2 border-primary",
                      )}
                    >
                      <Avatar className="h-7 w-7 border border-border shrink-0">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          {msg.user[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-bold text-primary text-xs truncate">
                            {msg.user}
                          </span>
                          {msg.isMod && (
                            <CheckCircle2 className="w-3 h-3 text-primary fill-primary/10" />
                          )}
                        </div>
                        <p className="text-foreground/90 leading-snug break-words">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-muted/20 shrink-0">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 bg-background border border-input rounded-lg px-3 py-1.5 transition-shadow focus-within:ring-1 focus-within:ring-ring"
              >
                <Smile className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground shrink-0" />
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Chat..."
                  className="flex-1 bg-transparent border-none outline-none text-sm h-7 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground min-w-0"
                />
                <Button
                  type="submit"
                  disabled={!input.trim()}
                  size="icon"
                  className="h-7 w-7 rounded-md shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
