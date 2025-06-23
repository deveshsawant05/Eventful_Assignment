'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Grid, List, Filter, X } from 'lucide-react';
import { categories } from '@/data/artists';


export function ArtistFilters({ 
  filters, 
  onFiltersChange, 
  viewMode, 
  onViewModeChange 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category, checked) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleLocationChange = (location) => {
    onFiltersChange({
      ...filters,
      location,
    });
  };

  const handlePriceRangeChange = (range) => {
    onFiltersChange({
      ...filters,
      priceRange: [range[0], range[1]],
    });
  };

  const handleSortChange = (sortBy) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      location: '',
      priceRange: [0, 3000],
      sortBy: 'name',
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.location || 
    filters.priceRange[0] > 0 || filters.priceRange[1] < 3000;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">
                {filters.categories.length + (filters.location ? 1 : 0)}
              </span>
            )}
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={viewMode === 'grid' ? 'bg-muted' : ''}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={viewMode === 'list' ? 'bg-muted' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop View Mode Toggle */}
      <div className="hidden lg:flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className={viewMode === 'grid' ? 'bg-muted' : ''}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('list')}
            className={viewMode === 'list' ? 'bg-muted' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Sort */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sort By</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="bookings">Most Booked</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, !!checked)
                    }
                  />
                  <Label
                    htmlFor={category}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter city or state..."
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceRangeChange}
                max={3000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}+</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </>
  );
}