import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Artistly - Book Performing Artists',
  description: 'Discover and book talented performing artists for your events. From singers to dancers, find the perfect artist for any occasion.',
  keywords: 'performing artists, booking platform, singers, dancers, musicians, entertainment',
  authors: [{ name: 'Artistly Team' }],
  openGraph: {
    title: 'Artistly - Book Performing Artists',
    description: 'Discover and book talented performing artists for your events.',
    url: 'https://artistly.com',
    siteName: 'Artistly',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artistly - Book Performing Artists',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artistly - Book Performing Artists',
    description: 'Discover and book talented performing artists for your events.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}