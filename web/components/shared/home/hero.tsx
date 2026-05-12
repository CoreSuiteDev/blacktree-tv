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

export function HeroSection() {
  const { messages, addMessage } = useHeroStore();
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <VidPlayer />
          </div>
          <div className="col-span-1">
            <Card className="rounded-xl p-6 h-full">
              <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
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
                      <p className="text-sm text-muted-foreground">
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
