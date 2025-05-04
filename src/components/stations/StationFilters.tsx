
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Facility, PaymentMethod, StationStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface StationFiltersProps {
  onFilterChange: (filters: StationFilters) => void;
}

export interface StationFilters {
  status: StationStatus | null;
  maxPrice: number | null;
  facilities: Facility[];
  paymentMethods: PaymentMethod[];
}

const StationFilters = ({ onFilterChange }: StationFiltersProps) => {
  const [filters, setFilters] = useState<StationFilters>({
    status: null,
    maxPrice: null,
    facilities: [],
    paymentMethods: []
  });

  const statusOptions: { value: StationStatus | null, label: string, color: string }[] = [
    { value: null, label: 'All Stations', color: 'bg-gray-200 text-gray-800' },
    { value: 'available', label: 'Available', color: 'bg-green-500 text-white' },
    { value: 'busy', label: 'Busy', color: 'bg-orange-500 text-white' },
    { value: 'closed', label: 'Closed', color: 'bg-red-500 text-white' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-purple-500 text-white' }
  ];

  const facilityOptions: { value: Facility, label: string }[] = [
    { value: 'restrooms', label: 'Restrooms' },
    { value: 'convenience_store', label: 'Convenience Store' },
    { value: 'food', label: 'Food' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'car_wash', label: 'Car Wash' },
    { value: 'atm', label: 'ATM' },
    { value: 'waiting_area', label: 'Waiting Area' },
    { value: 'air_filling', label: 'Air Filling' }
  ];

  const paymentOptions: { value: PaymentMethod, label: string }[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'wallet', label: 'Wallet' },
    { value: 'prepaid_card', label: 'Prepaid Card' }
  ];

  const handleStatusChange = (status: StationStatus | null) => {
    const newFilters = { ...filters, status };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleFacility = (facility: Facility) => {
    let newFacilities: Facility[];
    if (filters.facilities.includes(facility)) {
      newFacilities = filters.facilities.filter(f => f !== facility);
    } else {
      newFacilities = [...filters.facilities, facility];
    }
    const newFilters = { ...filters, facilities: newFacilities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const togglePaymentMethod = (method: PaymentMethod) => {
    let newPaymentMethods: PaymentMethod[];
    if (filters.paymentMethods.includes(method)) {
      newPaymentMethods = filters.paymentMethods.filter(m => m !== method);
    } else {
      newPaymentMethods = [...filters.paymentMethods, method];
    }
    const newFilters = { ...filters, paymentMethods: newPaymentMethods };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: null,
      maxPrice: null,
      facilities: [],
      paymentMethods: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  // Calculate active filter count
  const activeFilterCount = 
    (filters.status ? 1 : 0) + 
    filters.facilities.length + 
    filters.paymentMethods.length +
    (filters.maxPrice ? 1 : 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center gap-1 h-7"
            onClick={clearAllFilters}
          >
            Clear all <span className="bg-muted rounded-full px-1.5 py-0.5 text-xs">{activeFilterCount}</span>
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Status filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Status</h4>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(option => (
              <Button
                key={option.label}
                variant="ghost"
                size="sm"
                className={`text-xs px-3 py-1 h-7 ${filters.status === option.value ? option.color : 'bg-gray-100'}`}
                onClick={() => handleStatusChange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Facilities filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Facilities</h4>
          <div className="flex flex-wrap gap-2">
            {facilityOptions.map(option => {
              const isActive = filters.facilities.includes(option.value);
              return (
                <Badge
                  key={option.value}
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer ${isActive ? 'bg-cng-500' : ''}`}
                  onClick={() => toggleFacility(option.value)}
                >
                  {option.label}
                  {isActive && <X className="ml-1 h-3 w-3" />}
                </Badge>
              );
            })}
          </div>
        </div>
        
        {/* Payment methods filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Payment Methods</h4>
          <div className="flex flex-wrap gap-2">
            {paymentOptions.map(option => {
              const isActive = filters.paymentMethods.includes(option.value);
              return (
                <Badge
                  key={option.value}
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer ${isActive ? 'bg-energy-500 hover:bg-energy-600' : ''}`}
                  onClick={() => togglePaymentMethod(option.value)}
                >
                  {option.label}
                  {isActive && <X className="ml-1 h-3 w-3" />}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationFilters;
