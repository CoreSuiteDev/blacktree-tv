import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { SUB_GENRES } from "@/constants/genres";

export default function TrendingSubGenres() {
  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-black text-white">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-2">
            TRENDING <span className="text-[#E50914]">SUB-GENRES</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-medium">
            Niche categories curated by our cinema experts
          </p>
        </div>

        {/* Genres List */}
        <div className="flex flex-col gap-4">
          {SUB_GENRES.map((genre) => (
            <div
              key={genre.id}
              className="group relative flex items-center justify-between p-5 md:p-8 bg-[#0A0A0A] border border-zinc-900/50 rounded-2xl hover:bg-[#121212] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-6 md:gap-10">
                {/* Number Index */}
                <span className="text-3xl md:text-4xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors">
                  {genre.id}
                </span>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-bold tracking-wide uppercase group-hover:text-white transition-colors">
                    {genre.title}
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm">
                    {genre.description}
                  </p>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center gap-4">
                {/* Image Stack / Pill */}
                <div className="hidden sm:flex items-center bg-black/40 border border-zinc-800 rounded-full p-1 pl-3 gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-700 border border-black overflow-hidden relative">
                      <Image
                        src="/assets/images/avatar-1.jpg"
                        alt="user"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-zinc-700 border border-black overflow-hidden relative">
                      <Image
                        src="/assets/images/avatar-2.jpg"
                        alt="user"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-400 pr-2">
                    {genre.count}
                  </span>
                </div>

                {/* Arrow Icon */}
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-[#E50914] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
