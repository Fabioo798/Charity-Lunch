export interface Dish {
  id?: string;
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id?: number;
  name: string;
  quantity: number;
}

export interface Order {
  id: number;
  dishId: number;
  timestamp: Date;
}

export interface KitchenOrderResponse {
  results: {
    data: Dish;
  };
}

export interface MenuItems {
  label: string;
  path: string;
}
