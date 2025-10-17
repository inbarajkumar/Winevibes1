import { Grape } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Grape className="h-5 w-5 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built for discovering great wines.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WineVibes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
