import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import FloatingAI from "@/components/FloatingAI";
import MaintenanceNotice from "@/components/MaintenanceNotice";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  useReveal();
  useEffect(() => { document.documentElement.style.background = "var(--bg)"; }, []);
  return (
    <main className="relative" style={{ background: "var(--bg)" }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Services />
      <Contact />
      <InquiryForm />
      <Footer />
      <FloatingAI />
      <MaintenanceNotice />
    </main>
  );
};

export default Index;
