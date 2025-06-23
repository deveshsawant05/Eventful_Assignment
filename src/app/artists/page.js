import { ArtistListingPage } from '@/components/artists/ArtistListingPage';

export const metadata = {
  title: 'Browse Artists - Artistly',
  description: 'Discover talented performing artists in your area. Filter by category, location, and price range to find the perfect artist for your event.',
};

export default function ArtistsPage() {
  return <ArtistListingPage />;
}