"use client";

import React, { useRef, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BrowseAlphabet } from "../../movies/_components/browse-alphabet";
import { FEATURED_ACTORS } from "@/constants/actors";
import ActorCard from "@/components/shared/actor-card";
import { usePaginationStore } from "@/store/public/use-pagination-store";
import { useActorStore } from "@/store/public/use-actor-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Actors() {
  // Store values
  const { searchQuery, setSearchQuery, selectedLetter, sortBy, setSortBy } =
    useActorStore();
  const { currentPage, setCurrentPage } = usePaginationStore();

  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 15;

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Mock data setup
  const allActors = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        ...FEATURED_ACTORS[i % FEATURED_ACTORS.length],
        id: `actor-${i}`,
      })),
    [],
  );

  // Unified Filtering & Sorting Logic
  const filteredAndSortedActors = useMemo(() => {
    let result = [...allActors];

    // 1. Filter by Search Query
    if (searchQuery) {
      result = result.filter((actor) =>
        actor.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 2. Filter by Alphabet
    if (selectedLetter !== "All") {
      result = result.filter((actor) =>
        actor.name.toUpperCase().startsWith(selectedLetter.toUpperCase()),
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      if (sortBy === "za") return b.name.localeCompare(a.name);
      return 0;
    });

    return result;
  }, [searchQuery, selectedLetter, sortBy, allActors]);

  const totalPages = Math.ceil(filteredAndSortedActors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = filteredAndSortedActors.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <main className="min-h-screen text-white py-10" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-0">
        {/* Header */}
        <div className="mb-6 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-3 uppercase tracking-tight">
            The Stars of <span className="text-primary">CineLens</span>
          </h1>
          <p className="text-gray-400 lg:max-w-2xl text-sm md:text-base leading-relaxed">
            Explore the definitive directory of legendary performers. From
            silent era icons to modern-day luminaries, browse the casts that
            have defined the history of motion pictures.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-12 space-y-6 border-b border-white/10 pb-10">
          <div className="w-full">
            <div className="flex flex-wrap justify-center lg:justify-start gap-1">
              <BrowseAlphabet />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:max-w-md relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search actor name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#0A0A0A] border-zinc-800/60 pl-11 pr-4 focus:border-primary/40 focus:ring-1 focus:ring-primary/10 text-white h-11 rounded-xl w-full text-sm transition-all"
              />
            </div>

            <div className="w-full md:w-auto shrink-0">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="bg-[#0A0A0A] text-zinc-400 text-sm border-zinc-800/60 rounded-xl h-11 w-full md:w-48 focus:ring-primary/10 focus:border-primary/40 transition-all">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0A0A] border-zinc-800 text-zinc-400">
                  <SelectItem
                    value="popularity"
                    className="focus:bg-primary focus:text-white cursor-pointer"
                  >
                    Most Popular
                  </SelectItem>
                  <SelectItem
                    value="trending"
                    className="focus:bg-primary focus:text-white cursor-pointer"
                  >
                    Trending Now
                  </SelectItem>
                  <SelectItem
                    value="az"
                    className="focus:bg-primary focus:text-white cursor-pointer"
                  >
                    Name (A-Z)
                  </SelectItem>
                  <SelectItem
                    value="za"
                    className="focus:bg-primary focus:text-white cursor-pointer"
                  >
                    Name (Z-A)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
          {currentMovies.length > 0 ? (
            currentMovies.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-zinc-500 text-lg">
                No stars found matching {searchQuery}
              </p>
            </div>
          )}
        </div>

        {/* Shadcn UI Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-20">
            <PaginationContent className="gap-2 border-none bg-transparent">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      scrollToSection();
                    }
                  }}
                  className={`bg-[#121212] text-zinc-400 border-none rounded-lg px-4 hover:bg-zinc-800 transition-colors ${
                    currentPage === 1
                      ? "opacity-30 pointer-events-none"
                      : "cursor-pointer"
                  }`}
                />
              </PaginationItem>

              {(() => {
                const pages = [];
                for (let i = 1; i <= totalPages; i++) {
                  if (
                    i === 1 ||
                    i === totalPages ||
                    (i >= currentPage - 1 && i <= currentPage + 1)
                  ) {
                    pages.push(
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i);
                            scrollToSection();
                          }}
                          className={`w-11 h-11 border-none rounded-lg font-bold transition-all ${
                            currentPage === i
                              ? "bg-primary text-white pointer-events-none shadow-lg shadow-primary/20"
                              : "bg-[#121212] text-zinc-400 hover:bg-zinc-800 cursor-pointer"
                          }`}
                        >
                          {i}
                        </PaginationLink>
                      </PaginationItem>,
                    );
                  } else if (i === currentPage - 2 || i === currentPage + 2) {
                    pages.push(
                      <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis className="text-zinc-600" />
                      </PaginationItem>,
                    );
                  }
                }
                return pages;
              })()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      scrollToSection();
                    }
                  }}
                  className={`bg-[#121212] text-zinc-400 border-none rounded-lg px-4 hover:bg-zinc-800 transition-colors ${
                    currentPage === totalPages
                      ? "opacity-30 pointer-events-none"
                      : "cursor-pointer"
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  );
}
