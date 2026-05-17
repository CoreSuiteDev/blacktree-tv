import React from "react";
import Image from "next/image";
import { Play, Plus, Star, Languages, ClosedCaption } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MovieSlider from "@/components/shared/movie-slider";
import { FEATURED_MOVIES } from "@/constants/movies";

// --- TRAILERS AND TEASERS DATA ARRAY ---
const MOVIE_TRAILERS = [
  {
    id: "t1",
    title: "Official Main Trailer",
    type: "Trailer",
    duration: "2:35",
    thumbnail: "/assets/images/doctor-strange.jpg",
  },
  {
    id: "t2",
    title: "Official Teaser",
    type: "Teaser",
    duration: "1:12",
    thumbnail: "/assets/images/doctor-strange.jpg",
  },
  {
    id: "t3",
    title: "The Descent Scene",
    type: "Clip",
    duration: "0:58",
    thumbnail: "/assets/images/doctor-strange.jpg",
  },
];

const SingleMovie = () => {
  return (
    <section className="text-foreground mt-23 px-4 lg:px-0 font-sans">
      {/* 40% (col-span-4) and 60% (col-span-6) Layout Grid */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
        {/* Left: Poster Image Section (40% width) */}
        <div className="relative group overflow-hidden rounded-radius-lg h-[550px] w-full shadow-shadow-xl lg:col-span-4">
          <Image
            src="/assets/images/doctor-strange.jpg"
            alt="The Red Chronicles Poster"
            fill
            className="object-cover transition-transform rounded-xl duration-700 group-hover:scale-105"
            priority
          />
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-8">
            <span className="text-primary font-black italic text-2xl tracking-tighter drop-shadow-md">
              MARVEL STUDIOS
            </span>
          </div>
        </div>

        {/* Right: Content Section (60% width) */}
        <div className="flex flex-col space-y-4 lg:col-span-6">
          <header>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
              Included in Live Channel
            </p>
            <h1 className="text-5xl font-semibold tracking-tight mb-6 leading-none">
              THE RED CHRONICLES
            </h1>

            {/* Genre Tags using Shadcn Badge */}
            <div className="flex gap-2 mb-4">
              {["ACTION", "FANTASY", "DRAMA"].map((genre) => (
                <Badge
                  key={genre}
                  variant="default"
                  className="bg-primary text-primary-foreground px-4 py-1 text-[10px] font-bold rounded-sm tracking-widest border-none hover:bg-primary/90"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </header>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-xs text-muted-foreground border-b border-border pb-6">
            <div className="flex gap-4 items-center">
              <span>
                Year: <b className="text-foreground">2026</b>
              </span>
              <span>
                Duration: <b className="text-foreground">2h 35m</b>
              </span>
              <div className="flex items-center gap-1">
                <span>
                  IMDb Rating: <b className="text-foreground">8.8</b>
                </span>
                <div className="flex text-yellow-500 ml-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                  <Star size={13} className="text-muted-foreground/40" />
                </div>
              </div>
            </div>

            {/* Tech Badges using Shadcn Badge (Outline Variant) */}
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-border px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                HD / 4K
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 bg-accent text-accent-foreground px-2 py-0.5 rounded-md hover:bg-accent"
              >
                <Languages size={14} /> English | Spanish
              </Badge>
              <ClosedCaption size={16} className="text-foreground" />
              <Badge
                variant="outline"
                className="border-border px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                PG-13
              </Badge>
            </div>
          </div>

          {/* Action Buttons using Shadcn Button */}
          <div className="flex flex-wrap gap-5 pt-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all px-10 py-7 rounded-full font-bold shadow-lg w-full sm:w-auto text-base gap-3"
            >
              <div className="bg-white/20 p-1.5 rounded-full">
                <Play size={18} fill="currentColor" />
              </div>
              Play / Watch Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-secondary/10 hover:bg-secondary/20 border-border transition-all px-10 py-7 rounded-full font-bold w-full sm:w-auto text-base gap-3"
            >
              <Plus size={22} />
              Add to List
            </Button>
          </div>

          {/* Description Section */}
          <div className="pt-6">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 font-black">
              Description
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
              In a world of eternal twilight, a fallen guardian must unite the
              scattered clans before the ancient red moon descends for the final
              time...
            </p>
          </div>

          {/* Trailers & Teasers Mapping Section */}
          <div className="pt-6 border-t border-border mt-4">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 font-black">
              Trailers & Teasers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {MOVIE_TRAILERS.map((video) => (
                <div
                  key={video.id}
                  className="group relative aspect-video bg-secondary/20 rounded-md overflow-hidden cursor-pointer border border-border/50 shadow-sm"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-2 left-2 flex gap-1 z-10">
                    <span className="bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {video.type}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 z-10">
                    <span className="bg-black/60 text-neutral-300 text-[9px] px-1.5 py-0.5 rounded-sm">
                      {video.duration}
                    </span>
                  </div>

                  {/* Play Overlay Button on Hover */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/50">
                    <div className="bg-primary p-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform shadow-md text-primary-foreground">
                      <Play size={14} fill="currentColor" />
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2">
                    <p className="text-[11px] font-semibold text-white truncate">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Footer/Indicator */}
      <div className="container mx-auto mt-16">
        <MovieSlider title="Relited Movies" movies={FEATURED_MOVIES} />
      </div>
    </section>
  );
};

export default SingleMovie;
