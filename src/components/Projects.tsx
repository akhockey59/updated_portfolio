import { ExternalLink, Github, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const projects = [
    {
      title: 'Neural Architecture Search Platform',
      description: 'An automated platform for discovering optimal neural network architectures using reinforcement learning and evolutionary algorithms. Achieved 15% better accuracy than manually designed networks.',
      image: '/placeholder.svg',
      technologies: ['Python', 'PyTorch', 'Ray', 'Docker', 'Kubernetes'],
      category: 'Research',
      featured: true,
      links: {
        demo: '#',
        github: '#',
        paper: '#'
      },
      metrics: ['15% accuracy improvement', '50% faster training', '10+ architecture families']
    },
    {
      title: 'Multimodal Medical AI Assistant',
      description: 'A comprehensive AI system that processes medical images, text reports, and patient data to assist healthcare professionals in diagnosis and treatment planning.',
      image: '/placeholder.svg',
      technologies: ['TensorFlow', 'Transformers', 'FastAPI', 'React', 'PostgreSQL'],
      category: 'Production',
      featured: true,
      links: {
        demo: '#',
        github: '#'
      },
      metrics: ['95% diagnostic accuracy', '30s average response time', '10K+ patients served']
    },
    {
      title: 'Real-time Object Tracking System',
      description: 'Advanced computer vision system for multi-object tracking in challenging environments using deep learning and Kalman filtering techniques.',
      image: '/placeholder.svg',
      technologies: ['OpenCV', 'YOLOv8', 'DeepSORT', 'C++', 'CUDA'],
      category: 'Computer Vision',
      featured: false,
      links: {
        demo: '#',
        github: '#'
      },
      metrics: ['99.2% tracking accuracy', '60 FPS processing', 'Real-time performance']
    },
    {
      title: 'LLM Fine-tuning Framework',
      description: 'A scalable framework for fine-tuning large language models on custom datasets with efficient memory management and distributed training capabilities.',
      image: '/placeholder.svg',
      technologies: ['Python', 'Transformers', 'DeepSpeed', 'Weights & Biases', 'AWS'],
      category: 'NLP',
      featured: false,
      links: {
        demo: '#',
        github: '#'
      },
      metrics: ['70% memory reduction', '3x faster training', 'Multi-GPU support']
    },
    {
      title: 'Autonomous Drone Navigation',
      description: 'End-to-end deep reinforcement learning system for autonomous drone navigation in complex environments with obstacle avoidance and path planning.',
      image: '/placeholder.svg',
      technologies: ['PyTorch', 'OpenAI Gym', 'ROS', 'Gazebo', 'Python'],
      category: 'Robotics',
      featured: false,
      links: {
        demo: '#',
        github: '#'
      },
      metrics: ['95% navigation success', 'Zero collisions', 'Dynamic obstacle handling']
    },
    {
      title: 'Financial Fraud Detection AI',
      description: 'Machine learning system for real-time fraud detection in financial transactions using ensemble methods and anomaly detection algorithms.',
      image: '/placeholder.svg',
      technologies: ['Scikit-learn', 'XGBoost', 'Apache Kafka', 'Redis', 'MongoDB'],
      category: 'Production',
      featured: false,
      links: {
        demo: '#',
        github: '#'
      },
      metrics: ['99.7% accuracy', '50ms response time', '$10M+ fraud prevented']
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
              <Card 
                key={index} 
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;