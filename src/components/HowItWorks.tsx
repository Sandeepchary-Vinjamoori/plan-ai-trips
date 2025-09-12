import { ArrowRight, MapPin, Sparkles, Plane } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MapPin,
      number: "01",
      title: "Enter Details",
      description: "Tell us your destination, travel dates, budget, and preferences. The more details, the better your itinerary!",
      color: "from-feature-primary to-feature-secondary"
    },
    {
      icon: Sparkles,
      number: "02", 
      title: "Get Itinerary",
      description: "Our AI analyzes thousands of travel data points to create a personalized day-by-day plan just for you.",
      color: "from-feature-secondary to-feature-accent"
    },
    {
      icon: Plane,
      number: "03",
      title: "Book & Go",
      description: "Review your itinerary, make adjustments, and book everything through our trusted travel partners.",
      color: "from-feature-accent to-feature-warning"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to your perfect trip. No stress, no endless research, just great travel planning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="step-card relative overflow-hidden group">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
                  {step.number}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                  <div className="bg-primary/10 rounded-full p-2">
                    <ArrowRight className="text-primary" size={24} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Plan Your Next Adventure?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of travelers who've discovered the joy of stress-free trip planning.
            </p>
            <button className="btn-hero">
              Start Planning Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;