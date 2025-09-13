import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign,
  ArrowLeft,
  Plane,
  Clock,
  Star,
  ExternalLink,
  Hotel,
  Car,
  Camera,
  Utensils,
  ShoppingBag,
  Heart,
  Share2,
  Download,
  BookmarkPlus
} from 'lucide-react';

const TripItinerary = () => {
  const [searchParams] = useSearchParams();
  const [activeDay, setActiveDay] = useState('day1');
  
  // Get trip data from URL params (in real app, this would come from API)
  const fromLocation = searchParams.get('from') || 'New York';
  const toLocation = searchParams.get('to') || 'Paris';
  const startDate = searchParams.get('startDate') || '2024-03-15';
  const endDate = searchParams.get('endDate') || '2024-03-22';
  const adults = searchParams.get('adults') || '2';
  const children = searchParams.get('children') || '0';
  const budget = searchParams.get('budget') || '2500';
  const preferences = searchParams.get('preferences')?.split(',') || ['cultural', 'relaxation'];

  // Static trip data (will be dynamic later)
  const tripDays = [
    {
      id: 'day1',
      date: 'March 15, 2024',
      title: 'Arrival & City Center',
      activities: [
        {
          time: '9:00 AM',
          title: 'Arrival at Charles de Gaulle Airport',
          description: 'Land in Paris and take the RER B train to city center',
          type: 'transport',
          duration: '1 hour'
        },
        {
          time: '11:00 AM',
          title: 'Hotel Check-in',
          description: 'Check into Hotel des Grands Boulevards',
          type: 'accommodation',
          duration: '30 mins'
        },
        {
          time: '1:00 PM',
          title: 'Lunch at Le Comptoir du Relais',
          description: 'Traditional French bistro in Saint-Germain',
          type: 'dining',
          duration: '1.5 hours'
        },
        {
          time: '3:00 PM',
          title: 'Seine River Cruise',
          description: 'Relaxing boat tour with views of Notre-Dame and Eiffel Tower',
          type: 'activity',
          duration: '2 hours'
        },
        {
          time: '7:00 PM',
          title: 'Evening at Montmartre',
          description: 'Explore the artistic quarter and visit Sacré-Cœur',
          type: 'sightseeing',
          duration: '3 hours'
        }
      ]
    },
    {
      id: 'day2',
      date: 'March 16, 2024',
      title: 'Museums & Culture',
      activities: [
        {
          time: '9:00 AM',
          title: 'Louvre Museum',
          description: 'Skip-the-line tickets included. See Mona Lisa and Venus de Milo',
          type: 'culture',
          duration: '3 hours'
        },
        {
          time: '1:00 PM',
          title: 'Lunch at Angelina',
          description: 'Famous hot chocolate and pastries',
          type: 'dining',
          duration: '1 hour'
        },
        {
          time: '3:00 PM',
          title: 'Tuileries Garden Walk',
          description: 'Stroll through the beautiful gardens',
          type: 'relaxation',
          duration: '1 hour'
        },
        {
          time: '5:00 PM',
          title: 'Shopping on Champs-Élysées',
          description: 'Browse boutiques and department stores',
          type: 'shopping',
          duration: '2 hours'
        }
      ]
    }
  ];

  const accommodations = [
    {
      name: 'Hotel des Grands Boulevards',
      rating: 4.5,
      price: '$180/night',
      location: '17 Boulevard Poissonnière, 2nd arr.',
      amenities: ['Free WiFi', 'Breakfast', 'Concierge', 'Fitness Center'],
      image: '/placeholder.svg',
      bookingUrl: '#'
    }
  ];

  const flights = [
    {
      airline: 'Air France',
      route: `${fromLocation} → ${toLocation}`,
      departure: '6:30 AM',
      arrival: '8:45 PM',
      price: '$650',
      duration: '7h 15m',
      bookingUrl: '#'
    },
    {
      airline: 'Air France',
      route: `${toLocation} → ${fromLocation}`,
      departure: '2:15 PM',
      arrival: '4:30 PM',
      price: '$650',
      duration: '8h 15m',
      bookingUrl: '#'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'transport': return Plane;
      case 'accommodation': return Hotel;
      case 'dining': return Utensils;
      case 'activity': return Camera;
      case 'sightseeing': return MapPin;
      case 'culture': return Star;
      case 'shopping': return ShoppingBag;
      case 'relaxation': return Heart;
      default: return MapPin;
    }
  };

  const totalBudget = parseInt(budget);
  const budgetBreakdown = {
    flights: 1300,
    accommodation: 720,
    activities: 340,
    dining: 280,
    shopping: 200,
    transport: 160
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/10">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gradient">TravelPlanner</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link to="/auth">
                <Button size="sm">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Trip Overview */}
          <div className="mb-8">
            <Link 
              to="/plan-trip" 
              className="inline-flex items-center text-primary hover:text-primary-hover mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Planning
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  Your {toLocation} Adventure
                </h1>
                <p className="text-xl text-muted-foreground">
                  Personalized itinerary for {adults} adult{adults !== '1' ? 's' : ''} 
                  {children !== '0' && `, ${children} child${children !== '1' ? 'ren' : ''}`}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {preferences.map((pref) => (
                  <Badge key={pref} variant="secondary" className="capitalize">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Trip Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Route</div>
                  <div className="font-semibold">{fromLocation} → {toLocation}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <CalendarIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-semibold">7 Days</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Travelers</div>
                  <div className="font-semibold">{parseInt(adults) + parseInt(children)} People</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Total Budget</div>
                  <div className="font-semibold">${totalBudget}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Itinerary */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Day-by-Day Itinerary</CardTitle>
                  <CardDescription>Your personalized travel schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeDay} onValueChange={setActiveDay}>
                    <TabsList className="grid w-full grid-cols-2">
                      {tripDays.map((day) => (
                        <TabsTrigger key={day.id} value={day.id}>
                          Day {day.id.slice(-1)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {tripDays.map((day) => (
                      <TabsContent key={day.id} value={day.id} className="mt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{day.title}</h3>
                            <span className="text-sm text-muted-foreground">{day.date}</span>
                          </div>
                          
                          <div className="space-y-4">
                            {day.activities.map((activity, index) => {
                              const Icon = getActivityIcon(activity.type);
                              return (
                                <div key={index} className="flex gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                      <Icon className="h-4 w-4 text-primary" />
                                    </div>
                                    {index < day.activities.length - 1 && (
                                      <div className="w-px h-8 bg-border mt-2" />
                                    )}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="font-medium">{activity.title}</h4>
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {activity.time}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                                    <Badge variant="outline" className="text-xs">
                                      {activity.duration}
                                    </Badge>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Budget Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Breakdown</CardTitle>
                  <CardDescription>How your ${totalBudget} is allocated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(budgetBreakdown).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{category}</span>
                      <span className="font-medium">${amount}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span>${Object.values(budgetBreakdown).reduce((a, b) => a + b, 0)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Flights */}
              <Card>
                <CardHeader>
                  <CardTitle>Flight Details</CardTitle>
                  <CardDescription>Recommended flights for your trip</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {flights.map((flight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{flight.airline}</div>
                          <div className="text-sm text-muted-foreground">{flight.route}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">{flight.price}</div>
                          <div className="text-xs text-muted-foreground">{flight.duration}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {flight.departure} → {flight.arrival}
                      </div>
                      <Button size="sm" className="w-full" asChild>
                        <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer">
                          Book Flight
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Accommodation */}
              <Card>
                <CardHeader>
                  <CardTitle>Accommodation</CardTitle>
                  <CardDescription>Handpicked hotels for your stay</CardDescription>
                </CardHeader>
                <CardContent>
                  {accommodations.map((hotel, index) => (
                    <div key={index} className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg"></div>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{hotel.name}</h4>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm">{hotel.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{hotel.location}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {hotel.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-primary">{hotel.price}</span>
                          <Button size="sm" asChild>
                            <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">
                              Book Now
                              <ExternalLink className="h-3 w-3 ml-2" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Services</CardTitle>
                  <CardDescription>Enhance your travel experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-between" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        <Car className="h-4 w-4 mr-2" />
                        Car Rental
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Travel Insurance
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        <Camera className="h-4 w-4 mr-2" />
                        Photography Tours
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripItinerary;