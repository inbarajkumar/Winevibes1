'use server';

import { recommendWines, WineRecommendationInput } from '@/ai/flows/wine-recommendation-based-on-taste';

export async function getWineRecommendations(input: WineRecommendationInput) {
  try {
    const result = await recommendWines(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get wine recommendations.' };
  }
}
