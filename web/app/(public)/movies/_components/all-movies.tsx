"use client";

import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePaginationStore } from "@/store/public/use-pagination-store";
import MovieCard from "@/components/shared/movieCard";
import { ALL_MOVIES } from "@/constants/movies";

export default function AllMoviesSection() {
  const { currentPage, itemsPerPage, setCurrentPage } = usePaginationStore();

  // Logic to handle 15 movies as seen in Screenshot_115.jpg
  // For demo, we duplicate the array to fill the grid
  // const displayMovies = Array.from({ length: 45 }, (_, i) => ({
  //   ...ALL_MOVIES[i % ALL_MOVIES.length],
  //   id: i,
  // }));

  const totalPages = Math.ceil(ALL_MOVIES.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = ALL_MOVIES.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="w-full py-10 px-4 md:px-10 lg:px-20">
      <div className="container px-4 md:px-0 mx-auto space-y-12">
        {/* Movie Grid: Matches the 5-column layout in Screenshot_115.jpg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Shadcn Pagination Bar */}
        <Pagination className="mt-10">
          <PaginationContent className="bg-card/50 p-1 rounded-xl border border-border">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Simple logic to show current, first, last and ellipsis
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <PaginationEllipsis key={page} />;
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
