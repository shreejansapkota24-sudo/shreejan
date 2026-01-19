import { Code2 } from "lucide-react";

const skills = [
  { name: "Python", icon: "🐍", level: 75 },
  { name: "Java", icon: "☕", level: 70 },
  { name: "C", icon: "⚙️", level: 65 },
  { name: "HTML", icon: "🌐", level: 80 },
  { name: "CSS", icon: "🎨", level: 75 },
  { name: "Linux", icon: "🐧", level: 60 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-medium mb-2">What I know</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills & Technologies</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group bg-background p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="font-semibold text-foreground">{skill.name}</h3>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 group-hover:bg-primary/80"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{skill.level}%</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Always learning new technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
