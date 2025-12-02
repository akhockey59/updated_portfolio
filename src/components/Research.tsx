import { BookOpen, Download, ExternalLink, Quote, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Research = () => {
  const papers = [
    {
      title: 'Deepfake Detection: Leveraging AI to Identify Manipulated Media',
      journal: '4th International Conference on Advancements in Smart Computing & Information Security (ASCIS 2025)',
      year: 'Sept 2025',
      citations: 0,
      impact: 'High',
      abstract: 'Proposed a CNN-based model with Error Level Analysis (ELA) achieving 94.84% accuracy in detecting deepfake images and videos.',
      authors: ['Aakash', 'Bittu Kumari', 'Anjali Diwan'],
      status: 'Accepted & Presented',
      venue: 'Marwadi University, Rajkot, India',
      publisher: 'Springer',
      links: {
        paper: '#'
      }
    },
    {
      title: 'Crop Prediction Using Machine Learning',
      journal: 'International Conference on Intelligent Computing & Intelligent Systems (ICICIS-2025)',
      year: 'Sept 2025',
      citations: 0,
      impact: 'High',
      abstract: 'Developed a machine learning-based prediction model achieving 97.95% accuracy with ensemble methods for optimal crop selection based on soil and environmental parameters.',
      authors: ['Aakash', 'Bittu Kumari', 'Anjali Diwan'],
      status: 'Accepted & Presented',
      venue: 'Ajeenkya DY Patil University, Pune, India',
      links: {
        paper: '#'
      }
    },
    {
      title: 'Hybrid Audio Fingerprinting of Human Voice Under Distortion',
      journal: 'International Conference on Pattern Recognition and Machine Intelligence (PReMI 2025)',
      year: '2025',
      citations: 0,
      impact: 'High',
      abstract: 'Focused on robust audio fingerprinting techniques under noise and distortion for reliable voice identification in challenging acoustic environments.',
      authors: ['Aakash', 'Bittu Kumari', 'Anjali Diwan'],
      status: 'Accepted',
      venue: 'IIT Delhi, India',
      links: {
        paper: '#'
      }
    }
  ];

  const researchAreas = [
    {
      area: 'Computer Vision',
      papers: 1,
      description: 'Deepfake detection and image manipulation analysis'
    },
    {
      area: 'Machine Learning',
      papers: 1,
      description: 'Agricultural prediction and optimization systems'
    },
    {
      area: 'Audio Processing',
      papers: 1,
      description: 'Voice fingerprinting and audio signal analysis'
    },
    {
      area: 'AI Security',
      papers: 3,
      description: 'Ongoing research in AI safety and security'
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
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">3</div>
            <div className="text-muted-foreground">Accepted Papers</div>
          </div>
          <div className="text-center hover-scale">
            <div className="text-3xl md:text-4xl font-bold gradient-neural mb-2">3</div>
            <div className="text-muted-foreground">Ongoing Research</div>
          </div>
          <div className="text-center hover-scale">
            <div className="text-3xl md:text-4xl font-bold text-neural-cyan mb-2">2</div>
            <div className="text-muted-foreground">Presented</div>
          </div>
          <div className="text-center hover-scale">
            <div className="text-3xl md:text-4xl font-bold text-tech-green mb-2">94.84%</div>
            <div className="text-muted-foreground">Best Accuracy</div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-16 slide-in-left">
          <h3 className="text-2xl font-semibold mb-8 text-center gradient-neural">
            Research Areas
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
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
                        {'venue' in paper && <span className="text-neural-cyan">{paper.venue}</span>}
                        {'publisher' in paper && <span className="text-tech-green">{paper.publisher}</span>}
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
                    {'code' in paper.links && paper.links.code && (
                      <Button size="sm" variant="outline" className="hover-scale">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    )}
                    {'slides' in paper.links && paper.links.slides && (
                      <Button size="sm" variant="outline" className="hover-scale">
                        <Download className="h-4 w-4 mr-2" />
                        Slides
                      </Button>
                    )}
                    {'preprint' in paper.links && paper.links.preprint && (
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