import React from "react";
import Image from "next/image";
import {
  Play,
  Plus,
  ChevronDown,
  Star,
  Languages,
  ClosedCaption,
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MovieSlider from "@/components/shared/movie-slider";
import { FEATURED_MOVIES } from "@/constants/movies";

const SingleMovie = () => {
  return (
    <section className="text-foreground mt-23 px-4 lg:px-0 font-sans">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Poster Image Section */}
        <div className="relative group overflow-hidden rounded-radius-lg h-[550px] w-full shadow-shadow-xl">
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

        {/* Right: Content Section */}
        <div className="flex flex-col space-y-4">
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
            <Button
              variant="link"
              className="text-primary p-0 h-auto font-bold mt-6 hover:no-underline group"
            >
              Read More
              <ChevronDown
                size={16}
                className="ml-2 transition-transform group-hover:translate-y-0.5"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Section Footer/Indicator */}
      <div className="container mx-auto  ">
        <MovieSlider title="New Movies" movies={FEATURED_MOVIES} />
      </div>
    </section>
  );
};

export default SingleMovie;
