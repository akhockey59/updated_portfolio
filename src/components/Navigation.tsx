import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ColorThemeSelector } from '@/components/ColorThemeSelector';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'journey', label: 'Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex-shrink-0 group cursor-pointer"
          >
            <div 
              className="relative px-4 py-2 md:px-6 md:py-2.5 rounded-md overflow-hidden transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(180deg, hsl(var(--primary)/0.9) 0%, hsl(var(--primary)) 50%, hsl(var(--primary)/0.7) 100%)',
                boxShadow: `
                  0 0 30px hsl(var(--primary)/0.6),
                  0 0 60px hsl(var(--primary)/0.4),
                  inset 0 1px 0 hsl(var(--primary-foreground)/0.3),
                  inset 0 -1px 0 hsl(var(--primary)/0.5)
                `,
                border: '1px solid hsl(var(--primary)/0.8)',
              }}
            >
              {/* Glow overlay */}
              <div 
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'linear-gradient(180deg, hsl(var(--primary-foreground)/0.2) 0%, transparent 50%, hsl(var(--primary)/0.3) 100%)',
                }}
              />
              {/* Text */}
              <span 
                className="relative z-10 text-lg md:text-xl font-bold tracking-wide"
                style={{
                  color: 'hsl(var(--primary-foreground))',
                  textShadow: '0 1px 2px hsl(var(--primary)/0.5), 0 0 20px hsl(var(--primary-foreground)/0.3)',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                }}
              >
                Skywalker's Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-primary/10 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <ColorThemeSelector />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <ColorThemeSelector />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/90 backdrop-blur-md rounded-lg mt-2 border border-border">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 hover:bg-primary/10"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;