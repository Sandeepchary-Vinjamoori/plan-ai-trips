import { Calendar, DollarSign, Map, Share2 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Itineraries",
      description: "AI-powered planning that creates perfect day-by-day schedules based on your preferences and travel style.",
      color: "text-feature-primary"
    },
    {
      icon: DollarSign,
      title: "Cost Estimation",
      description: "Get accurate budget breakdowns for flights, hotels, food, and activities before you travel.",
      color: "text-feature-secondary"
    },
    {
      icon: Map,
      title: "Easy Planning",
      description: "Intuitive interface with drag-and-drop functionality to customize your perfect trip in minutes.",
      color: "text-feature-accent"
    },
    {
      icon: Share2,
      title: "Save & Share",
      description: "Save your itineraries, share with travel companions, and access them offline anywhere you go.",
      color: "text-feature-warning"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to 
            <span className="text-gradient"> Plan Perfect Trips</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From initial inspiration to final booking, our platform handles every step of your travel planning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={32} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-primary font-medium">
            <span>Ready to start planning?</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;