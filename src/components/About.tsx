import { Brain, Code, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: 'Applied AI & ML',
      description: 'Building real-world AI systems from deepfake detection to audio fingerprinting for robust deployment'
    },
    {
      icon: Code,
      title: 'Full-Stack Engineering',
      description: 'Creating scalable web platforms using MERN, Next.js, and integrating ML models into production systems'
    },
    {
      icon: Lightbulb,
      title: 'Research & Innovation',
      description: 'Authoring conference papers and patents in computer vision, signal processing, and intelligent systems'
    },
    {
      icon: Target,
      title: 'Competitive Programmer',
      description: 'Sharpening algorithmic thinking through contests and problem-solving on platforms like LeetCode & Codeforces'
    }
  ];
  

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          From deepfake detection to autonomous systems — building the future, one model at a time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Story with Photo */}
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-28 w-28 border-4 border-primary/20 shadow-lg">
                <AvatarImage src="/placeholder.svg" alt="Aakash" />
                <AvatarFallback className="text-2xl font-display">A</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  My Journey in AI
                </h3>
                <p className="text-muted-foreground">Engineer & Researcher</p>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My journey into AI began as a computer engineering student, driven by curiosity about how machines learn and adapt. Since then, I've built deepfake detection models, audio fingerprinting systems, and explainable AI for autonomous vehicles.
              </p>
              <p>
                I combine machine learning expertise with full-stack development skills, bringing a research mindset and builder's attitude to everything I create.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="slide-in-right">
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card 
                  key={index} 
                  className="glass hover-lift border-border/50 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <highlight.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:text-neural-cyan transition-colors duration-300" />
                    <h4 className="text-lg font-semibold mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 fade-in">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center justify-center">
    
    <div className="hover-scale">
      <div className="text-3xl md:text-4xl font-bold gradient-neural mb-2">10+</div>
      <div className="text-muted-foreground">Projects Completed</div>
    </div>
    
    <div className="hover-scale">
      <div className="text-3xl md:text-4xl font-bold text-neural-cyan mb-2">4+</div>
      <div className="text-muted-foreground">Research Papers</div>
    </div>
    
    <div className="hover-scale">
      <div className="text-3xl md:text-4xl font-bold text-tech-green mb-2">5+</div>
      <div className="text-muted-foreground">Certifications</div>
    </div>

  </div>
</div>

      </div>
    </section>
  );
};

export default About;