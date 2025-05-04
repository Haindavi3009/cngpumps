
import React, { useState } from 'react';
import { MapPin, Fuel, Navigation } from 'lucide-react';
import { Station, StationStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import StationCard from '@/components/stations/StationCard';

interface MapComponentProps {
  stations: Station[];
  selectedStation?: Station | null;
  onSelectStation?: (station: Station) => void;
}

const MapComponent = ({ stations, selectedStation, onSelectStation }: MapComponentProps) => {
  const [showAllStations, setShowAllStations] = useState(true);
  const [filterStatus, setFilterStatus] = useState<StationStatus | null>(null);

  // This is a placeholder for an actual map implementation
  // In a real app, we would integrate with Google Maps, Mapbox, etc.
  return (
    <div className="relative h-full w-full bg-gray-100 overflow-hidden rounded-lg">
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="text-muted-foreground text-sm">
          Interactive map will be loaded here
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" className="bg-white/90 shadow-md">
                <Navigation className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Current Location</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="bg-white/90 shadow-md"
                onClick={() => setFilterStatus(filterStatus === 'available' ? null : 'available')}
              >
                <Fuel className={`h-4 w-4 ${filterStatus === 'available' ? 'text-green-500' : ''}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show Available Stations</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Mock station markers */}
      <div className="absolute inset-0 pointer-events-none">
        {stations
          .filter(station => !filterStatus || station.status === filterStatus)
          .map(station => (
            <div 
              key={station.id}
              className="absolute pointer-events-auto"
              style={{ 
                left: `${Math.random() * 80 + 10}%`, 
                top: `${Math.random() * 80 + 10}%` 
              }}
              onClick={() => onSelectStation?.(station)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-200 hover:scale-110 ${
                  selectedStation?.id === station.id ? 'ring-4 ring-blue-500' : ''
                } ${
                  station.status === 'available' ? 'bg-green-500 text-white' : 
                  station.status === 'busy' ? 'bg-orange-500 text-white' : 
                  station.status === 'maintenance' ? 'bg-purple-500 text-white' : 
                  'bg-red-500 text-white'
                }`}
              >
                <Fuel className="h-5 w-5" />
              </div>
            </div>
          ))}
      </div>

      {/* Selected station info card */}
      {selectedStation && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-96 pointer-events-auto">
          <StationCard station={selectedStation} isDetailed={false} />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
