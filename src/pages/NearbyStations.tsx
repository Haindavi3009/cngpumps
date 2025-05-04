
import React, { useState } from 'react';
import { mockStations } from '@/data/mockData';
import { Station } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StationList from '@/components/stations/StationList';
import StationDetails from '@/components/stations/StationDetails';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const NearbyStations = () => {
  const [stations] = useState<Station[]>(
    // Sort by random distance to simulate nearby stations
    [...mockStations].sort(() => Math.random() - 0.5).slice(0, 10)
  );
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [searchRadius, setSearchRadius] = useState(5);

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Nearby Stations</h1>
          <p className="text-muted-foreground">Find CNG stations close to your current location</p>
        </div>
        
        <Button className="flex gap-2 bg-cng-600 hover:bg-cng-700 w-full sm:w-auto">
          <Navigation className="h-4 w-4" />
          Use Current Location
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search this area..."
                  className="pl-9"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Search Radius: {searchRadius} km</label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                  className="w-full accent-cng-600"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 km</span>
                  <span>20 km</span>
                </div>
              </div>
            </div>
          </Card>
          
          <ScrollArea className="h-[calc(100vh-18rem)]">
            <div className="pr-4">
              <StationList 
                stations={stations}
                selectedStation={selectedStation}
                onSelectStation={setSelectedStation}
              />
            </div>
          </ScrollArea>
        </div>
        
        <div className="lg:col-span-2">
          {selectedStation ? (
            <StationDetails station={selectedStation} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
              <div className="bg-muted rounded-full p-4">
                <MapPin className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mt-4">Select a Station</h2>
              <p className="text-muted-foreground max-w-md mt-2">
                Choose a CNG station from the list to view detailed information about amenities,
                prices, and user reviews.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbyStations;
