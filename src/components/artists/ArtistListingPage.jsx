'use client';

import { useState, useMemo } from 'react';
import { ArtistCard } from './ArtistCard';
import { ArtistFilters } from './ArtistFilters';
import { artists } from '@/data/artists';

export function ArtistListingPage() {
  const [filters, setFilters] = useState({
    categories: [],
    location: '',
    priceRange: [0, 3000],
    sortBy: 'name',
  });

  const [viewMode, setViewMode] = useState('grid');

  const filteredArtists = useMemo(() => {
    let filtered = artists.filter((artist) => {
      // Category filter
      if (filters.categories.length > 0) {
        const hasMatchingCategory = artist.category.some(cat => 
          filters.categories.includes(cat)
        );
        if (!hasMatchingCategory) return false;
      }

      // Location filter
      if (filters.location) {
        if (!artist.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // Price range filter
      if (artist.priceRange.min > filters.priceRange[1] || 
          artist.priceRange.max < filters.priceRange[0]) {
        return false;
      }

      return true;
    });

    // Sort
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.priceRange.min - b.priceRange.min);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceRange.min - a.priceRange.min);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'bookings':
        filtered.sort((a, b) => b.totalBookings - a.totalBookings);
        break;
    }

    return filtered;
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Browse Artists
          </h1>
          <p className="text-muted-foreground">
            Discover talented performers for your next event
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ArtistFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredArtists.length} of {artists.length} artists
              </p>
            </div>

            {/* Artist Grid/List */}
            {filteredArtists.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No artists found matching your criteria.</p>
                <p className="text-muted-foreground/70 mt-2">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredArtists.map((artist) => (
                  <ArtistCard 
                    key={artist.id} 
                    artist={artist} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}