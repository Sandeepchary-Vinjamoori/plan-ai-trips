import { ArrowLeft, Play, Monitor, Smartphone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/10">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <Link 
              to="/plan-trip" 
              className="btn-hero"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              See TravelPlanner in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how easy it is to plan your perfect trip with our AI-powered platform
            </p>
          </div>

          {/* Video Placeholder */}
          <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm mb-8">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Placeholder Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                {/* Play Button */}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer group">
                    <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    Demo Video Coming Soon
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    We're preparing an exciting walkthrough of TravelPlanner's features. Check back soon!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-feature-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6 text-feature-primary" />
                </div>
                <CardTitle className="text-lg">Smart Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  See how AI creates personalized itineraries based on your preferences and budget
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-feature-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-feature-accent" />
                </div>
                <CardTitle className="text-lg">Mobile Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Plan your trips on any device with our responsive design and intuitive interface
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-feature-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6 text-feature-warning" />
                </div>
                <CardTitle className="text-lg">Easy Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Discover how seamless it is to book flights, hotels, and activities in one place
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Plan Your Next Adventure?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't wait for the demo - start planning your perfect trip today with our easy-to-use platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plan-trip">
                <Button className="btn-hero">
                  Start Planning Now
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;