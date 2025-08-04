import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/bg.jpg";
import bgVideo from "@/assets/vd2.mp4"; // ✅ this resolves during build time
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const Hero = () => {
  const [openCV, setOpenCV] = React.useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden neural-grid"
    >
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div> */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full float opacity-60"></div>
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-neural-cyan rounded-full float opacity-40"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-3 h-3 bg-neural-purple rounded-full float opacity-50"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute bottom-60 right-10 w-5 h-5 bg-neural-pink rounded-full float opacity-30"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center">
          {/* Main Content */}
          <div className="fade-in">
            <p className="text-lg text-muted-foreground mb-6 animate-pulse">
              Crafting the Future with AI-Powered Ideas
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              AAKASH
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-8 gradient-neural">
              AI Engineer & Research Scientist
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Solving real-world problems with intelligence and precision.
              Driven by machine learning, deep learning, and AI innovation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 slide-in-left">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg hover-lift glow-primary"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
            <Dialog open={openCV} onOpenChange={setOpenCV}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg hover-lift"
                >
                  <Download className="mr-2 h-5 w-5" />
                  View My CV
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-6xl w-full h-[90vh] flex flex-col p-6">
                <DialogTitle className="text-2xl mb-2">My CV</DialogTitle>

                <div className="flex-1 overflow-hidden">
                  <iframe
                    src="/CV.pdf"
                    title="CV"
                    className="w-full h-full rounded-lg shadow-lg border-none"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-16 slide-in-right">
            <a
              href="https://github.com/akhockey59"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="lg"
                className="hover-scale glow-neural"
              >
                <Github className="h-6 w-6" />
              </Button>
            </a>

            <a
              href="https://www.linkedin.com/in/aakash-maurya-90847a252"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="lg"
                className="hover-scale glow-neural"
              >
                <Linkedin className="h-6 w-6" />
              </Button>
            </a>

            <a
              href="mailto:akhockey59@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="lg"
                className="hover-scale glow-neural"
              >
                <Mail className="h-6 w-6" />
              </Button>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-[1px] left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
