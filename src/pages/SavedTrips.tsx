import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Share2, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Eye
} from "lucide-react";

// Static trips data - will be replaced with real data later
const mockTrips = [
  {
    id: 1,
    name: "Beach Paradise Getaway",
    destination: "Goa, India",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    travelers: 2,
    budget: "₹45,000",
    status: "upcoming",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Mountain Adventure",
    destination: "Manali, India",
    startDate: "2024-02-10",
    endDate: "2024-02-15",
    travelers: 4,
    budget: "₹32,000",
    status: "completed",
    createdAt: "2024-01-08"
  },
  {
    id: 3,
    name: "Cultural Heritage Tour",
    destination: "Rajasthan, India",
    startDate: "2024-04-05",
    endDate: "2024-04-12",
    travelers: 3,
    budget: "₹55,000",
    status: "planning",
    createdAt: "2024-01-20"
  },
  {
    id: 4,
    name: "Backpacking Kerala",
    destination: "Kerala, India",
    startDate: "2024-05-01",
    endDate: "2024-05-08",
    travelers: 2,
    budget: "₹38,000",
    status: "planning",
    createdAt: "2024-01-25"
  },
  {
    id: 5,
    name: "Golden Triangle Explorer",
    destination: "Delhi-Agra-Jaipur",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    travelers: 6,
    budget: "₹42,000",
    status: "completed",
    createdAt: "2023-12-15"
  }
];

const SavedTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState(mockTrips);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleView = (tripId: number) => {
    navigate(`/trip-itinerary?id=${tripId}`);
  };

  const handleEdit = (tripId: number) => {
    navigate(`/plan-trip?edit=${tripId}`);
  };

  const handleDelete = (tripId: number) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      setTrips(trips.filter(trip => trip.id !== tripId));
    }
  };

  const handleShare = (trip: any) => {
    setSelectedTrip(trip);
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/shared-trip/${selectedTrip.id}`;
    navigator.clipboard.writeText(shareLink);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack} size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="mt-4 text-3xl font-bold">Your Saved Trips</h1>
          <p className="text-muted-foreground">Manage and view all your trip plans</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {trips.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No trips yet</h3>
            <p className="text-muted-foreground mb-4">Start planning your first adventure!</p>
            <Button onClick={() => navigate("/plan-trip")}>
              Plan Your First Trip
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <Card key={trip.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-2 text-lg">{trip.name}</CardTitle>
                    <Badge className={getStatusColor(trip.status)}>
                      {trip.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{trip.destination}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{trip.startDate} to {trip.endDate}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                      {trip.travelers} travelers
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      {trip.budget}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleView(trip.id)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(trip.id)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleShare(trip)}
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(trip.id)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95">
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

export default SavedTrips;