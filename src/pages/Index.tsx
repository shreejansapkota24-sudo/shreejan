import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AssistantHero from "@/components/AssistantHero";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import InquiryForm from "@/components/InquiryForm";
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
      <AssistantHero />
      <Skills />
      <Portfolio />
      <Services />
      <Contact />
      <InquiryForm />
      <Footer />
    </div>
  );
};

export default Index;
