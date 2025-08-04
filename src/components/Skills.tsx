import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Machine Learning & AI',
      skills: [
        { name: 'Deep Learning', level: 95 },
        { name: 'Computer Vision', level: 90 },
        { name: 'Natural Language Processing', level: 88 },
        { name: 'Reinforcement Learning', level: 85 },
        { name: 'MLOps', level: 87 }
      ]
    },
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript/TypeScript', level: 85 },
        { name: 'R', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'C++', level: 78 }
      ]
    },
    {
      title: 'Frameworks & Tools',
      skills: [
        { name: 'TensorFlow', level: 93 },
        { name: 'PyTorch', level: 90 },
        { name: 'Scikit-learn', level: 92 },
        { name: 'Keras', level: 89 },
        { name: 'OpenCV', level: 85 }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'AWS', level: 88 },
        { name: 'Google Cloud Platform', level: 85 },
        { name: 'Docker', level: 82 },
        { name: 'Kubernetes', level: 78 },
        { name: 'Azure', level: 80 }
      ]
    }
  ];

  const technologies = [
    'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV',
    'NLTK', 'spaCy', 'Transformers', 'Hugging Face', 'LangChain', 'Vector DBs',
    'AWS SageMaker', 'Google AI Platform', 'MLflow', 'Weights & Biases',
    'Docker', 'Kubernetes', 'Apache Spark', 'Hadoop', 'Elasticsearch',
    'PostgreSQL', 'MongoDB', 'Redis', 'FastAPI', 'Flask', 'Django',
    'React', 'TypeScript', 'Node.js', 'Git', 'Linux', 'Jupyter'
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

        {/* Certifications */}
        <div className="mt-16 slide-in-right">
          <h3 className="text-2xl font-semibold mb-8 text-center gradient-text">
            Certifications & Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass hover-lift border-border/50 text-center">
              <CardContent className="p-6">
                <div className="text-primary text-2xl font-bold mb-2">AWS</div>
                <div className="text-sm text-muted-foreground">Machine Learning Specialty</div>
              </CardContent>
            </Card>
            <Card className="glass hover-lift border-border/50 text-center">
              <CardContent className="p-6">
                <div className="text-neural-cyan text-2xl font-bold mb-2">Google</div>
                <div className="text-sm text-muted-foreground">Professional ML Engineer</div>
              </CardContent>
            </Card>
            <Card className="glass hover-lift border-border/50 text-center">
              <CardContent className="p-6">
                <div className="text-neural-purple text-2xl font-bold mb-2">TensorFlow</div>
                <div className="text-sm text-muted-foreground">Developer Certificate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;