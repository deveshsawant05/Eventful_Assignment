import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, CheckCircle, MessageSquare } from 'lucide-react';
import { QuoteRequestDialog } from './QuoteRequestDialog';

export function ArtistCard({ artist, viewMode }) {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image */}
            <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
              {artist.verified && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {artist.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{artist.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    ${artist.priceRange.min} - ${artist.priceRange.max}
                  </div>
                  <div className="text-sm text-muted-foreground">per event</div>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {artist.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {artist.bio}
              </p>

              {/* Stats & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{artist.rating}</span>
                    <span className="ml-1">({artist.totalBookings} bookings)</span>
                  </div>
                  <div className="flex items-center">
                    <span>{artist.languages.join(', ')}</span>
                  </div>
                </div>
                <QuoteRequestDialog artist={artist}>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask for Quote
                  </Button>
                </QuoteRequestDialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {artist.verified && (
          <div className="absolute top-3 right-3">
            <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <div className="flex flex-wrap gap-1">
            {artist.category.slice(0, 2).map((cat) => (
              <Badge key={cat} className="bg-black/70 text-white text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {artist.name}
          </h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{artist.location}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {artist.bio}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-medium">{artist.rating}</span>
            <span className="text-muted-foreground ml-1">({artist.totalBookings})</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">
              ${artist.priceRange.min}+
            </div>
            <div className="text-xs text-muted-foreground">per event</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-muted-foreground">
            Languages: {artist.languages.join(', ')}
          </div>
        </div>

        <QuoteRequestDialog artist={artist}>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Ask for Quote
          </Button>
        </QuoteRequestDialog>
      </CardContent>
    </Card>
  );
}