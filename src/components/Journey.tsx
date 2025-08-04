import { Calendar, MapPin, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Journey = () => {
  const experiences = [
    {
      year: '2023 - Present',
      title: 'Senior AI Research Scientist',
      company: 'TechCorp AI Labs',
      location: 'San Francisco, CA',
      description: 'Leading research initiatives in large language models and multimodal AI systems. Developing next-generation AI architectures for autonomous systems.',
      achievements: [
        'Led team of 8 researchers on LLM optimization project',
        'Published 5 papers in top-tier AI conferences',
        'Reduced model inference time by 40% while maintaining accuracy'
      ]
    },
    {
      year: '2021 - 2023',
      title: 'Machine Learning Engineer',
      company: 'InnovateTech Solutions',
      location: 'Seattle, WA',
      description: 'Designed and deployed production ML systems for computer vision and NLP applications. Built scalable ML infrastructure serving millions of users.',
      achievements: [
        'Deployed 15+ ML models to production with 99.9% uptime',
        'Improved recommendation system performance by 35%',
        'Mentored 6 junior engineers and data scientists'
      ]
    },
    {
      year: '2019 - 2021',
      title: 'AI Research Associate',
      company: 'University Research Lab',
      location: 'Boston, MA',
      description: 'Conducted cutting-edge research in deep reinforcement learning and neural architecture search. Collaborated with international research teams.',
      achievements: [
        'Developed novel RL algorithm with 25% improvement over SOTA',
        'Co-authored 8 research papers in prestigious journals',
        'Received Best Paper Award at ICML 2020'
      ]
    },
    {
      year: '2017 - 2019',
      title: 'Data Scientist',
      company: 'DataDriven Analytics',
      location: 'New York, NY',
      description: 'Built predictive models for financial services and healthcare clients. Specialized in time series forecasting and anomaly detection.',
      achievements: [
        'Delivered $2M+ in client value through ML solutions',
        'Reduced fraud detection false positives by 60%',
        'Led workshops on ML best practices for 100+ professionals'
      ]
    }
  ];

  const education = [
    {
      year: '2015 - 2017',
      degree: 'M.S. in Computer Science',
      school: 'Stanford University',
      focus: 'Artificial Intelligence',
      gpa: '3.9/4.0'
    },
    {
      year: '2011 - 2015',
      degree: 'B.S. in Computer Engineering',
      school: 'MIT',
      focus: 'Machine Learning & Robotics',
      gpa: '3.8/4.0'
    }
  ];

  return (
    <section id="journey" className="py-20 neural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Professional Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A decade of innovation, research, and building the future of artificial intelligence.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-12 text-center gradient-neural">
            Work Experience
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-neural-cyan transform md:-translate-x-0.5"></div>
            
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                } md:w-1/2 slide-in-${index % 2 === 0 ? 'right' : 'left'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-auto md:right-auto w-8 h-8 bg-primary rounded-full border-4 border-background transform md:translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center md:left-1/2 glow-primary">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                
                <Card className="ml-12 md:ml-0 glass hover-lift border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <div className="flex items-center text-sm text-neural-cyan">
                        <Calendar className="h-4 w-4 mr-1" />
                        {exp.year}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold mb-1">{exp.title}</h4>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                    
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start">
                          <Trophy className="h-4 w-4 text-neural-orange mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="fade-in">
          <h3 className="text-2xl font-semibold mb-12 text-center gradient-neural">
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card 
                key={index} 
                className="glass hover-lift border-border/50 slide-in-left"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-neural-cyan font-medium mb-2">{edu.year}</div>
                  <h4 className="text-xl font-semibold mb-2">{edu.degree}</h4>
                  <p className="text-primary font-medium mb-2">{edu.school}</p>
                  <p className="text-sm text-muted-foreground mb-2">{edu.focus}</p>
                  <div className="text-sm text-neural-orange font-medium">GPA: {edu.gpa}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;