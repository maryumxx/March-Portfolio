"use client";

import Navbar            from "@/components/Navbar";
import HeroSection       from "@/components/sections/HeroSection";
import AboutSection      from "@/components/sections/AboutSection";
import PortfolioSection  from "@/components/sections/PortfolioSection";
import SkillsSection     from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection    from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
