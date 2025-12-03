import { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Main orb - follows with delay */}
      <div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-sm cursor-orb"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          opacity: isVisible ? 1 : 0,
          transition: 'left 0.15s ease-out, top 0.15s ease-out, opacity 0.3s ease',
        }}
      />
      
      {/* Secondary ring - slower follow */}
      <div
        className="absolute w-12 h-12 rounded-full border-2 border-primary/30 cursor-ring"
        style={{
          left: position.x - 24,
          top: position.y - 24,
          opacity: isVisible ? 1 : 0,
          transition: 'left 0.25s ease-out, top 0.25s ease-out, opacity 0.3s ease',
        }}
      />
      
      {/* Trailing particles */}
      <div
        className="absolute w-4 h-4 rounded-full bg-neural-cyan/30 blur-md"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          opacity: isVisible ? 0.6 : 0,
          transition: 'left 0.35s ease-out, top 0.35s ease-out, opacity 0.3s ease',
        }}
      />
      <div
        className="absolute w-3 h-3 rounded-full bg-neural-purple/30 blur-md"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          opacity: isVisible ? 0.5 : 0,
          transition: 'left 0.45s ease-out, top 0.45s ease-out, opacity 0.3s ease',
        }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-neural-pink/30 blur-sm"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          opacity: isVisible ? 0.4 : 0,
          transition: 'left 0.55s ease-out, top 0.55s ease-out, opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default CursorFollower;
