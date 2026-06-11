import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Technologies from "@/components/sections/Technologies";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import LoadSequence from "@/components/effects/LoadSequence";
import ScrollTrace from "@/components/effects/ScrollTrace";
import ScrollProgress from "@/components/effects/ScrollProgress";
import { HERO_CONTENT, SERVICES, PROJECTS, CONTACT_CTA } from "@/data/content";

const SECTION_ANCHOR = "scroll-mt-[88px]";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      <ScrollTrace />
      <ScrollProgress />
      <div className="relative z-10 w-full">
        <Header />
        <div id="main-content" tabIndex={-1} className="outline-none">
          <Hero content={HERO_CONTENT} />
        </div>
        <div id="services" className={SECTION_ANCHOR}>
          <Services items={SERVICES} />
        </div>
        <div id="products" className={SECTION_ANCHOR}>
          <Products />
        </div>
        <div id="technologies" className={SECTION_ANCHOR}>
          <Technologies />
        </div>
        <div id="about" className={SECTION_ANCHOR}>
          {/* Alias for old deep links to the retired standalone section */}
          <span id="process" aria-hidden="true" />
          <About />
        </div>
        <div id="work" className={SECTION_ANCHOR}>
          {/* Alias for old deep links */}
          <span id="projects" aria-hidden="true" />
          <Work items={PROJECTS} />
        </div>
        <div id="contact" className={SECTION_ANCHOR}>
          <Contact cta={CONTACT_CTA} />
        </div>
        <Footer />
      </div>
      <LoadSequence />
    </main>
  );
}
