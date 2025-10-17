import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

import type { Wine } from '@/lib/wine-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WineCardProps {
  wine: Wine;
}

export function WineCard({ wine }: WineCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <Link href={`/wines/${wine.id}`} className="block overflow-hidden">
        <Image
          src={wine.imageUrl}
          alt={wine.name}
          width={400}
          height={600}
          data-ai-hint={wine.imageHint}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="font-headline text-2xl">
            <Link href={`/wines/${wine.id}`} className="hover:text-primary transition-colors">{wine.name}</Link>
          </CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="font-semibold">{wine.rating.toFixed(1)}</span>
          </div>
        </div>
        <CardDescription className="font-body">{wine.vintage} &middot; {wine.region}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm font-body line-clamp-3">{wine.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4">
        <Badge variant={wine.type === 'Red' ? 'default' : wine.type === 'White' ? 'secondary' : 'outline'}>
            {wine.type}
        </Badge>
        <div className="text-2xl font-bold font-headline text-primary">
          ${wine.price.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}
