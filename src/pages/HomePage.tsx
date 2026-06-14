import * as React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickStats } from "@/components/home/QuickStats";
import { TimelineFeed } from "@/components/home/TimelineFeed";

export function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <QuickStats />
      <TimelineFeed />
    </div>
  );
}
