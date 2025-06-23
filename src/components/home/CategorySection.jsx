import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Music, Zap, Smile } from 'lucide-react';

const categories = [
  {
    id: 'singers',
    name: 'Singers',
    description: 'Professional vocalists for any genre and occasion',
    icon: Mic,
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg',
    count: '120+ artists',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'musicians',
    name: 'Musicians',
    description: 'Instrumentalists and bands for live performances',
    icon: Music,
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
    count: '85+ artists',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'djs',
    name: 'DJs',
    description: 'Professional DJs for parties and events',
    icon: Zap,
    image: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg',
    count: '90+ artists',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'entertainers',
    name: 'Entertainers',
    description: 'Comedians, magicians, and variety performers',
    icon: Smile,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    count: '75+ artists',
    gradient: 'from-orange-500 to-red-500',
  },
];

export function CategorySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Find the Perfect Artist
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of talented performers across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <IconComponent className="w-12 h-12 mx-auto mb-2" />
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-3">{category.description}</p>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4">{category.count}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    asChild
                  >
                    <Link href={`/artists?category=${category.id}`}>
                      Browse {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-black"
            asChild
          >
            <Link href="/artists">
              View All Categories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}