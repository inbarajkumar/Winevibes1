import Image from 'next/image';
import { Grape, Sparkles, Target } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-vineyard');

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Grape className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight font-headline sm:text-6xl">
            About WineVibes
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground font-body">
            We believe that discovering the perfect wine should be an experience, not a challenge. WineVibes was born from a passion for wine and a fascination with technology's potential to personalize discovery.
          </p>
        </div>

        {aboutImage && (
          <div className="my-12 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={1200}
              height={800}
              className="w-full"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold font-headline">Our Mission</h2>
            <p className="text-muted-foreground font-body">
              Our mission is simple: to connect wine lovers with bottles they'll adore. We demystify the world of wine, making it accessible and enjoyable for everyone, from the curious novice to the seasoned connoisseur. By leveraging cutting-edge AI, we provide personalized recommendations that honor your unique palate.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold font-headline">Our Technology</h2>
            <p className="text-muted-foreground font-body">
              At the heart of WineVibes is our AI Sommelier. This intelligent tool analyzes your preferences, meal pairings, and even your budget to offer expert-level suggestions. It's like having a personal wine expert in your pocket, ready to guide you to the perfect selection for any occasion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
