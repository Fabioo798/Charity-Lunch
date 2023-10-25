import { Dish } from 'src/interfaces/interfaces';

export const dishes: Dish[] = [
  {
    name: 'Tomato Salad',
    ingredients: [
      { name: 'Tomato', quantity: 2 },
      { name: 'Onion', quantity: 1 },
      { name: 'Lemon', quantity: 1 },
      { name: 'Lettuce', quantity: 2 },
    ],
  },
  {
    name: 'Lemon Chicken',
    ingredients: [
      { name: 'Chicken', quantity: 1 },
      { name: 'Lemon', quantity: 1 },
      { name: 'Cheese', quantity: 3 },
    ],
  },
  {
    name: 'Potato Soup',
    ingredients: [
      { name: 'Potato', quantity: 4 },
      { name: 'Onion', quantity: 1 },
      { name: 'Cheese', quantity: 2 },
    ],
  },
  {
    name: 'Meatballs',
    ingredients: [
      { name: 'Meat', quantity: 0.5 },
      { name: 'Tomato', quantity: 1 },
      { name: 'Onion', quantity: 0.5 },
    ],
  },
  {
    name: 'Chicken Sandwich',
    ingredients: [
      { name: 'Chicken', quantity: 1 },
      { name: 'Tomato', quantity: 2 },
      { name: 'Lettuce', quantity: 1 },
      { name: 'Cheese', quantity: 2 },
    ],
  },
  {
    name: 'Onion Rings',
    ingredients: [{ name: 'Onion', quantity: 2 }],
  },
];
