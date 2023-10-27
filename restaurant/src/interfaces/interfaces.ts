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
  id: string;
  dish: Dish;
  timeStamp: Date;
  state: string;
}

export interface KitchenAllDishResponse {
 results: Dish[]
}

export interface KitchenOrdersArrResponse {
  results: [{
    dish: Dish;
    timeStamp: Date,
    state: string,
    id: string,
  }];
}
export interface KitchenOrderResponse {
  results: {
    dish: Dish;
    timeStamp: Date,
    state: string,
    id: string,
  };
}

export interface StoreIngredientResponse {
 results: Ingredient[]
}

export interface StoreOrder {
 id: string,
 quantitySold: Number
 name: string
 timeStamp: Date
}
export interface StoreOrderResponse {
 results: StoreOrder[]
}
export interface MenuItems {
  label: string;
  path: string;
}

export interface KitchenOrderStateResponse {
 results: Order[];
}

export enum OrderState {
  InProgress = "in-progress",
  Complete = "complete",
  NotEnoughIngredient = "not-enough-ingredient",
}

export interface UpdatedOrder {
  id: string;
  state: OrderState;
}
