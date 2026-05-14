import { ExclusiveInterview } from "@/components/shared/home/SpotlightSlider";

import React from "react";
import InterviewsSection from "./_components/interviews-section";

import { HeroSection } from "@/components/shared/home/hero";

const Interview = () => {
  return (
    <div className="mt-22 px-4 md:px-0">
      <HeroSection />
      <InterviewsSection />
    </div>
  );
};

export default Interview;
