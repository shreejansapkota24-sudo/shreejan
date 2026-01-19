import { GraduationCap, Code, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-medium mb-2">Get to know me</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="animate-fade-in">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I'm <span className="text-foreground font-medium">Shreejan Sapkota</span>, 
              a curious and driven Computer Science student with a deep passion for coding, 
              algorithms, and technology. Every day brings a new opportunity to learn, 
              explore, and create something meaningful.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              When I'm not immersed in code, you'll find me enjoying anime—drawing 
              inspiration from creative storytelling and imaginative worlds. I believe 
              the best solutions come from combining logical thinking with creative vision.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm committed to continuous learning and growth, always seeking to expand 
              my skills and take on new challenges in the ever-evolving tech landscape.
            </p>
          </div>

          {/* Education & Highlights */}
          <div className="space-y-6 animate-fade-in">
            <div className="bg-background p-6 rounded-xl border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Education</h3>
                  <p className="text-muted-foreground text-sm">Bachelor in Computer Science (Hons)</p>
                  <p className="text-muted-foreground text-sm">IIMS College</p>
                  <p className="text-primary text-sm font-medium mt-1">Expected Graduation: 2029</p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Focus Areas</h3>
                  <p className="text-muted-foreground text-sm">
                    Algorithms, Data Structures, Problem Solving, Web Development
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Mindset</h3>
                  <p className="text-muted-foreground text-sm">
                    Curious learner, future-oriented thinker, open to challenges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
