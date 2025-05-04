
import React from 'react';
import { Station } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fuel, Star, Clock, Users, MapPin } from 'lucide-react';

interface StationCardProps {
  station: Station;
  isDetailed?: boolean;
}

const StationCard = ({ station, isDetailed = false }: StationCardProps) => {
  // Get appropriate status color and text
  const getStatusInfo = () => {
    switch (station.status) {
      case 'available':
        return { color: 'bg-green-500', text: 'Available' };
      case 'busy':
        return { color: 'bg-orange-500', text: 'Busy' };
      case 'closed':
        return { color: 'bg-red-500', text: 'Closed' };
      case 'maintenance':
        return { color: 'bg-purple-500', text: 'Maintenance' };
      default:
        return { color: 'bg-gray-500', text: 'Unknown' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border-none animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{station.name}</CardTitle>
            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{station.address}, {station.city}</span>
            </div>
          </div>
          <Badge className={`${statusInfo.color} text-white`}>
            {statusInfo.text}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-cng-600" />
            <span className="text-sm">₹{station.pricePerKg}/kg</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-energy-500" />
            <span className="text-sm">{station.rating} ({station.reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cng-600" />
            <span className="text-sm">
              {station.operatingHours.open === "00:00" && station.operatingHours.close === "24:00" 
                ? "24 Hours" 
                : `${station.operatingHours.open} - ${station.operatingHours.close}`}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-cng-600" />
            <span className="text-sm">
              {station.status === 'available' 
                ? 'No Wait' 
                : station.status === 'busy' 
                  ? `~${station.waitingTime} min wait` 
                  : 'Unavailable'}
            </span>
          </div>
        </div>

        {isDetailed && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium mb-2">Available Facilities:</div>
            <div className="flex flex-wrap gap-1.5">
              {station.facilities.map(facility => (
                <Badge key={facility} variant="secondary" className="text-xs">
                  {facility.replace('_', ' ')}
                </Badge>
              ))}
            </div>
            
            <div className="text-sm font-medium mb-2 mt-3">Payment Methods:</div>
            <div className="flex flex-wrap gap-1.5">
              {station.paymentMethods.map(method => (
                <Badge key={method} variant="outline" className="text-xs">
                  {method.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StationCard;
