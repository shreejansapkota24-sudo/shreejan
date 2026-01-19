import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 animate-fade-in">
            <p className="text-primary font-medium mb-2">Hello, I'm</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Shreejan Sapkota
            </h1>
            <p className="text-lg text-muted-foreground mb-2 italic">
              "Coder by day, anime enthusiast by night."
            </p>
            <p className="text-muted-foreground mb-8 max-w-md">
              A passionate Computer Science student exploring the depths of algorithms, 
              problem-solving, and building meaningful technology solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="#portfolio">View Portfolio</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="order-1 md:order-2 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden border-4 border-primary/20">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-6xl md:text-8xl font-bold text-primary/30">SS</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-2 -left-2 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground">Scroll down</span>
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
