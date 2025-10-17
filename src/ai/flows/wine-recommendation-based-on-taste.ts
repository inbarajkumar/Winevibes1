'use server';

/**
 * @fileOverview Recommends wines based on user taste profile, ratings, and descriptions.
 *
 * - recommendWines - A function that recommends wines based on taste profile.
 * - WineRecommendationInput - The input type for the recommendWines function.
 * - WineRecommendationOutput - The return type for the recommendWines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WineRecommendationInputSchema = z.object({
  tasteProfile: z
    .string()
    .describe('A description of the user taste profile.'),
  wineRatings: z
    .string()
    .optional()
    .describe('The user previous wine ratings and reviews.'),
});
export type WineRecommendationInput = z.infer<typeof WineRecommendationInputSchema>;

const WineRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended wines based on the user taste profile.'),
});
export type WineRecommendationOutput = z.infer<typeof WineRecommendationOutputSchema>;

export async function recommendWines(input: WineRecommendationInput): Promise<WineRecommendationOutput> {
  return recommendWinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wineRecommendationPrompt',
  input: {schema: WineRecommendationInputSchema},
  output: {schema: WineRecommendationOutputSchema},
  prompt: `You are a wine expert. Recommend a list of wines based on the user taste profile, ratings and descriptions.

Taste Profile: {{{tasteProfile}}}

Wine Ratings: {{{wineRatings}}}

Provide the recommendations as a list of wine names.`,
});

const recommendWinesFlow = ai.defineFlow(
  {
    name: 'recommendWinesFlow',
    inputSchema: WineRecommendationInputSchema,
    outputSchema: WineRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
