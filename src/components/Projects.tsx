import { ExternalLink, Github, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import  mg  from '@/assets/bg.jpg';

const Projects = () => {
  const projects = [
    {
      title: 'Fake Image Detection Model',
      description: 'Developed a CNN-based deepfake detection system achieving 94.78% accuracy across varied image resolutions. Enhanced early detection of manipulated content and drafted a conference paper.',
      image: '/placeholder.svg',
      technologies: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Scikit-learn'],
      category: 'Computer Vision',
      featured: true,
      links: {
        demo: '#',
        github: 'https://github.com/akhockey59',
        paper: '#'
      },
      metrics: ['94.78% accuracy', 'Image manipulation detection', 'Conference paper drafted']
    },
    {
      title: 'Audio Fingerprinting System',
      description: 'Designed a noise-robust audio fingerprinting system benchmarked against Shazam, achieving 94.3% accuracy on clean and 82% on distorted audio. Built for resource-constrained environments.',
      image: '/placeholder.svg',
      technologies: ['Python', 'Signal Processing', 'Scikit-learn', 'Pandas'],
      category: 'Signal Processing',
      featured: false,
      links: {
        demo: '#',
        github: 'https://github.com/akhockey59'
      },
      metrics: ['94.3% accuracy', 'Benchmark vs Shazam', 'Deployed on low-end hardware']
    },
    {
      title: 'AI E-Commerce for Farmers',
      description: 'Developed an e-commerce platform integrated with an AI model to predict suitable crops based on soil and seasonal data. Tailored for farmers with simplified UI and AI insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'ML model'],
      category: 'Full Stack',
      featured: true,
      links: {
        demo: 'https://farm-connect-wi5a.onrender.com/',
        github: 'https://github.com/akhockey59/Farm_connect'
      },
      metrics: ['AI crop prediction', 'Farmer-centric design', 'Conference paper submitted']
    },
    {
      title: 'Object Detection with XAI for Autonomous Vehicles',
      description: 'Currently working on an object detection system for self-driving cars, enhanced with explainable AI techniques like Grad-CAM and SHAP. Focused on improving transparency and reducing edge-case misclassifications.',
      image: '/placeholder.svg',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Grad-CAM', 'SHAP'],
      category: 'Computer Vision / XAI',
      featured: false,
      links: {
        demo: '#',
        github: 'https://github.com/akhockey59'
      },
      metrics: [
        'Improved interpretability in 90% of test cases',
        '25% reduction in edge-case misclassifications',
        'Real-time hazard recognition'
      ]
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative AI solutions that demonstrate the power of machine learning 
            in solving real-world challenges.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="glass hover-lift border-border/50 overflow-hidden group slide-in-left"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-neural-cyan/20 flex items-center justify-center">
                    <div className="text-6xl text-primary/40">🤖</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-neural-orange text-neural-orange-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    {project.metrics.slice(0, 3).map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-xs text-neural-cyan bg-neural-cyan/10 px-2 py-1 rounded">
                        {metric}
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs bg-card/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 hover-scale">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Projects Grid */}
        <div className="fade-in">
          <h3 className="text-2xl font-semibold mb-8 text-center gradient-neural">
            More Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project, index) => (
              <a
                key={index}
                href={project.links?.demo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card 
                  className="glass hover-lift border-border/50 group slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    {/* Key Metric */}
                    <div className="text-center mb-4">
                      <div className="text-neural-cyan bg-neural-cyan/10 px-3 py-1 rounded text-sm inline-block">
                        {project.metrics[0]}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="text-xs bg-card/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-card/50">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 hover-scale">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="hover-scale">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
