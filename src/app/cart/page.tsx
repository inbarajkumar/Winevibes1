'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, wine) => acc + wine.price, 0);

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold font-headline">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-xl text-muted-foreground font-body">Your cart is empty.</p>
            <Button asChild className="mt-4">
              <Link href="/wines">Explore Wines</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4">
              {cart.map((wine) => (
                <Card key={wine.id} className="flex items-center p-4">
                  <Image
                    src={wine.imageUrl}
                    alt={wine.name}
                    width={80}
                    height={120}
                    className="rounded-md object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h2 className="font-semibold font-headline">{wine.name}</h2>
                    <p className="text-sm text-muted-foreground font-body">{wine.region}</p>
                    <p className="font-bold text-primary mt-1">${wine.price.toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <X className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between font-body">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold font-headline text-lg">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <Button className="w-full">Proceed to Checkout</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
