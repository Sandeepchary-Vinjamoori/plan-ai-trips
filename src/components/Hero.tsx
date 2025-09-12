import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-travel.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Beautiful travel destination" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-accent/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Plan Smarter,
          <span className="block text-gradient bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Travel Better
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
          Create personalized itineraries with cost estimates and smart recommendations
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Button className="btn-hero shadow-hero">
            Plan Your Trip
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
          >
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
            <div className="text-white/80">Trips Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
            <div className="text-white/80">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">4.9★</div>
            <div className="text-white/80">User Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;