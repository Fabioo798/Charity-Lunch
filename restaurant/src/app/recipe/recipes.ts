import { Dish } from 'src/interfaces/interfaces';

export const dishes: Dish[] = [
  {
    name: 'Tomato Salad',
    ingredients: [
      { name: 'Tomato', quantity: 1 },
      { name: 'Onion', quantity: 1 },
      { name: 'Lemon', quantity: 1 },
      { name: 'Lettuce', quantity: 1 },
    ],
  },
  {
    name: 'Lemon Chicken',
    ingredients: [
      { name: 'Chicken', quantity: 1 },
      { name: 'Lemon', quantity: 1 },
      { name: 'Cheese', quantity: 1 },
    ],
  },
  {
    name: 'Potato Soup',
    ingredients: [
      { name: 'Potato', quantity: 1 },
      { name: 'Onion', quantity: 1 },
      { name: 'Cheese', quantity: 1 },
    ],
  },
  {
    name: 'Meatballs',
    ingredients: [
      { name: 'Meat', quantity: 1 },
      { name: 'Tomato', quantity: 1 },
      { name: 'Onion', quantity: 1 },
    ],
  },
  {
    name: 'Chicken Sandwich',
    ingredients: [
      { name: 'Chicken', quantity: 1 },
      { name: 'Tomato', quantity: 1 },
      { name: 'Lettuce', quantity: 1 },
      { name: 'Cheese', quantity: 1 },
    ],
  },
  {
    name: 'Onion Rings',
    ingredients: [{ name: 'Onion', quantity: 1 }, { name: 'Ketchup', quantity: 1}],
  },
];
