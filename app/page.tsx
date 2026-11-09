import Nav from "@/components/Nav";
import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Monitor from "@/components/Monitor";
import Experiments from "@/components/Experiments";
import Contact from "@/components/Contact";
import { products } from "@/data/site";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Monitor id="products" index="03" title="Products" intro="Live products I build and run." projects={products} />
        <Experiments />
        <Contact />
      </main>
    </>
  );
}
