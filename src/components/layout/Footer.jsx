import Link from 'next/link';
import { Music, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                <Music className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Artistly</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Connect with talented performing artists for your next event. 
              From intimate gatherings to large celebrations, find the perfect 
              entertainment that matches your vision.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
              For Event Organizers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/artists" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Artist Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
              For Artists
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/onboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Join as Artist
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Artist Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Artistly. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}