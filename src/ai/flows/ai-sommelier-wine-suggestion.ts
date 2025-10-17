'use server';
/**
 * @fileOverview An AI sommelier to suggest wines based on user preferences.
 *
 * - aiSommelierWineSuggestion - A function that handles the wine suggestion process.
 * - AISommelierWineSuggestionInput - The input type for the aiSommelierWineSuggestion function.
 * - AISommelierWineSuggestionOutput - The return type for the aiSommelierWineSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISommelierWineSuggestionInputSchema = z.object({
  meal: z.string().describe('The meal the user will be having.'),
  palatePreferences: z.string().describe('The user\'s palate preferences (e.g., dry, sweet, fruity).'),
  budget: z.string().describe('The user\'s budget for the wine (e.g., \'$20-30\', \'Under $50\').'),
});
export type AISommelierWineSuggestionInput = z.infer<typeof AISommelierWineSuggestionInputSchema>;

const AISommelierWineSuggestionOutputSchema = z.object({
  wineSuggestion: z.string().describe('The suggested wine for the user, including name, description, and why it pairs well with the meal and preferences.'),
});
export type AISommelierWineSuggestionOutput = z.infer<typeof AISommelierWineSuggestionOutputSchema>;

export async function aiSommelierWineSuggestion(input: AISommelierWineSuggestionInput): Promise<AISommelierWineSuggestionOutput> {
  return aiSommelierWineSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSommelierWineSuggestionPrompt',
  input: {schema: AISommelierWineSuggestionInputSchema},
  output: {schema: AISommelierWineSuggestionOutputSchema},
  prompt: `You are an expert sommelier. A user is looking for a wine suggestion.

  They will provide you with:
  - The meal they will be having.
  - Their palate preferences.
  - Their budget.

  Based on this information, suggest a wine, including the name of the wine, a brief description, and why it pairs well with their meal and preferences.

  Meal: {{{meal}}}
  Palate Preferences: {{{palatePreferences}}}
  Budget: {{{budget}}}
  `,
});

const aiSommelierWineSuggestionFlow = ai.defineFlow(
  {
    name: 'aiSommelierWineSuggestionFlow',
    inputSchema: AISommelierWineSuggestionInputSchema,
    outputSchema: AISommelierWineSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
