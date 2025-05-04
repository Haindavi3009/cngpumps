
import React from 'react';
import { Station } from '@/types';
import StationCard from './StationCard';
import { Button } from '@/components/ui/button';
import { MapPin, Route } from 'lucide-react';

interface StationListProps {
  stations: Station[];
  selectedStation?: Station | null;
  onSelectStation: (station: Station) => void;
  isLoading?: boolean;
}

const StationList = ({ 
  stations, 
  selectedStation, 
  onSelectStation,
  isLoading = false
}: StationListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <div className="bg-muted rounded-full p-3 mb-3">
          <MapPin className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No stations found</h3>
        <p className="text-muted-foreground mt-1 mb-4">
          Try adjusting your filters or zooming out on the map
        </p>
        <Button variant="outline">Reset Filters</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {stations.map(station => (
        <div
          key={station.id}
          className={`transition-all cursor-pointer hover:scale-[1.02] ${
            selectedStation?.id === station.id ? 'ring-2 ring-primary rounded-lg' : ''
          }`}
          onClick={() => onSelectStation(station)}
        >
          <StationCard station={station} isDetailed={selectedStation?.id === station.id} />
          
          {selectedStation?.id === station.id && (
            <div className="flex justify-end gap-2 p-2 bg-gray-50 rounded-b-lg border-t">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>Directions</span>
              </Button>
              <Button variant="default" size="sm" className="flex items-center gap-1 bg-cng-600 hover:bg-cng-700">
                <Route className="h-3.5 w-3.5" />
                <span>Add to Route</span>
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StationList;
