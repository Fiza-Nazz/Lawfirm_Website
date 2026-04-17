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
import Footer from "./Components/Footer";



export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSlider />
      <About />
      <Lawer />
      <Law />
      <Expertise />
      <Practiceareas />
      <Evualtion />
      <Testimonials />
      <Consultation />
      <Contact />
      <Footer />
    </main>
  );
}




