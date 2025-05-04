
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, MapPin, Route as RouteIcon, Plus, X } from 'lucide-react';
import MapComponent from '@/components/map/MapComponent';
import { mockStations } from '@/data/mockData';
import { Station } from '@/types';

const PlanRoute = () => {
  const [stations] = useState<Station[]>(mockStations);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [waypoints, setWaypoints] = useState<{ id: string; name: string }[]>([]);

  // Calculate estimated distance and time (mock data)
  const distance = origin && destination ? Math.floor(Math.random() * 500) + 50 : 0;
  const duration = distance > 0 ? Math.floor(distance / 60 * 60) : 0; // Assuming 60km/h average speed
  const estimatedCNGUsage = distance > 0 ? Math.round(distance * 0.05 * 10) / 10 : 0; // Assuming 0.05kg/km

  const handleAddWaypoint = () => {
    if (!selectedStation) return;
    
    if (!waypoints.some(wp => wp.id === selectedStation.id)) {
      setWaypoints([
        ...waypoints,
        {
          id: selectedStation.id,
          name: selectedStation.name
        }
      ]);
    }
    
    setSelectedStation(null);
  };
  
  const handleRemoveWaypoint = (id: string) => {
    setWaypoints(waypoints.filter(wp => wp.id !== id));
  };

  return (
    <div className="container py-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Plan Your Route</h1>
        <p className="text-muted-foreground">Find the best CNG stations along your journey</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-lg font-medium">Origin & Destination</h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Starting point"
                      className="pl-9"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Destination"
                      className="pl-9"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">CNG Stations</h2>
                  {selectedStation && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 px-2" 
                      onClick={handleAddWaypoint}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  {waypoints.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Select stations from the map to add waypoints
                      </p>
                    </div>
                  ) : (
                    waypoints.map((waypoint, index) => (
                      <div 
                        key={waypoint.id} 
                        className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="bg-cng-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                            {index + 1}
                          </div>
                          <span className="text-sm truncate max-w-[180px]">{waypoint.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleRemoveWaypoint(waypoint.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Journey Overview</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Distance</div>
                    <div className="text-lg font-medium">{distance > 0 ? `${distance} km` : '-'}</div>
                  </div>
                  
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="text-lg font-medium">
                      {duration > 0 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : '-'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="text-sm text-muted-foreground">CNG Usage</div>
                    <div className="text-lg font-medium">
                      {estimatedCNGUsage > 0 ? `~${estimatedCNGUsage} kg` : '-'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Est. Cost</div>
                    <div className="text-lg font-medium">
                      {estimatedCNGUsage > 0 ? `₹${Math.round(estimatedCNGUsage * 60)}` : '-'}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-cng-600 hover:bg-cng-700" 
                  disabled={!origin || !destination}
                >
                  <RouteIcon className="h-4 w-4 mr-2" />
                  Calculate Route
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2 h-[600px]">
          <MapComponent 
            stations={stations} 
            selectedStation={selectedStation} 
            onSelectStation={setSelectedStation}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanRoute;
