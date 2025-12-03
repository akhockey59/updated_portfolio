import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Journey from '@/components/Journey';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
       <Research />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
