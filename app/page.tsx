import Nav from "@/components/Nav";
import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import CardDeck from "@/components/CardDeck";
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
        <CardDeck
          id="products"
          index="03"
          title="Products"
          intro="The two I'm pushing hardest. Tap a card to flip it."
          projects={products}
        />
        <CardDeck
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
