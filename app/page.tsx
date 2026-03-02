import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { DotMatrix } from "@/components/effects/DotMatrix";
import { HERO_CONTENT, FEATURES, PROJECTS, CONTACT_CTA } from "@/data/content";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      <div className="fixed inset-0 z-0">
        <DotMatrix />
      </div>

      <div className="relative z-10 w-full">
        <Header />
        <div id="top">
          <Hero content={HERO_CONTENT} />
        </div>
        <div id="services">
          <Features items={FEATURES} />
        </div>
        <TechStack />
        <div id="process">
          <Process />
        </div>
        <div id="projects">
          <Projects items={PROJECTS} />
        </div>
        <div id="contact">
          <Contact cta={CONTACT_CTA} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
