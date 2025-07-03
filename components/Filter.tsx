'use client';

import { useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, RotateCcw } from 'lucide-react';

const FilterComponent = () => {
  const { filters, setFilters, resetFilters } = useFinanceStore();
  const [localFilters, setLocalFilters] = useState(filters);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const years = [2023, 2024, 2025];
  const departments = ['All', 'Sales', 'HR', 'Marketing', 'Operations'];

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleResetFilters = () => {
    resetFilters();
    setLocalFilters(filters);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Month</label>
            <Select 
              value={localFilters.dateRange.startMonth.toString()} 
              onValueChange={(value) => setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, startMonth: parseInt(value) }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Start Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Year</label>
            <Select 
              value={localFilters.dateRange.startYear.toString()} 
              onValueChange={(value) => setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, startYear: parseInt(value) }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Start Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Month</label>
            <Select 
              value={localFilters.dateRange.endMonth.toString()} 
              onValueChange={(value) => setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, endMonth: parseInt(value) }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="End Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Year</label>
            <Select 
              value={localFilters.dateRange.endYear.toString()} 
              onValueChange={(value) => setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, endYear: parseInt(value) }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="End Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Department</label>
            <Select 
              value={localFilters.department} 
              onValueChange={(value) => setLocalFilters({
                ...localFilters,
                department: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button onClick={handleResetFilters} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterComponent;