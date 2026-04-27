import { Hero } from "../components/landing/Hero";
import { PainSection } from "../components/landing/PainSection";
import { Features } from "../components/landing/Features";
import { HowItWorks } from "../components/landing/HowItWorks";
import { BigStats } from "../components/landing/BigStats";
import { Pricing } from "../components/landing/Pricing";
import { FAQ } from "../components/landing/FAQ";
import { Footer } from "../components/landing/Footer";
import { Reveal } from "../components/landing/Reveal";
import { StickyHeader } from "../components/landing/StickyHeader";
import { HuntSpotlight } from "../components/landing/HuntSpotlight";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <StickyHeader />
      <Hero />
      <Reveal as="section">
        <PainSection />
      </Reveal>
      <Reveal as="section">
        <HuntSpotlight />
      </Reveal>
      <Reveal as="section">
        <Features />
      </Reveal>
      <Reveal as="section">
        <HowItWorks />
      </Reveal>
      <Reveal as="section">
        <BigStats />
      </Reveal>
      <Reveal as="section">
        <Pricing />
      </Reveal>
      <Reveal as="section">
        <FAQ />
      </Reveal>
      <Footer />
    </main>
  );
}
