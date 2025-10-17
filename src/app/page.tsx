import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { wines } from '@/lib/wine-data';
import { WineCard } from '@/components/WineCard';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'wine-tasting-hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4 md:px-6 space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter text-white">
            Discover Your Next Favorite Wine
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-neutral-200 font-body">
            Let our AI Sommelier guide you to the perfect bottle, tailored to your unique taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/sommelier">Ask the AI Sommelier <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black" asChild>
              <Link href="/wines">Explore Our Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">Curated Selection</h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl font-body">
              Handpicked wines that our community loves. Explore top-rated bottles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {wines.slice(0, 4).map((wine) => (
              <WineCard key={wine.id} wine={wine} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="link" asChild>
              <Link href="/wines">View All Wines <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-card">
         <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">Powered by AI</h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl font-body">
                Find the perfect wine with our intelligent recommendation tools.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link href="/sommelier" className="block p-8 rounded-lg border bg-background hover:shadow-lg transition-shadow">
                <h3 className="font-headline text-2xl font-bold mb-2">AI Sommelier</h3>
                <p className="text-muted-foreground mb-4 font-body">Get expert wine pairings for any meal, occasion, and budget. Your personal wine expert is just a click away.</p>
                <span className="font-semibold text-primary flex items-center">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
              <Link href="/recommendations" className="block p-8 rounded-lg border bg-background hover:shadow-lg transition-shadow">
                <h3 className="font-headline text-2xl font-bold mb-2">Personalized Recommendations</h3>
                <p className="text-muted-foreground mb-4 font-body">Tell us what you like, and we'll build a personalized list of wines you're sure to love.</p>
                 <span className="font-semibold text-primary flex items-center">
                  Find Your Match <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
