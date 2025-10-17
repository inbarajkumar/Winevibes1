'use client';

import React from 'react';
import Image from 'next/image';
import { Star, MessageCircle, ShoppingCart } from 'lucide-react';
import { wines, type Review as ReviewType } from '@/lib/wine-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

function Review({ review }: { review: ReviewType }) {
    return (
        <div className="flex gap-4">
            <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${review.author}`} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={cn('w-4 h-4', i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/30')}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                <p className="mt-2 font-body">{review.comment}</p>
            </div>
        </div>
    );
}

export default function WineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const wine = wines.find((w) => w.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!wine) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(wine);
    toast({
      title: "Added to Cart",
      description: `${wine.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
        <div className="rounded-lg overflow-hidden border shadow-lg">
          <Image
            src={wine.imageUrl}
            alt={wine.name}
            width={600}
            height={800}
            className="w-full h-full object-cover"
            data-ai-hint={wine.imageHint}
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant={wine.type === 'Red' ? 'default' : wine.type === 'White' ? 'secondary' : 'outline'}>
              {wine.type} Wine
            </Badge>
            <h1 className="mt-2 text-4xl font-bold font-headline tracking-tight sm:text-5xl">{wine.name}</h1>
            <h2 className="mt-2 text-xl text-muted-foreground font-body">{wine.vintage} &middot; {wine.region}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="text-lg font-bold">{wine.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({wine.reviews.length} reviews)</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-3xl font-bold font-headline text-primary">
              ${wine.price.toFixed(2)}
            </div>
          </div>
          
          <p className="text-lg font-body">{wine.description}</p>
          
          <Button size="lg" className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <MessageCircle className="w-6 h-6" />
                Community Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {wine.reviews.length > 0 ? (
                wine.reviews.map((review, index) => (
                  <div key={review.id}>
                    <Review review={review} />
                    {index < wine.reviews.length - 1 && <Separator className="my-6" />}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center font-body">No reviews yet. Be the first to write one!</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="font-headline">Write a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea placeholder={`Share your thoughts on the ${wine.name}...`} className="font-body"/>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">Your Rating:</p>
                        <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <button key={i} aria-label={`Rate ${i+1} stars`}><Star className="w-5 h-5 text-muted-foreground/30 hover:text-accent transition-colors" /></button>
                        ))}
                        </div>
                    </div>
                    <Button>Submit Review</Button>
                </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
