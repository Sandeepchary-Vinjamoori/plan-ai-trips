import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Travel Blogger",
      image: "https://images.unsplash.com/photo-1494790108755-2616b6fc56e3?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "TravelPlanner completely transformed how I organize my trips. The AI suggestions were spot-on and saved me hours of research. My Japan itinerary was absolutely perfect!"
    },
    {
      name: "Michael Rodriguez", 
      role: "Business Traveler",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "As someone who travels frequently for work, I love how TravelPlanner helps me maximize my free time in new cities. The cost estimation feature is incredibly accurate too."
    },
    {
      name: "Emma Thompson",
      role: "Family Traveler",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", 
      rating: 5,
      text: "Planning a family vacation with kids used to be overwhelming. TravelPlanner made it so easy to find family-friendly activities and restaurants. Our kids had the best time!"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient">Travelers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real travelers are saying about their TravelPlanner experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-feature-warning text-feature-warning" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-feature-accent rounded-full"></div>
              <span>Trusted by 10,000+ travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-feature-primary rounded-full"></div>
              <span>4.9/5 average rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-feature-warning rounded-full"></div>
              <span>98% customer satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;