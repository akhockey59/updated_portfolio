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
import CursorFollower from '@/components/CursorFollower';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <CursorFollower />
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
