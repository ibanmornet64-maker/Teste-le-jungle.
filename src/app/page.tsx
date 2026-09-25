import { Hero } from "@/components/sections/Hero";
import { IdentityBand } from "@/components/sections/IdentityBand";
import { IntroSection } from "@/components/sections/IntroSection";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { FoodSection } from "@/components/sections/FoodSection";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { GallerySection } from "@/components/sections/GallerySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { PracticalInfo } from "@/components/sections/PracticalInfo";

// Régénère la page toutes les heures (les événements passés disparaissent).
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <IdentityBand />
      <IntroSection />
      <ActivitiesSection />
      <FoodSection />
      <DayTimeline />
      <EventsPreview />
      <GallerySection />
      <CtaSection />
      <PracticalInfo />
    </>
  );
}
