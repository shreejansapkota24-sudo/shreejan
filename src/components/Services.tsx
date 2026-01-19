import { Briefcase, GraduationCap, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-medium mb-2">What I offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Services</h2>
        </div>

        <div className="max-w-2xl mx-auto animate-fade-in">
          <Card className="bg-background border border-border">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-muted rounded-full mb-6">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Currently Not Offering Services
              </h3>
              <p className="text-muted-foreground mb-8">
                As a student, I'm focused on learning and building my skills. 
                However, I'm always open to new opportunities!
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Learning</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Open to internship opportunities
                  </p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Collaboration</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Interested in future collaborations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
