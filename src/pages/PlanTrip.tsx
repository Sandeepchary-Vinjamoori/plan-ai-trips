import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign,
  ArrowRight,
  Plane,
  Mountain,
  Palmtree,
  Camera,
  Heart
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const PlanTrip = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState([2500]);
  const [preferences, setPreferences] = useState<string[]>([]);

  const budgetLabels = ['$500', '$1K', '$2.5K', '$5K', '$10K+'];
  const budgetValues = [500, 1000, 2500, 5000, 10000];

  const preferenceOptions = [
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'relaxation', label: 'Relaxation', icon: Palmtree },
    { id: 'cultural', label: 'Cultural', icon: Camera },
    { id: 'family', label: 'Family-friendly', icon: Heart }
  ];

  const handlePreferenceChange = (preferenceId: string) => {
    setPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(p => p !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create URL params for trip data
    const tripParams = new URLSearchParams({
      from: fromLocation,
      to: toLocation,
      startDate: startDate?.toISOString().split('T')[0] || '',
      endDate: endDate?.toISOString().split('T')[0] || '',
      adults: adults.toString(),
      children: children.toString(),
      budget: budget[0].toString(),
      preferences: preferences.join(',')
    });
    
    // Navigate to itinerary page with trip data
    navigate(`/trip-itinerary?${tripParams.toString()}`);
  };

  const getBudgetLabel = (value: number) => {
    const index = budgetValues.findIndex(v => v >= value);
    return index >= 0 ? budgetLabels[index] : budgetLabels[budgetLabels.length - 1];
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
            <Link 
              to="/auth" 
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Save Your Trip
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us about your dream destination and we'll create a personalized itinerary just for you
            </p>
          </div>

          {/* Form */}
          <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Trip Details</CardTitle>
              <CardDescription className="text-center">
                Fill in the details below to generate your custom travel itinerary
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from" className="text-base font-medium">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="from"
                        type="text"
                        placeholder="Departure city"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="pl-10 pr-10 h-12"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to" className="text-base font-medium">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="to"
                        type="text"
                        placeholder="Destination city"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="pl-10 pr-10 h-12"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick departure date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick return date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date < (startDate || new Date())}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Travelers */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Number of Travelers</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Adults</span>
                        <div className="flex items-center space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{adults}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setAdults(adults + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Children</span>
                        <div className="flex items-center space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{children}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setChildren(children + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Budget */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Budget Range: {getBudgetLabel(budget[0])}
                  </Label>
                  <div className="px-3">
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={10000}
                      min={500}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      {budgetLabels.map((label, index) => (
                        <span key={index}>{label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Preferences */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Travel Preferences</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {preferenceOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = preferences.includes(option.id);
                      
                      return (
                        <div
                          key={option.id}
                          className={cn(
                            "border-2 rounded-lg p-4 cursor-pointer transition-all",
                            "hover:shadow-md",
                            isSelected 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => handlePreferenceChange(option.id)}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <Icon className={cn(
                              "h-6 w-6",
                              isSelected ? "text-primary" : "text-muted-foreground"
                            )} />
                            <span className={cn(
                              "text-sm font-medium text-center",
                              isSelected ? "text-primary" : "text-muted-foreground"
                            )}>
                              {option.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-12 btn-hero text-lg"
                    disabled={!fromLocation || !toLocation || !startDate || !endDate}
                  >
                    Generate My Trip
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Note */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Want to save your trips and access them later?{' '}
              <Link to="/auth" className="text-primary hover:text-primary-hover font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;