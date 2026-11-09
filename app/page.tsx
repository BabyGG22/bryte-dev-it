import Nav from "@/components/Nav";
import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Showcase from "@/components/Showcase";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Showcase />
        <Contact />
      </main>
    </>
  );
}
