import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Star, Users, Calendar } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 dark:from-purple-950 dark:via-blue-950 dark:to-purple-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Book Amazing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 block">
                Performing Artists
              </span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Connect with talented singers, dancers, musicians, and entertainers 
              for your next event. From intimate gatherings to grand celebrations, 
              find the perfect artist to make your event unforgettable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-purple-900 dark:text-purple-400 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
                asChild
              >
                <Link href="/artists">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Artists
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-purple-900 dark:text-purple-400 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
                asChild
              >
                <Link href="/onboard">
                  Join as Artist
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-purple-300 mr-2" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-purple-200 text-sm">Verified Artists</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-purple-300 mr-2" />
                  <span className="text-2xl font-bold">2000+</span>
                </div>
                <p className="text-purple-200 text-sm">Events Booked</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-purple-300 mr-2" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-purple-200 text-sm">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
                alt="Performing artist on stage"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-background rounded-lg p-4 shadow-lg border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Verified</p>
                  <p className="text-xs text-muted-foreground">Background checked</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-background rounded-lg p-4 shadow-lg border">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">4.9/5</p>
                  <p className="text-xs text-muted-foreground">127 reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}