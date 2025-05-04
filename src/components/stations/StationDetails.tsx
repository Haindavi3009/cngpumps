import React from 'react';
import { Station } from '@/types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Fuel, 
  Star, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar, 
  ThumbsUp,
  Route 
} from 'lucide-react';

interface StationDetailsProps {
  station: Station;
}

const StationDetails = ({ station }: StationDetailsProps) => {
  const getStatusInfo = () => {
    switch (station.status) {
      case 'available':
        return { color: 'bg-green-500', text: 'Available Now' };
      case 'busy':
        return { color: 'bg-orange-500', text: `Busy (${station.waitingTime} min wait)` };
      case 'closed':
        return { color: 'bg-red-500', text: 'Closed Now' };
      case 'maintenance':
        return { color: 'bg-purple-500', text: 'Under Maintenance' };
      default:
        return { color: 'bg-gray-500', text: 'Status Unknown' };
    }
  };

  const statusInfo = getStatusInfo();
  
  // Format date for reviews
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{station.name}</CardTitle>
              <CardDescription className="flex items-center mt-1 gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {station.address}, {station.city}, {station.state}
              </CardDescription>
            </div>
            <Badge className={`${statusInfo.color} text-white`}>
              {statusInfo.text}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center p-3 bg-secondary/50 rounded-lg">
              <Fuel className="h-6 w-6 text-cng-600 mb-2" />
              <div className="text-sm text-center">
                <div className="font-bold">₹{station.pricePerKg}</div>
                <div className="text-xs text-muted-foreground">Per Kg</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-secondary/50 rounded-lg">
              <Star className="h-6 w-6 text-energy-500 mb-2" />
              <div className="text-sm text-center">
                <div className="font-bold">{station.rating}/5</div>
                <div className="text-xs text-muted-foreground">{station.reviewCount} reviews</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-secondary/50 rounded-lg">
              <Clock className="h-6 w-6 text-cng-600 mb-2" />
              <div className="text-sm text-center">
                <div className="font-bold">
                  {station.operatingHours.open === "00:00" && station.operatingHours.close === "24:00" 
                    ? "24 Hours" 
                    : `${station.operatingHours.open} - ${station.operatingHours.close}`}
                </div>
                <div className="text-xs text-muted-foreground">Operating Hours</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-secondary/50 rounded-lg">
              <Phone className="h-6 w-6 text-cng-600 mb-2" />
              <div className="text-sm text-center">
                <div className="font-bold">Contact</div>
                <div className="text-xs text-muted-foreground">+91-{Math.floor(Math.random() * 9000000000 + 1000000000)}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="default" className="bg-cng-600 hover:bg-cng-700">
              <MapPin className="h-4 w-4 mr-2" /> Directions
            </Button>
            <Button variant="outline">
              <Route className="h-4 w-4 mr-2" /> Add to Route
            </Button>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" /> Add Review
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="info">
        <TabsList className="w-full">
          <TabsTrigger value="info" className="flex-1">Information</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="pt-4">
          <Card>
            <CardContent className="p-5">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Available Facilities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {station.facilities.map(facility => (
                      <div key={facility} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-cng-500"></div>
                        <span>{facility.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
                  <div className="flex flex-wrap gap-2">
                    {station.paymentMethods.map(method => (
                      <Badge key={method} variant="secondary" className="text-xs py-1">
                        {method.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Last Updated</h3>
                  <p className="text-sm text-muted-foreground">
                    Status and pricing information was last updated on {formatDate(station.lastUpdated)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="pt-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on {station.reviewCount} reviews
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-3xl font-bold">{station.rating}</div>
                  <div className="flex flex-col">
                    <div className="flex text-energy-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(station.rating) ? 'fill-energy-500' : ''}`} />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">out of 5</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {station.reviews.map(review => (
                  <div key={review.id} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium">{review.username}</div>
                        <div className="flex text-energy-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-energy-500' : ''}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {formatDate(review.date)}
                      </div>
                    </div>
                    
                    <p className="text-sm mt-2">{review.comment}</p>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StationDetails;
