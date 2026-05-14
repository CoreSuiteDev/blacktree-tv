"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
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

// --- IMPORT ALL MOVIE LISTS ---
import {
  FEATURED_MOVIES,
  ALL_MOVIES,
  UPCOMING_MOVIES,
} from "@/constants/movies";

const SingleMovie = () => {
  const params = useParams();
  const slug = params?.slug;

  // 1. Shobgulo movie list ke ekta common array-te niye asha
  const ALL_AVAILABLE_MOVIES = [
    ...FEATURED_MOVIES,
    ...UPCOMING_MOVIES,
    ...ALL_MOVIES,
  ];

  // 2. Combined list theke slug match kora
  const movie = ALL_AVAILABLE_MOVIES.find((m) => m.slug === slug);

  // Movie na paile error state
  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Movie Not Found!</h1>
      </div>
    );
  }

  // 3. Related movies er jonno current movie baade baki gulo filter kora
  const relatedMovies = ALL_AVAILABLE_MOVIES.filter((m) => m.slug !== slug);

  return (
    <section className="text-foreground mt-23 px-4 lg:px-0 font-sans">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Poster Image Section */}
        <div className="relative group overflow-hidden rounded-lg h-[550px] w-full shadow-xl">
          <Image
            src={movie.image}
            alt={`${movie.title} Poster`}
            fill
            className="object-cover transition-transform rounded-xl duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-8">
            <span className="text-primary font-black italic text-2xl tracking-tighter drop-shadow-md uppercase">
              {movie.label ||
                (movie.title.includes("Black Panther") ||
                movie.title.includes("Strange")
                  ? "MARVEL STUDIOS"
                  : "STREAMING NOW")}
            </span>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="flex flex-col space-y-4">
          <header>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
              Included in Live Channel
            </p>
            <h1 className="text-5xl font-semibold tracking-tight mb-6 leading-none uppercase">
              {movie.title}
            </h1>

            <div className="flex gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <Badge
                  key={genre}
                  variant="default"
                  className="bg-primary text-primary-foreground px-4 py-1 text-[10px] font-bold rounded-sm tracking-widest border-none hover:bg-primary/90 uppercase"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </header>

          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-xs text-muted-foreground border-b border-border pb-6">
            <div className="flex gap-4 items-center">
              <span>
                Year: <b className="text-foreground">{movie.year}</b>
              </span>
              <span>
                Duration: <b className="text-foreground">{movie.duration}</b>
              </span>
              <div className="flex items-center gap-1">
                <span>
                  IMDb Rating: <b className="text-foreground">{movie.rating}</b>
                </span>
                <div className="flex text-yellow-500 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={
                        i < Math.floor(movie.rating / 2)
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        i < Math.floor(movie.rating / 2)
                          ? ""
                          : "text-muted-foreground/40"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-border px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground uppercase"
              >
                {movie.quality}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 bg-accent text-accent-foreground px-2 py-0.5 rounded-md"
              >
                <Languages size={14} /> {movie.languages?.join(" | ")}
              </Badge>
              <ClosedCaption size={16} className="text-foreground" />
              <Badge
                variant="outline"
                className="border-border px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                {movie.pgRating}
              </Badge>
            </div>
          </div>

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
              <Plus size={22} /> Add to List
            </Button>
          </div>

          <div className="pt-6">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 font-black">
              Description
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
              {movie.description}
            </p>
            <Button
              variant="link"
              className="text-primary p-0 h-auto font-bold mt-6 hover:no-underline group"
            >
              Read More{" "}
              <ChevronDown
                size={16}
                className="ml-2 transition-transform group-hover:translate-y-0.5"
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-16">
        <MovieSlider title="Related Movies" movies={relatedMovies} />
      </div>
    </section>
  );
};

export default SingleMovie;
