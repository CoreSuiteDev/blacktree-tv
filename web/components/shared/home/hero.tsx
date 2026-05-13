"use client";

import { useHeroStore } from "@/store/public/use-hero-store";
import {
  CircleDollarSign,
  SendHorizontal,
  Shield,
  Smile,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import VidPlayer from "@/features/player/components/vid-player";
import { usePlayerStore } from "@/features/player/store/player.store";

export function HeroSection() {
  const { messages, addMessage } = useHeroStore();
  const { isChatOpen, toggleChat } = usePlayerStore();
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
            className={`transition-all duration-500 ease-in-out overflow-hidden bg-black flex items-center justify-center rounded-2xl ${
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
            <Card className="border border-[#FFFFFF1A] bg-[#100F0F] h-full flex flex-col min-w-full lg:min-w-[380px] shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-5 border-b border-[#FFFFFF1A]">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold text-white">
                    Live Chat
                  </CardTitle>
                  <Badge className="bg-white/10 text-white/60 hover:bg-white/20 border-none px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                    Top Chat
                  </Badge>
                </div>

                <X
                  onClick={toggleChat}
                  className="w-6 h-6 cursor-pointer hover:text-white transition-colors"
                />
              </div>

              {/* Chat Messages */}
              <CardContent className="flex-1 space-y-5 overflow-y-auto p-4 custom-scrollbar">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 animate-in fade-in slide-in-from-right-4 ${
                      msg.isMod
                        ? "bg-red-950/20 border-l border-red-600 p-3 rounded-r-md -mx-1"
                        : ""
                    }`}
                  >
                    <Avatar className="h-9 w-9 rounded-full ring-1 ring-white/10">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                      />
                      <AvatarFallback className="bg-white/5 text-white/40">
                        {msg.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 leading-tight">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="flex items-center gap-1 text-primary">
                          <span className="font-bold  text-[15px] hover:underline cursor-pointer">
                            {msg.user}
                          </span>
                          {msg.isMod && <Shield className="w-3.5 h-3.5" />}
                          <span className="text-[15px] font-bold">:</span>
                        </span>
                        <span className="text-[14px]  text-white font-normal leading-relaxed wrap-break-words">
                          {msg.message}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              {/* Chat Input Area */}
              <CardFooter className="w-full p-0 m-0">
                <div className="p-4 w-full bg-white/5 border-t border-white/5">
                  <form onSubmit={handleSubmit} className="relative group">
                    <div className="relative flex items-center bg-zinc-900/50 border border-white/5 group-focus-within:border-white/20 transition-all px-3 py-2">
                      <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Send a message..."
                        className="bg-transparent! focus:bg-transparent! placeholder:text-white/40! border-none focus-visible:ring-0 text-[14px] h-9 p-0 px-2.5 w-full flex-1"
                      />
                      <div className="flex items-center gap-3 ml-2">
                        <Smile className="w-5 h-5 text-white/30 hover:text-white transition-colors cursor-pointer" />
                        <button type="submit" disabled={!input.trim()}>
                          <SendHorizontal
                            className={`cursor-pointer w-5 h-5 transition-all ${input.trim() ? "text-primary scale-110" : "text-white/20"}`}
                          />
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Chat Footer */}
                  <div className="flex items-center justify-between mt-3 px-1 text-[11px] font-medium tracking-wide">
                    <div className="flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors cursor-pointer">
                      <CircleDollarSign className="w-3.5 h-3.5" />
                      <span>1,240 Bits</span>
                    </div>
                    <span className="text-white/20 uppercase tracking-widest text-[9px]">
                      Press Enter to send
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
