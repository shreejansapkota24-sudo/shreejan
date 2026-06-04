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

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <Hero />
      <div className="hairline max-w-6xl mx-auto" />
      <About />
      <div className="hairline max-w-6xl mx-auto" />
      <AssistantHero />
      <div className="hairline max-w-6xl mx-auto" />
      <Skills />
      <div className="hairline max-w-6xl mx-auto" />
      <Portfolio />
      <div className="hairline max-w-6xl mx-auto" />
      <Services />
      <div className="hairline max-w-6xl mx-auto" />
      <Contact />
      <div className="hairline max-w-6xl mx-auto" />
      <InquiryForm />
      <Footer />
    </div>
  );
};

export default Index;
