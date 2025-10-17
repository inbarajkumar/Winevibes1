import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';
import DevMenuHider from '@/components/DevMenuHider';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'WineVibes - Discover Your Next Favorite Wine',
  description: 'An AI-powered sommelier and wine recommendation app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        {process.env.NODE_ENV === 'development' ? (
          <style>{`
            /* Hide Next.js dev overlay button */
            [data-nextjs-dev-overlay-root] { display: none !important; }
            #nextjs-preference-turbo { display: none !important; }
            #nextjs-dev-overlay { display: none !important; }
            /* common selector for the floating dev menu button */
            button[aria-label='Open Dev Menu'],
            div:has(> button[aria-label='Open Dev Menu']) { display: none !important; }
          `}</style>
        ) : null}
      </head>
      <body className={cn('min-h-screen font-body antialiased')}>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          {process.env.NODE_ENV === 'development' ? <DevMenuHider /> : null}
        </CartProvider>
      </body>
    </html>
  );
}
