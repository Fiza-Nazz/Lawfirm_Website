import Image from "next/image";
import Navbar from "./Components/Navbar";
import HeroSlider from "./Components/HeroSlider";
import About from "./Components/About";
import Lawer from "./Components/Lawer";
import Law from "./Components/Law";
import Expertise from "./Components/Expertise";
import Practiceareas from "./Components/Practiceareas";
import Evualtion from "./Components/Evualtion";
import Testimonials from "./Components/Testimonials";
import Consultation from "./Components/Consultation";
import Contact from "./Components/Contact";
import LegalPages from "./Components/LegalPages";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      <div id="hero">
        <HeroSlider />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="lawer">
        <Lawer />
      </div>

      <div id="law">
        <Law />
      </div>

      <div id="expertise">
        <Expertise />
      </div>

      <div id="practiceareas">
        <Practiceareas />
      </div>

      <div id="evualtion">
        <Evualtion />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      <div id="consultation">
        <Consultation />
      </div>

      <div id="contact">
        <Contact />
      </div>
   
      <LegalPages/>
      <Footer />
    </main>
  );
}