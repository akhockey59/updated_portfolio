import { Brain, Code, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: 'AI Innovation',
      description: 'Developing cutting-edge AI solutions that push the boundaries of machine learning'
    },
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'Proficient in Python, TensorFlow, PyTorch, and modern ML frameworks'
    },
    {
      icon: Lightbulb,
      title: 'Research Focus',
      description: 'Contributing to AI research with publications in computer vision and NLP'
    },
    {
      icon: Target,
      title: 'Problem Solving',
      description: 'Translating complex business challenges into intelligent automated solutions'
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
            Passionate AI engineer with 5+ years of experience in machine learning, 
            deep learning, and artificial intelligence research.
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
                My fascination with artificial intelligence began during my computer science studies, 
                where I first encountered the elegance of neural networks and their ability to learn 
                from data. What started as curiosity quickly evolved into a passion for creating 
                intelligent systems that can understand, learn, and adapt.
              </p>
              <p>
                Over the years, I've had the privilege of working on diverse AI projects ranging from 
                computer vision systems for autonomous vehicles to natural language processing models 
                for healthcare applications. Each project has deepened my understanding of the 
                transformative potential of AI technology.
              </p>
              <p>
                Today, I continue to push the boundaries of what's possible with AI, always staying 
                at the forefront of emerging technologies while maintaining a focus on ethical and 
                responsible AI development that benefits society.
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="hover-scale">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="hover-scale">
              <div className="text-3xl md:text-4xl font-bold gradient-neural mb-2">50+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-neural-cyan mb-2">15+</div>
              <div className="text-muted-foreground">Research Papers</div>
            </div>
            <div className="hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-tech-green mb-2">10+</div>
              <div className="text-muted-foreground">Awards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;