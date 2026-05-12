import React from "react";
import { UpComingMovieSlider } from "./_components/upcoming-movie-slider";
import { UPCOMING_MOVIES } from "@/constants/movies";

import { BrowseAlphabet } from "./_components/browse-alphabet";
import { FilterControls } from "./_components/filter-controls";
import AllMoviesSection from "./_components/all-movies";

const Movies = () => {
  return (
    <div>
      <UpComingMovieSlider items={UPCOMING_MOVIES} />
      <BrowseAlphabet />
      <FilterControls />
      <AllMoviesSection />
    </div>
  );
};

export default Movies;
