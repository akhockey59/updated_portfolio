import { Calendar, MapPin, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Journey = () => {
  const experiences = [
    {
      year: 'November 2025 – Present',
      title: 'Database Administrator',
      company: 'Twishatech Technology',
      location: 'Ahmedabad, Gujarat, India',
      description: 'Managing enterprise database systems, ensuring data integrity, security, and optimal performance across production environments.',
      achievements: [
        'Designed and optimized database schemas for improved query performance and scalability',
        'Implemented comprehensive backup and disaster recovery strategies',
        'Managed user permissions and enforced database security protocols',
        'Monitored system health and performed routine maintenance to ensure 99.9% uptime'
      ]
    },
    {
      year: 'May 2025 – July 2025',
      title: 'Research Intern (AI & Signal Processing)',
      company: 'IIEST, Shibpur',
      location: 'Howrah, West Bengal, India',
      description: 'Conducting research in audio fingerprinting techniques for robust and efficient media retrieval on constrained hardware.',
      achievements: [
        'Engineered a lightweight audio fingerprinting algorithm with 94.3% accuracy on clean audio',
        'Achieved 82% accuracy on distorted audio samples under real-world signal conditions',
        'Benchmarked against systems like Shazam and Chromaprint across multiple datasets'
      ]
    },
    {
      year: 'June 2024 – August 2024',
      title: 'Full Stack Developer Intern',
      company: 'LernTricks',
      location: 'Remote',
      description: 'Designed and deployed a complete web platform to streamline admin workflows, integrating robust backend and user-friendly frontend.',
      achievements: [
        'Increased backend efficiency by 60% using Node.js, Express.js, and MongoDB',
        'Reduced server response time by 35% through optimized API design',
        'Built scalable user authentication and database management system with Mongoose'
      ]
    }
  ];
  

  const education = [
    {
      year: '2022 – Present',
      degree: 'B.Tech in Computer Engineering',
      school: 'Marwadi University, Rajkot',
      focus: 'Machine Learning, Data Analytics, Computer Vision, Web & App Development',
      gpa: '8.84 / 10'
    },
    {
      year: '2021 – 2022',
      degree: 'Higher Secondary (Class 12)',
      school: 'Motilal Nehru School of Sports, Sonipat',
      focus: 'Physics, Chemistry, Mathematics',
      gpa: '78.76%'
    },
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