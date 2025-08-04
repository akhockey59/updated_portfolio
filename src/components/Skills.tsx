import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Machine Learning & AI',
      skills: [
        { name: 'Deep Learning (CNN)', level: 94 },
        { name: 'Computer Vision', level: 92 },
        { name: 'Audio Fingerprinting & Signal Processing', level: 90 },
        { name: 'Explainable AI (XAI)', level: 88 },
        { name: 'Model Deployment & MLOps', level: 85 }
      ]
    },
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 95 },         // AI, DL, CV, ML-heavy usage
        { name: 'JavaScript', level: 88 },     // MERN stack and frontend work
        { name: 'C++', level: 85 },            // Strong base, common in CP & DS
        { name: 'Java', level: 80 },           // App dev (Spring Boot, Android)            // Mentioned in your CV (good to show versatility)
      ]
    },{
      title: 'Frameworks & Tools',
      skills: [
        { name: 'TensorFlow', level: 93 },
        { name: 'Keras', level: 91 },
        { name: 'Scikit-learn', level: 90 },
        { name: 'OpenCV', level: 88 },
        { name: 'PyTorch (Basic)', level: 75 }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'AWS', level: 88 },                  // AWS Academy Data Engineering
        { name: 'Docker', level: 82 },               // Mentioned in DevOps section
        { name: 'Kubernetes', level: 78 },           // Mentioned in DevOps section
        { name: 'Vagrant', level: 75 },              // Listed in your DevOps tools
      ]
    }    
  ];

  const technologies = [
    'Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'PyTorch',
    'Pandas', 'NumPy', 'Matplotlib', 'Seaborn',
    'Docker', 'Kubernetes', 'Vagrant', 'Git', 'Linux',
    'MongoDB', 'Express.js', 'React', 'Node.js', 'Next.js',
    'Spring Boot', 'ASP.NET', 'Flutter', 'React Native', 'Java', 'C++',
    'Google Colab', 'Kaggle', 'MATLAB', 'Tableau', 'Figma', 'Overleaf', 'Jupyter'
  ];  

  return (
    <section id="skills" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for building intelligent systems and solving complex problems.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="glass hover-lift border-border/50 slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl gradient-neural">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technologies */}
        <div className="fade-in">
          <h3 className="text-2xl font-semibold mb-8 text-center gradient-neural">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {technologies.map((tech, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm hover-scale bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-16 slide-in-right">
  <h3 className="text-2xl font-semibold mb-8 text-center gradient-text">
    Certifications & Achievements
  </h3>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
    
    <Card className="glass hover-lift border-border/50 text-center">
      <CardContent className="p-6">
        <div className="text-primary text-2xl font-bold mb-2">AWS Academy</div>
        <div className="text-sm text-muted-foreground">Data Engineering</div>
      </CardContent>
    </Card>

    <Card className="glass hover-lift border-border/50 text-center">
      <CardContent className="p-6">
        <div className="text-neural-cyan text-2xl font-bold mb-2">Cisco</div>
        <div className="text-sm text-muted-foreground">NDG Linux Essentials</div>
      </CardContent>
    </Card>

    <Card className="glass hover-lift border-border/50 text-center">
      <CardContent className="p-6">
        <div className="text-neural-cyan text-2xl font-bold mb-2">Cisco</div>
        <div className="text-sm text-muted-foreground">CCNA7 (16 Labs Completed)</div>
      </CardContent>
    </Card>

    <Card className="glass hover-lift border-border/50 text-center">
      <CardContent className="p-6">
        <div className="text-neural-purple text-2xl font-bold mb-2">Oracle</div>
        <div className="text-sm text-muted-foreground">Database Programming with SQL</div>
      </CardContent>
    </Card>

    <Card className="glass hover-lift border-border/50 text-center">
      <CardContent className="p-6">
        <div className="text-tech-green text-2xl font-bold mb-2">Cisco Packet Tracer</div>
        <div className="text-sm text-muted-foreground">Network Configuration & Simulation</div>
      </CardContent>
    </Card>
    
  </div>
</div>

      </div>
    </section>
  );
};

export default Skills;