"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

interface SpotlightItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  releaseDate?: string;
  label?: string;
}

interface UpComingMovieSliderProps {
  items: SpotlightItem[];
}

export function UpComingMovieSlider({ items }: UpComingMovieSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugins = React.useMemo(
    () => [Autoplay({ delay: 6000, stopOnInteraction: false })],
    [],
  );

  React.useEffect(() => {
    if (!api) return;
    const updateIndex = () => setCurrent(api.selectedScrollSnap());
    api.on("select", updateIndex);
    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  return (
    <section className="w-full mt-26 bg-background">
      <Carousel
        setApi={setApi}
        plugins={plugins}
        opts={{ loop: true }}
        className="relative overflow-hidden shadow-2xl"
      >
        <CarouselContent className="ml-0 h-[450px] md:h-[600px]">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-0 relative h-full w-full">
              <div className="relative w-full h-full group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover object-top md:object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlays using your CSS variables */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent z-10" />

                {/* Content Container - Added h-full to fill slide space */}
                <Container className="h-full">
                  {/* Fixed centering: Added items-start (or items-center if you want absolute middle) and h-full */}
                  <div className="relative z-20 h-full flex flex-col justify-end pb-24 md:justify-center md:pb-0">
                    <header className="max-w-3xl space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      {/* Title Section */}
                      <div className="space-y-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                          {item.label || "New Release"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                          {item.title}
                        </h2>
                      </div>

                      {/* Description Section */}
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.2em]">
                          Description
                        </p>
                        <p className="text-muted-foreground max-w-xl text-[14px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer Section: Actually fixed your side-by-side flex layout */}
                      <div className="pt-2 flex flex-wrap items-center gap-6">
                        {/* Read More - Simple Side Button */}
                        <button className="flex items-center gap-1 text-primary transition-colors font-bold text-xs uppercase tracking-widest outline-none group/btn">
                          Read More
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>

                        {/* Release Date - Side by Side & Yellow */}
                        {item.releaseDate && (
                          <div className="flex items-center gap-2 border-l border-border pl-6 h-4">
                            <span className="text-yellow-500 text-[12px] tracking-wider font-bold uppercase">
                              Release Date:
                            </span>
                            <span className="text-yellow-500 text-[12px] font-medium">
                              {item.releaseDate}
                            </span>
                          </div>
                        )}
                      </div>
                    </header>
                  </div>
                </Container>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Centered Dots using Theme Colors */}
        <nav
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30"
          aria-label="Carousel Navigation"
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "transition-all duration-500 rounded-full",
                current === i
                  ? "w-5 h-1.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                  : "w-2 h-1.5 bg-muted-foreground/40 hover:bg-muted-foreground",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </nav>
      </Carousel>
    </section>
  );
}
