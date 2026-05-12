"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Actor interface
interface Actor {
  id: number | string;
  name: string;
  role: string;
  image: string;
  description: string;
}

const ActorCard = ({ actor }: { actor: Actor }) => {
  return (
    <Card className="group relative overflow-hidden outline-none border-none bg-transparent shadow-none cursor-pointer w-full max-w-[350px] mx-auto p-0">
      <CardContent className="p-0">
        <div className="relative w-full rounded-[23px] overflow-hidden h-[350px] md:h-[400px] ">
          {/* Main Actor Image */}
          <Image
            src={actor.image}
            alt={actor.name}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Default State: Dark Gradient Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />

          {/* Hover State: Glassy Blur Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Text & Content (Slide up on hover) */}
          <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-8 text-center">
            <div className="transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              {/* Actor Name & Role */}
              <h3 className="text-[20px] font-bold text-white mb-1">
                {actor.name}
              </h3>
              <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
                {actor.role}
              </p>

              {/* Actor Description */}
              <p className="text-gray-200 text-sm line-clamp-3 mb-4">
                {actor.description}
              </p>

              {/* View Profile Button */}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-md font-semibold rounded-xl transition-all duration-300 shadow-2xl">
                View Profile
              </Button>
            </div>

            {/* Default State Name (Hover korle hide hobe) */}
            <div className="absolute bottom-6 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-[18px] text-white font-semibold">
                {actor.name}
              </h3>
              <p className="text-xs text-gray-300 uppercase tracking-widest">
                {actor.role}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActorCard;
