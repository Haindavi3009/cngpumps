
import React, { useState } from 'react';
import { Station } from '@/types';
import { mockStations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MapComponent from '@/components/map/MapComponent';
import StationList from '@/components/stations/StationList';
import StationDetails from '@/components/stations/StationDetails';
import StationFilters, { StationFilters as Filters } from '@/components/stations/StationFilters';
import { Search, SlidersHorizontal, Map } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  const [stations] = useState<Station[]>(mockStations);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: null,
    maxPrice: null,
    facilities: [],
    paymentMethods: []
  });

  // Filter stations based on search and filters
  const filteredStations = stations.filter(station => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      station.name.toLowerCase().includes(searchLower) || 
      station.address.toLowerCase().includes(searchLower) || 
      station.city.toLowerCase().includes(searchLower);
    
    // Status filter
    const matchesStatus = !filters.status || station.status === filters.status;
    
    // Facilities filter
    const matchesFacilities = filters.facilities.length === 0 || 
      filters.facilities.every(facility => station.facilities.includes(facility));
    
    // Payment methods filter
    const matchesPayment = filters.paymentMethods.length === 0 || 
      filters.paymentMethods.every(method => station.paymentMethods.includes(method));
    
    // Price filter
    const matchesPrice = !filters.maxPrice || station.pricePerKg <= filters.maxPrice;
    
    return matchesSearch && matchesStatus && matchesFacilities && matchesPayment && matchesPrice;
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSelectStation = (station: Station) => {
    setSelectedStation(station);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="container py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Find CNG Stations</h1>
            <p className="text-muted-foreground">Discover nearby stations and plan your journey</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={showFilters ? "default" : "outline"} 
              className={`${showFilters ? 'bg-cng-600 hover:bg-cng-700' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'map')}>
              <TabsList>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="relative mt-4 mb-3">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for stations, cities, or addresses..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Separator />
      
      {showFilters && (
        <div className="container py-4">
          <StationFilters onFilterChange={handleFilterChange} />
        </div>
      )}
      
      <div className="flex-1 overflow-hidden">
        <div className="container h-full py-4">
          {viewMode === 'map' && (
            <MapComponent 
              stations={filteredStations} 
              selectedStation={selectedStation} 
              onSelectStation={handleSelectStation}
            />
          )}
          
          {viewMode === 'list' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="pr-4">
                  <StationList 
                    stations={filteredStations}
                    selectedStation={selectedStation}
                    onSelectStation={handleSelectStation}
                  />
                </div>
              </ScrollArea>
              
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="pr-4">
                  {selectedStation ? (
                    <StationDetails station={selectedStation} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-10">
                      <Map className="h-12 w-12 mb-4 text-muted-foreground" />
                      <h2 className="text-xl font-semibold">Select a Station</h2>
                      <p className="text-muted-foreground max-w-xs mt-2">
                        Choose a CNG station from the list to view detailed information
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
