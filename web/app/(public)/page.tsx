import { HeroSection } from "@/components/shared/home/hero";
import LiveSchedule from "@/components/shared/home/liveSchedule";
import heroBg from "../../public/assets/images/hero-bg.png";

import { FEATURED_MOVIES, movieSpotlights } from "@/constants/movies";
import { SpotlightSlider } from "@/components/shared/home/SpotlightSlider";
import DynamicSlider from "@/components/shared/dynamic-slider";

export default function Home() {
  return (
    <main className="relative w-full">
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col"
        style={{
          backgroundImage: `url(${heroBg.src})`,
        }}
      >
        {/* Navigation Height Offset for Hero content */}
        <div className="h-16 md:h-20 w-full" />

        <HeroSection />
        <LiveSchedule />
      </div>

      <div className="bg-popover">
        <DynamicSlider title="Featured Movies" movies={FEATURED_MOVIES} />
        <DynamicSlider title="New Movies" movies={FEATURED_MOVIES} />
        <SpotlightSlider items={movieSpotlights} />
        <DynamicSlider title="Featured Actors" movies={FEATURED_MOVIES} />
      </div>
    </main>
  );
}
