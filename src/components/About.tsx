import { Brain, Code, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    <section id="about" className="py-20 neural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          From deepfake detection to autonomous systems — building the future, one model at a time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Story */}
          <div className="slide-in-left">
            <h3 className="text-2xl font-semibold mb-6 gradient-neural">
              My Journey in AI
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
  <p>
    My journey into AI began as a student of computer engineering, driven by a fascination with how machines can learn,
    see, and adapt. Since then, I've applied that passion across a range of impactful projects — from building deepfake
    detection models to designing audio fingerprinting systems robust enough for real-world deployment.
  </p>

  <p>
    At IIEST Shibpur, I worked on a lightweight audio fingerprinting algorithm that holds its own against
    industry-standard systems like Shazam and Panako. My recent work includes explainable AI (XAI) for autonomous
    vehicles, a calorific value prediction system using computer vision, and an AI-integrated e-commerce platform
    tailored for farmers.
  </p>

  <p>
    I combine strong foundations in machine learning and computer vision with hands-on experience in full-stack
    development using the MERN stack, Flutter, and Next.js. Whether it’s deploying scalable web apps or writing
    conference papers on AI models, I bring a research mindset and a builder’s attitude to everything I do.
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