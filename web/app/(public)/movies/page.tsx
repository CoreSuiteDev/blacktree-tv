import React from "react";
import { UpComingMovieSlider } from "./_components/upcoming-movie-slider";
import { UPCOMING_MOVIES } from "@/constants/movies";

const Movies = () => {
  return (
    <div>
      <UpComingMovieSlider items={UPCOMING_MOVIES} />
    </div>
  );
};

export default Movies;
