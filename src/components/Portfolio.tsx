import { FolderOpen, Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-medium mb-2">My work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Portfolio</h2>
        </div>

        {/* Coming Soon Notice */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Academic & Practice Projects Coming Soon</span>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Currently building my portfolio through coursework, coding exercises, 
            and hands-on practice projects.
          </p>
        </div>

        {/* Placeholder Project Cards */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          {[1, 2, 3].map((num) => (
            <Card
              key={num}
              className="bg-background border-dashed border-2 border-muted hover:border-primary/30 transition-colors duration-300"
            >
              <CardContent className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                <div className="p-4 bg-muted rounded-full mb-4">
                  <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-muted-foreground mb-1">Project {num}</h3>
                <p className="text-sm text-muted-foreground/60">Coming Soon</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Activities */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Currently practicing algorithms & building small projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
