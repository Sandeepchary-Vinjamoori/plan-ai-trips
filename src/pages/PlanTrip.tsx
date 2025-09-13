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

  const budgetOptions = [
    { id: 'budget', label: 'Budget-Friendly', value: 50000, description: '₹30K - ₹50K' },
    { id: 'affordable', label: 'Affordable', value: 100000, description: '₹50K - ₹1L' },
    { id: 'luxurious', label: 'Luxurious', value: 250000, description: '₹1L - ₹2.5L' },
    { id: 'custom', label: 'Custom', value: 500000, description: 'Set your own' }
  ];
  
  const [budgetType, setBudgetType] = useState('affordable');
  const [customBudget, setCustomBudget] = useState([100000]);
  
  // Mock destination data
  const mockDestinations = [
    'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Goa, India', 'Kerala, India',
    'Rajasthan, India', 'Kashmir, India', 'Himachal Pradesh, India', 'Tamil Nadu, India',
    'Paris, France', 'London, UK', 'New York, USA', 'Tokyo, Japan', 'Singapore',
    'Dubai, UAE', 'Thailand', 'Bali, Indonesia', 'Maldives', 'Switzerland', 'Italy'
  ];
  
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);

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

  const handleFromInputChange = (value: string) => {
    setFromLocation(value);
    if (value.length > 1) {
      const filtered = mockDestinations.filter(dest => 
        dest.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filtered.slice(0, 5));
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToInputChange = (value: string) => {
    setToLocation(value);
    if (value.length > 1) {
      const filtered = mockDestinations.filter(dest => 
        dest.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filtered.slice(0, 5));
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const selectFromSuggestion = (suggestion: string) => {
    setFromLocation(suggestion);
    setShowFromSuggestions(false);
  };

  const selectToSuggestion = (suggestion: string) => {
    setToLocation(suggestion);
    setShowToSuggestions(false);
  };

  const getCurrentBudget = () => {
    if (budgetType === 'custom') {
      return customBudget[0];
    }
    return budgetOptions.find(option => option.id === budgetType)?.value || 100000;
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
      budget: getCurrentBudget().toString(),
      budgetType: budgetType,
      preferences: preferences.join(',')
    });
    
    // Navigate to itinerary page with trip data
    navigate(`/trip-itinerary?${tripParams.toString()}`);
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
                  <div className="space-y-2 relative">
                    <Label htmlFor="from" className="text-base font-medium">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="from"
                        type="text"
                        placeholder="Departure city"
                        value={fromLocation}
                        onChange={(e) => handleFromInputChange(e.target.value)}
                        onFocus={() => fromLocation.length > 1 && setShowFromSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                        className="pl-10 pr-10 h-12"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    {/* From Suggestions */}
                    {showFromSuggestions && fromSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                        {fromSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-secondary cursor-pointer text-sm"
                            onClick={() => selectFromSuggestion(suggestion)}
                          >
                            <MapPin className="inline w-4 h-4 mr-2 text-muted-foreground" />
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="to" className="text-base font-medium">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="to"
                        type="text"
                        placeholder="Destination city"
                        value={toLocation}
                        onChange={(e) => handleToInputChange(e.target.value)}
                        onFocus={() => toLocation.length > 1 && setShowToSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                        className="pl-10 pr-10 h-12"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    {/* To Suggestions */}
                    {showToSuggestions && toSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                        {toSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-secondary cursor-pointer text-sm"
                            onClick={() => selectToSuggestion(suggestion)}
                          >
                            <MapPin className="inline w-4 h-4 mr-2 text-muted-foreground" />
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
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
                  <Label className="text-base font-medium">Budget Type</Label>
                  
                  {/* Budget Type Options */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {budgetOptions.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all text-center",
                          "hover:shadow-md",
                          budgetType === option.id 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setBudgetType(option.id)}
                      >
                        <div className="font-medium text-sm mb-1">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Budget Slider */}
                  {budgetType === 'custom' && (
                    <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                      <Label className="text-sm font-medium mb-2 block">
                        Custom Budget: ₹{(customBudget[0] / 1000).toFixed(0)}K
                      </Label>
                      <Slider
                        value={customBudget}
                        onValueChange={setCustomBudget}
                        max={1000000}
                        min={25000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>₹25K</span>
                        <span>₹1L</span>
                        <span>₹2.5L</span>
                        <span>₹5L</span>
                        <span>₹10L+</span>
                      </div>
                    </div>
                  )}
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