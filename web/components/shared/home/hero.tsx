"use client";

import { ChatInput } from "./chat-input";
import { X, Shield } from "lucide-react";
import React, { useEffect, useRef } from "react";

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import VidPlayer from "@/features/player/components/vid-player";
import { usePlayerStore } from "@/features/player/store/player.store";
import { useHeroStore } from "@/store/public/use-hero-store";
import { Container } from "../container";

export function HeroSection() {
  const { messages } = useHeroStore();
  const { isChatOpen, toggleChat } = usePlayerStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="text-foreground overflow-hidden">
      <Container>
        {/* items-stretch forces identical height dynamically across all screen sizes */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 transition-all duration-500 ease-in-out items-stretch">
          {/* Player Column */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden bg-black flex items-center justify-center rounded-2xl ${
              isChatOpen ? "lg:col-span-2" : "lg:col-span-3"
            } aspect-video lg:max-h-[87vh] w-full`}
          >
            <VidPlayer />
          </div>

          {/* Chat Column */}
          {/* 
            NOTE: Mobile layouts use explicit 'min-h-[450px]' and 'h-[450px]' boundaries to prevent 
            container collapse post flex-break. Desktop layouts ('lg:') scale fluidly to match 
            the video player height natively via 'lg:min-h-0 lg:h-auto'.
          */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              isChatOpen
                ? "flex-1 lg:col-span-1 opacity-100 grid-rows-[1fr] min-h-[450px] h-[450px] lg:min-h-0 lg:h-auto"
                : "grid-rows-[0fr] opacity-0 h-0 pointer-events-none lg:h-auto lg:w-0 overflow-hidden"
            }`}
          >
            {/* Card container handles the layout box internally */}
            <Card className="border border-[#FFFFFF1A] bg-[#100F0F] flex flex-col w-full h-full min-h-0 rounded-lg shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-[#FFFFFF1A] shrink-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold text-frontground">
                    Live Chat
                  </CardTitle>
                  <Badge className="bg-frontground/10 text-frontground/60 hover:bg-frontground/20 border-none px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                    Top Chat
                  </Badge>
                </div>

                <X
                  onClick={toggleChat}
                  className="w-6 h-6 cursor-pointer hover:text-frontground transition-colors"
                />
              </div>

              {/* Chat Messages */}
              {/* FIXED: 'h-full' wrappers assigned on the viewport anchor window to avoid shrinking */}
              <div className="flex-1 w-full  h-full min-h-[200px] relative">
                <CardContent
                  ref={scrollRef}
                  className="absolute inset-0 space-y-5 overflow-y-auto p-4 custom-scrollbar"
                >
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
                            <span className="font-bold text-[15px] hover:underline cursor-pointer">
                              {msg.user}
                            </span>
                            {msg.isMod && <Shield className="w-3.5 h-3.5" />}
                            <span className="text-[15px] font-bold">:</span>
                          </span>
                          <span className="text-[14px] text-white font-normal leading-relaxed break-words">
                            {msg.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </div>

              {/* Chat Input Area */}
              <div className="shrink-0 border-t border-[#FFFFFF1A]">
                <ChatInput />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
