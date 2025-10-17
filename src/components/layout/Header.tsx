'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Grape, Menu, ShoppingCart } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/wines', label: 'Explore Wines' },
  { href: '/sommelier', label: 'AI Sommelier' },
  { href: '/recommendations', label: 'Recommendations' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Grape className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">WineVibes</span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80 font-body',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end space-x-2">
           <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-2 h-4 w-4 justify-center rounded-full p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </div>
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-8">
                  <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                    <Grape className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">WineVibes</span>
                  </Link>
                </div>
                <div className="flex flex-col space-y-4 text-center">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-foreground/80 font-body',
                        pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto flex flex-col space-y-2">
                  <Button variant="outline" asChild>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
