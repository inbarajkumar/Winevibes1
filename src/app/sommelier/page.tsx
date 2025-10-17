'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Wine, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AISommelierWineSuggestionOutput } from '@/ai/flows/ai-sommelier-wine-suggestion';
import { getWineSuggestion } from './actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  meal: z.string().min(3, { message: 'Please describe the meal.' }),
  palatePreferences: z.string().min(3, { message: 'Describe your taste preferences.' }),
  budget: z.string().min(2, { message: 'Please enter your budget.' }),
});

export default function SommelierPage() {
  const [suggestion, setSuggestion] = useState<AISommelierWineSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sommelierImage = PlaceHolderImages.find(img => img.id === 'sommelier-serving');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meal: '',
      palatePreferences: '',
      budget: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const result = await getWineSuggestion(values);

    if (result.success && result.data) {
      setSuggestion(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div className="space-y-4">
          <Wine className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">AI Sommelier</h1>
          <p className="text-lg text-muted-foreground font-body">
            Let our AI-powered sommelier help you find the perfect wine for any occasion. Just provide details about your meal, taste, and budget, and we'll handle the rest.
          </p>
          <div className="w-full pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Find Your Perfect Pairing</CardTitle>
                <CardDescription>Fill out the form below to get a wine suggestion.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="meal" render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's the meal?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Grilled steak with roasted vegetables" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="palatePreferences" render={({ field }) => (
                      <FormItem>
                        <FormLabel>What do you like?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., I prefer dry, full-bodied reds" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="budget" render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's your budget?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Under $30, $50-70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Get Suggestion'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[500px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96 w-full bg-card rounded-lg border-2 border-dashed">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Our sommelier is thinking...</p>
            </div>
          ) : suggestion ? (
            <Card className="w-full bg-primary text-primary-foreground shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    <CardTitle className="font-headline text-2xl">Your AI Sommelier Suggests</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none text-primary-foreground font-body">
                <p>{suggestion.wineSuggestion}</p>
              </CardContent>
            </Card>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-96 w-full bg-card rounded-lg border-2 border-dashed border-destructive">
                <p className="text-destructive">{error}</p>
            </div>
          ) : sommelierImage && (
            <div className="w-full h-full aspect-[3/4] relative rounded-lg overflow-hidden shadow-xl">
                 <Image src={sommelierImage.imageUrl} alt={sommelierImage.description} fill className="object-cover" data-ai-hint={sommelierImage.imageHint} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
