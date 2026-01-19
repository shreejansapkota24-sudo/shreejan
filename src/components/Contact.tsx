import { Mail, Github, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/shreejansapkota" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/shreejansapkota" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/shreejansapkota" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/shreejansapkota" },
  { name: "X (Twitter)", icon: Twitter, href: "https://twitter.com/shreejansapkota" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-medium mb-2">Get in touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Contact Me</h2>
        </div>

        <div className="max-w-xl mx-auto text-center animate-fade-in">
          <p className="text-muted-foreground mb-8">
            I'm always open to connecting with fellow developers, tech enthusiasts, 
            and anyone interested in collaboration or just a friendly chat!
          </p>

          {/* Email Button */}
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground mb-10"
          >
            <a href="mailto:shreejansapkota24@gmail.com">
              <Mail className="w-5 h-5 mr-2" />
              shreejansapkota24@gmail.com
            </a>
          </Button>

          {/* Social Links */}
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-background border border-border rounded-full hover:border-primary hover:bg-primary/5 transition-all duration-300"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Text */}
          <p className="mt-8 text-sm text-muted-foreground">
            Let's connect and build something amazing together!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
