import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plane, User, Settings, LogOut, Calendar, MapPin, Users, Share2 } from "lucide-react";

// Static user data - will be replaced with real data later
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
  initials: "JD"
};

const mockTrips = [
  {
    id: 1,
    name: "Beach Paradise Getaway",
    destination: "Goa, India",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    travelers: 2,
    budget: "₹45,000",
    status: "upcoming"
  },
  {
    id: 2,
    name: "Mountain Adventure",
    destination: "Manali, India",
    startDate: "2024-02-10",
    endDate: "2024-02-15",
    travelers: 4,
    budget: "₹32,000",
    status: "completed"
  },
  {
    id: 3,
    name: "Cultural Heritage Tour",
    destination: "Rajasthan, India",
    startDate: "2024-04-05",
    endDate: "2024-04-12",
    travelers: 3,
    budget: "₹55,000",
    status: "planning"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  const handlePlanTrip = () => {
    navigate("/plan-trip");
  };

  const handleSavedTrips = () => {
    navigate("/saved-trips");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    // For now, just redirect to home - will implement actual logout later
    navigate("/");
  };

  const handleShare = (trip: any) => {
    setSelectedTrip(trip);
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/shared-trip/${selectedTrip.id}`;
    navigator.clipboard.writeText(shareLink);
    // Toast notification would go here
    alert("Link copied to clipboard!");
  };

  const shareViaWhatsApp = () => {
    const shareLink = `${window.location.origin}/shared-trip/${selectedTrip.id}`;
    const message = `Check out my trip plan: ${selectedTrip.name} to ${selectedTrip.destination}! ${shareLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = () => {
    const shareLink = `${window.location.origin}/shared-trip/${selectedTrip.id}`;
    const subject = `Trip Plan: ${selectedTrip.name}`;
    const body = `Hi!\n\nI'd like to share my trip plan with you:\n\n${selectedTrip.name}\nDestination: ${selectedTrip.destination}\nDates: ${selectedTrip.startDate} to ${selectedTrip.endDate}\n\nView full itinerary: ${shareLink}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TripPlanner</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {mockUser.initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{mockUser.name}</p>
                  <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSavedTrips} className="cursor-pointer">
                <MapPin className="mr-2 h-4 w-4" />
                Saved Trips
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEditProfile} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Welcome back, {mockUser.name} 👋
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Ready to plan your next adventure?
          </p>
          <Button onClick={handlePlanTrip} size="lg" className="text-lg">
            <Plane className="mr-2 h-5 w-5" />
            Plan Your Trip
          </Button>
        </div>

        {/* Recent Trips Section */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Recent Trips</h2>
            <Button variant="outline" onClick={handleSavedTrips}>
              View All Trips
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTrips.slice(0, 3).map((trip) => (
              <Card key={trip.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-2">{trip.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(trip)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {trip.destination}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {trip.startDate} to {trip.endDate}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      {trip.travelers} travelers
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{trip.budget}</span>
                      <Badge variant={trip.status === 'completed' ? 'secondary' : 'default'}>
                        {trip.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Share Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Share "{selectedTrip?.name}" with others
                </p>
                <div className="space-y-2">
                  <Button onClick={copyShareLink} className="w-full" variant="outline">
                    Copy Link
                  </Button>
                  <Button onClick={shareViaWhatsApp} className="w-full" variant="outline">
                    Share via WhatsApp
                  </Button>
                  <Button onClick={shareViaEmail} className="w-full" variant="outline">
                    Share via Email
                  </Button>
                </div>
                <Button 
                  onClick={() => setShowShareModal(false)} 
                  className="w-full"
                  variant="secondary"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;