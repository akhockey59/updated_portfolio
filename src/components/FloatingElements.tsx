const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cyan Circle - Top Left */}
      <div 
        className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full bg-neural-cyan/20 float-slow pulse-glow"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Purple Square - Top Right */}
      <div 
        className="absolute top-[15%] right-[10%] w-12 h-12 rounded-lg bg-neural-purple/25 float-medium"
        style={{ animationDelay: '1s' }}
      />
      
      {/* Pink Triangle - Middle Left */}
      <div 
        className="absolute top-[40%] left-[8%] w-0 h-0 float-fast"
        style={{ 
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid hsl(var(--neural-pink) / 0.25)',
          animationDelay: '2s'
        }}
      />
      
      {/* Orange Circle - Middle Right */}
      <div 
        className="absolute top-[45%] right-[5%] w-20 h-20 rounded-full bg-neural-orange/20 float-slow pulse-glow"
        style={{ animationDelay: '0.5s' }}
      />
      
      {/* Green Diamond - Bottom Left */}
      <div 
        className="absolute bottom-[30%] left-[12%] w-10 h-10 bg-tech-green/25 float-medium rotate-45"
        style={{ animationDelay: '1.5s' }}
      />
      
      {/* Cyan Small Circle - Bottom Right */}
      <div 
        className="absolute bottom-[20%] right-[15%] w-8 h-8 rounded-full bg-neural-cyan/30 float-fast"
        style={{ animationDelay: '3s' }}
      />
      
      {/* Purple Ring - Top Center */}
      <div 
        className="absolute top-[25%] left-[45%] w-14 h-14 rounded-full border-2 border-neural-purple/30 float-slow"
        style={{ animationDelay: '2.5s' }}
      />
      
      {/* Orange Small Square - Bottom Center */}
      <div 
        className="absolute bottom-[15%] left-[50%] w-6 h-6 rounded-sm bg-neural-orange/25 float-medium"
        style={{ animationDelay: '1.8s' }}
      />
      
      {/* Pink Circle - Far Right Middle */}
      <div 
        className="absolute top-[60%] right-[3%] w-12 h-12 rounded-full bg-neural-pink/20 float-slow pulse-glow"
        style={{ animationDelay: '4s' }}
      />
      
      {/* Green Small Circle - Far Left Bottom */}
      <div 
        className="absolute bottom-[40%] left-[3%] w-10 h-10 rounded-full bg-tech-green/20 float-fast"
        style={{ animationDelay: '0.8s' }}
      />
    </div>
  );
};

export default FloatingElements;
