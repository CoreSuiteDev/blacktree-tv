"use client";

import { useHeroStore } from "@/store/public/use-hero-store";
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import VidPlayer from "@/features/player/components/vid-player";
import { usePlayerStore } from "@/features/player/store/player.store";

export function HeroSection() {
  const { messages, addMessage } = useHeroStore();
  const { isChatOpen } = usePlayerStore();
  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="text-foreground p-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 transition-all duration-500 ease-in-out">
          {/* Player Column */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden rounded-xl bg-black flex items-center justify-center ${
              isChatOpen ? "lg:w-2/3" : "lg:w-full"
            } aspect-video lg:aspect-auto lg:max-h-[92vh] lg:min-h-[500px] w-full`}
          >
            <VidPlayer />
          </div>

          {/* Chat Column */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isChatOpen
                ? "flex-1 lg:w-1/3 opacity-100 translate-y-0 lg:translate-x-0"
                : "h-0 lg:h-auto w-0 lg:w-0 opacity-0 translate-y-10 lg:translate-x-10 pointer-events-none"
            }`}
          >
            <Card className="rounded-xl p-6 h-full flex flex-col min-w-full lg:min-w-[350px]">
              <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
              <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] lg:max-h-[500px] pr-2 custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 animate-in fade-in slide-in-from-right-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                      />
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary">
                          {msg.user}
                        </span>
                        {msg.isMod && <Badge variant="secondary">Mod</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground break-words">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
