import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import CTAStrip from "@/components/CTAStrip";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import SideDotNav from "@/components/SideDotNav";
import FloatingAI from "@/components/FloatingAI";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  useReveal();
  useEffect(() => { document.documentElement.style.background = "var(--bg)"; }, []);
  return (
    <main className="relative" style={{ background: "var(--bg)" }}>
      <Navbar />
      <SideDotNav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Portfolio />
      <CTAStrip />
      <Services />
      <Contact />
      <InquiryForm />
      <Footer />
      <FloatingAI />
    </main>
  );
};

export default Index;
