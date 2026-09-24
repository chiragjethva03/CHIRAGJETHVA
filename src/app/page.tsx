import { Providers } from "@/components/Providers";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { Journey } from "@/components/Journey";
import { Stack } from "@/components/Stack";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { jsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <Providers>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
      />
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Testimonials />
        <Journey />
        <Stack />
        <Faq />
      </main>
      <Contact />
    </Providers>
  );
}
