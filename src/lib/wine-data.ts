import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Wine = {
  id: string;
  name: string;
  type: 'Red' | 'White' | 'Rosé';
  vintage: number;
  region: string;
  description: string;
  price: number;
  rating: number;
  reviews: Review[];
  imageUrl: string;
  imageHint: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

const redWineImage = PlaceHolderImages.find(img => img.id === 'red-wine-bottle')!;
const whiteWineImage = PlaceHolderImages.find(img => img.id === 'white-wine-bottle')!;
const roseWineImage = PlaceHolderImages.find(img => img.id === 'rose-wine-bottle')!;


export const wines: Wine[] = [
  {
    id: '1',
    name: 'Crimson Reserve',
    type: 'Red',
    vintage: 2020,
    region: 'Napa Valley, USA',
    description: 'A bold Cabernet Sauvignon with notes of dark cherry, plum, and a hint of vanilla. Full-bodied and elegant, this wine pairs beautifully with red meats and hearty pasta dishes. A true classic for any occasion.',
    price: 65.00,
    rating: 4.8,
    imageUrl: redWineImage.imageUrl,
    imageHint: redWineImage.imageHint,
    reviews: [
      { id: 'r1', author: 'Alice', rating: 5, comment: 'Absolutely stunning. Rich and complex.', date: '2023-10-20' },
      { id: 'r2', author: 'Bob', rating: 4.5, comment: 'Great value for a Napa Cab. Will buy again.', date: '2023-09-15' },
    ],
  },
  {
    id: '2',
    name: 'Golden Slope',
    type: 'White',
    vintage: 2022,
    region: 'Marlborough, New Zealand',
    description: 'A crisp Sauvignon Blanc with vibrant tropical fruit flavors, zesty acidity, and a clean finish. Perfect for warm days, seafood, and light salads.',
    price: 25.00,
    rating: 4.6,
    imageUrl: whiteWineImage.imageUrl,
    imageHint: whiteWineImage.imageHint,
    reviews: [
      { id: 'r3', author: 'Charlie', rating: 5, comment: 'The perfect summer wine! So refreshing.', date: '2023-07-01' },
    ],
  },
  {
    id: '3',
    name: 'Sunset Blush',
    type: 'Rosé',
    vintage: 2022,
    region: 'Provence, France',
    description: 'A delicate and dry Rosé with flavors of strawberry, watermelon, and a touch of minerality. Refreshing and light, it is an ideal companion for appetizers, grilled fish, or simply sipping on the patio.',
    price: 30.00,
    rating: 4.7,
    imageUrl: roseWineImage.imageUrl,
    imageHint: roseWineImage.imageHint,
    reviews: [
      { id: 'r4', author: 'Diana', rating: 4.5, comment: 'Elegant and easy to drink. Loved it.', date: '2023-08-11' },
      { id: 'r5', author: 'Eve', rating: 5, comment: 'My go-to Rosé. Consistently excellent.', date: '2023-08-05' },
    ],
  },
  {
    id: '4',
    name: 'Midnight Velvet',
    type: 'Red',
    vintage: 2019,
    region: 'Bordeaux, France',
    description: 'A classic Bordeaux blend with layers of blackberry, cassis, and cedar. Well-structured tannins and a long finish make this a superb choice for cellaring or enjoying with a decadent meal.',
    price: 80.00,
    rating: 4.9,
    imageUrl: redWineImage.imageUrl,
    imageHint: redWineImage.imageHint,
    reviews: [
        { id: 'r6', author: 'Frank', rating: 5, comment: 'A truly exceptional wine. Worth every penny.', date: '2023-11-01' },
    ],
  },
];
