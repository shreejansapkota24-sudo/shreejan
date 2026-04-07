import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";
import ParticleField from "@/components/ParticleField";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative scanline-overlay">
      <CyberBackground />
      <ParticleField />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
