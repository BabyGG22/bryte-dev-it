import Nav from "@/components/Nav";
import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Monitor from "@/components/Monitor";
import Contact from "@/components/Contact";
import { products, experiments } from "@/data/site";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Monitor
          id="products"
          index="03"
          title="Products"
          intro="The two I'm pushing hardest. Tap the links on screen, hit Next to switch."
          projects={products}
        />
        <Monitor
          id="experiments"
          index="04"
          title="Experiments"
          intro="Side builds, research desks and ideas I couldn't leave alone."
          projects={experiments}
        />
        <Contact />
      </main>
    </>
  );
}
