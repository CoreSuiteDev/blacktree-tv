"use client";

import React, { useState } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { trendingChannels } from "@/constants/chanels";
import ChannelCard from "../../live/_components/channel-card";

export interface Channel {
  id: number | string;
  title: string;
  subtitle: string;
  viewers: string;
  image: string;
  icon: "music" | "globe" | "gamepad" | "utensils";
  is1080p: boolean;
  progress?: number;
}

const TrendingSlider = () => {
  // Initialize the plugin inside useState.
  // This is safe because the initializer function only runs once.
  const [plugin] = useState(() =>
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section className="w-full py-10 bg-black">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Trending Channels
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Most watched broadcasts right now
            </p>
          </div>
          <Link
            href="/all"
            className="text-[#E50914] text-sm font-medium hover:underline transition-all"
          >
            See All
          </Link>
        </div>

        {/* Slider Section */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          // We pass 'plugin' directly. No .current needed, so no render error!
          plugins={[plugin]}
          onMouseEnter={() => plugin.stop()}
          onMouseLeave={() => plugin.reset()}
          className="w-full"
        >
          <CarouselContent>
            {(trendingChannels as Channel[]).map((channel: Channel) => (
              <CarouselItem
                key={channel.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ChannelCard channel={channel} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingSlider;
