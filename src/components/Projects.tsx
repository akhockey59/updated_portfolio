import { ExternalLink, Github, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import deepfakeImg from '@/assets/project-deepfake.jpg';
import audioImg from '@/assets/project-audio.jpg';
import autonomousImg from '@/assets/project-autonomous.jpg';

const Projects = () => {
  const projects = [
    {
      title: 'Fake Image Detection Model',
      description: 'Developed a CNN-based deepfake detection system achieving 94.78% accuracy across varied image resolutions. Enhanced early detection of manipulated content and drafted a conference paper.',
      image: deepfakeImg,
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
      image: audioImg,
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
      image: autonomousImg,
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
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real projects solving actual problems with AI and machine learning.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="card-hover overflow-hidden group bg-card border"
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="h-56 w-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl">
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.slice(0, 3).map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-xs text-primary bg-primary/10 px-3 py-1.5 rounded">
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
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Demo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Projects Grid */}
        <div className="fade-in">
          <h3 className="text-3xl font-semibold mb-8 text-foreground">
            Other Work
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {regularProjects.map((project, index) => (
              <Card 
                key={index}
                className="card-hover bg-card border"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">
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
                  <div className="mb-4">
                    <div className="text-primary bg-primary/10 px-3 py-1.5 rounded text-sm inline-block">
                      {project.metrics[0]}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      asChild
                    >
                      <a href={project.links?.demo || '#'} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        View Project
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                    >
                      <a href={project.links?.github || '#'} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
