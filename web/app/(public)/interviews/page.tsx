import { ExclusiveInterview } from "@/components/shared/home/SpotlightSlider";
import { INTERVIEW_SPORTLIGHT } from "@/constants/movies";
import React from "react";

const Interview = () => {
  return (
    <div className="mt-14 px-4 md:px-0">
      <ExclusiveInterview items={INTERVIEW_SPORTLIGHT} />
    </div>
  );
};

export default Interview;
