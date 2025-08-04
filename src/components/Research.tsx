import { BookOpen, Download, ExternalLink, Quote, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Research = () => {
  const papers = [
    {
      title: 'Efficient Neural Architecture Search via Gradient-Based Optimization',
      journal: 'International Conference on Machine Learning (ICML)',
      year: '2023',
      citations: 147,
      impact: 'High',
      abstract: 'We propose a novel gradient-based approach for neural architecture search that significantly reduces computational cost while maintaining high performance. Our method achieves state-of-the-art results on ImageNet with 50% fewer GPU hours.',
      authors: ['Alex Chen', 'Dr. Sarah Johnson', 'Prof. Michael Zhang'],
      status: 'Published',
      links: {
        paper: '#',
        code: '#',
        slides: '#'
      }
    },
    {
      title: 'Multimodal Fusion for Enhanced Medical Diagnosis: A Deep Learning Approach',
      journal: 'Nature Machine Intelligence',
      year: '2023',
      citations: 89,
      impact: 'High',
      abstract: 'This work presents a comprehensive framework for fusing medical images, text reports, and structured data to improve diagnostic accuracy. Validated on over 50,000 patient cases across multiple hospitals.',
      authors: ['Alex Chen', 'Dr. Emily Rodriguez', 'Dr. David Kim'],
      status: 'Published',
      links: {
        paper: '#',
        code: '#'
      }
    },
    {
      title: 'Robust Reinforcement Learning for Autonomous Navigation in Dynamic Environments',
      journal: 'Robotics and Autonomous Systems',
      year: '2022',
      citations: 203,
      impact: 'Very High',
      abstract: 'We develop a robust RL framework that enables autonomous agents to navigate safely in dynamic environments with moving obstacles and changing conditions. Demonstrated on real-world drone and robot platforms.',
      authors: ['Alex Chen', 'Prof. Lisa Wang', 'Dr. James Thompson'],
      status: 'Published',
      links: {
        paper: '#',
        code: '#',
        video: '#'
      }
    },
    {
      title: 'Attention Mechanisms in Graph Neural Networks for Drug Discovery',
      journal: 'Journal of Chemical Information and Modeling',
      year: '2022',
      citations: 156,
      impact: 'High',
      abstract: 'Novel attention-based graph neural network architecture for molecular property prediction and drug discovery. Achieved significant improvements in binding affinity prediction for COVID-19 drug targets.',
      authors: ['Alex Chen', 'Dr. Maria Silva', 'Prof. Robert Lee'],
      status: 'Published',
      links: {
        paper: '#',
        code: '#'
      }
    },
    {
      title: 'Federated Learning with Differential Privacy for Healthcare Applications',
      journal: 'IEEE Transactions on Medical Imaging',
      year: '2021',
      citations: 278,
      impact: 'Very High',
      abstract: 'A privacy-preserving federated learning framework that enables collaborative training of medical AI models across institutions while protecting patient privacy through differential privacy mechanisms.',
      authors: ['Alex Chen', 'Dr. Anna Petrov', 'Prof. Kevin Brown'],
      status: 'Published',
      links: {
        paper: '#',
        code: '#'
      }
    },
    {
      title: 'Self-Supervised Learning for Time Series Anomaly Detection',
      journal: 'Under Review at NeurIPS',
      year: '2024',
      citations: 0,
      impact: 'TBD',
      abstract: 'We introduce a self-supervised learning approach for detecting anomalies in multivariate time series data without requiring labeled examples. The method shows promising results on industrial IoT and financial datasets.',
      authors: ['Alex Chen', 'Dr. Thomas Mueller', 'Prof. Yuki Tanaka'],
      status: 'Under Review',
      links: {
        preprint: '#'
      }
    }
  ];

  const researchAreas = [
    {
      area: 'Neural Architecture Search',
      papers: 8,
      description: 'Automated design of optimal neural network architectures'
    },
    {
      area: 'Medical AI',
      papers: 6,
      description: 'AI applications in healthcare and medical diagnosis'
    },
    {
      area: 'Reinforcement Learning',
      papers: 5,
      description: 'RL for robotics and autonomous systems'
    },
    {
      area: 'Computer Vision',
      papers: 7,
      description: 'Advanced vision systems and multimodal learning'
    },
    {
      area: 'Privacy-Preserving AI',
      papers: 4,
      description: 'Federated learning and differential privacy'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High':
        return 'text-neural-orange bg-neural-orange/10';
      case 'High':
        return 'text-neural-cyan bg-neural-cyan/10';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  return (
    <section id="research" className="py-20 neural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Research & Publications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contributing to the advancement of AI through rigorous research and 
            open-source contributions to the scientific community.
          </p>
        </div>

        {/* Research Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 fade-in">
          <div className="text-center hover-scale">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">25+</div>
            <div className="text-muted-foreground">Publications</div>
          </div>
          <div className="text-center hover-scale">
            <div className="text-3xl md:text-4xl font-bold gradient-neural mb-2">1200+</div>
            <div className="text-muted-foreground">Citations</div>
          </div>
          <div className="text-center hover-scale">
            <div className="text-3xl md:text-4xl font-bold text-neural-cyan mb-2">h-index 18</div>
            <div className="text-muted-foreground">Research Impact</div>
          </div>
          <div className="text-center hover-scale">
            <div className="text-3xl md:text-4xl font-bold text-tech-green mb-2">5</div>
            <div className="text-muted-foreground">Best Papers</div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-16 slide-in-left">
          <h3 className="text-2xl font-semibold mb-8 text-center gradient-neural">
            Research Areas
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {researchAreas.map((area, index) => (
              <Card 
                key={index} 
                className="glass hover-lift border-border/50 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary mb-2">{area.papers}</div>
                  <div className="font-medium mb-2">{area.area}</div>
                  <div className="text-xs text-muted-foreground">{area.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Publications */}
        <div className="slide-in-right">
          <h3 className="text-2xl font-semibold mb-8 text-center gradient-neural">
            Selected Publications
          </h3>
          <div className="space-y-6">
            {papers.map((paper, index) => (
              <Card 
                key={index} 
                className="glass hover-lift border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">
                        {paper.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium text-primary">{paper.journal}</span>
                        <span>{paper.year}</span>
                        <span>{paper.citations} citations</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getImpactColor(paper.impact)}>
                        {paper.impact} Impact
                      </Badge>
                      <Badge 
                        variant={paper.status === 'Published' ? 'default' : 'secondary'}
                        className="bg-card/50"
                      >
                        {paper.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-start mb-3">
                      <Quote className="h-4 w-4 text-neural-cyan mr-2 mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed italic">
                        {paper.abstract}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Authors:</strong> {paper.authors.join(', ')}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {paper.links.paper && (
                      <Button size="sm" variant="outline" className="hover-scale">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Paper
                      </Button>
                    )}
                    {paper.links.code && (
                      <Button size="sm" variant="outline" className="hover-scale">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    )}
                    {paper.links.slides && (
                      <Button size="sm" variant="outline" className="hover-scale">
                        <Download className="h-4 w-4 mr-2" />
                        Slides
                      </Button>
                    )}
                    {paper.links.preprint && (
                      <Button size="sm" variant="outline" className="hover-scale">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Preprint
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-semibold mb-4 gradient-text">
            Interested in Collaboration?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always open to discussing research opportunities, collaborations, 
            and innovative AI projects. Let's push the boundaries of what's possible together.
          </p>
          <Button size="lg" className="hover-lift glow-primary">
            <Mail className="h-5 w-5 mr-2" />
            Contact for Research
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Research;