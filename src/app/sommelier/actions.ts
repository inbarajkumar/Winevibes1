'use server';

import { aiSommelierWineSuggestion, AISommelierWineSuggestionInput } from '@/ai/flows/ai-sommelier-wine-suggestion';

export async function getWineSuggestion(input: AISommelierWineSuggestionInput) {
  try {
    const result = await aiSommelierWineSuggestion(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get wine suggestion.' };
  }
}
