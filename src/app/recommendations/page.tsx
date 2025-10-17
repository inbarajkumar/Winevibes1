'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { List, Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { WineRecommendationOutput } from '@/ai/flows/wine-recommendation-based-on-taste';
import { getWineRecommendations } from './actions';

const formSchema = z.object({
  tasteProfile: z.string().min(10, { message: 'Please describe your taste in at least 10 characters.' }),
  wineRatings: z.string().optional(),
});

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<WineRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasteProfile: '',
      wineRatings: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const result = await getWineRecommendations(values);

    if (result.success && result.data) {
      setRecommendations(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <List className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Personalized Recommendations</h1>
          <p className="text-lg text-muted-foreground font-body">
            Describe your preferences and any wines you've liked or disliked, and our AI will generate a custom list just for you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Taste Profile</CardTitle>
            <CardDescription>The more detail you provide, the better the recommendations!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="tasteProfile" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your taste</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., I love earthy, full-bodied red wines like Cabernet Sauvignon. I'm not a fan of anything too sweet or oakey." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="wineRatings" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous wine ratings (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Loved: Chateau Montelena 2018. Disliked: A very buttery Chardonnay." rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Generate My Wine List'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-8 flex flex-col items-center justify-center h-64 w-full bg-card rounded-lg border-2 border-dashed">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Curating your wine list...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 flex flex-col items-center justify-center h-48 w-full bg-card rounded-lg border-2 border-dashed border-destructive">
              <p className="text-destructive">{error}</p>
          </div>
        )}

        {recommendations && (
          <Card className="mt-8 bg-primary text-primary-foreground">
            <CardHeader>
              <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-accent" />
                  <CardTitle className="font-headline text-2xl">Recommended For You</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside font-body">
                {recommendations.recommendations.map((wine, index) => (
                  <li key={index} className="text-lg">{wine}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
