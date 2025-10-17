import { WineCard } from '@/components/WineCard';
import { wines } from '@/lib/wine-data';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function WinesPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="space-y-4 mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Explore Our Collection</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
          Browse through our curated list of exceptional wines from around the world.
        </p>
      </div>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search wines, regions, or varietals..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {wines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
}
