import { Observable } from "rxjs";
import { KitchenAllDishResponse, KitchenOrderResponse, Order, StoreIngredientResponse, StoreOrderResponse } from "src/interfaces/interfaces";

export const mockOrderService = {
 placeOrder: () => {
  return new Observable<KitchenOrderResponse>()
 },
 orderHistory: () => {
  return new Observable<KitchenOrderResponse>()
 },
 getAllDishes: () => {
  return new Observable<KitchenAllDishResponse>()
 },
 filterOrder: () => {
  return new Observable<Order[]>
 }
}
 export const mockIngredientService = {

  getIngredients: () => {
   return new Observable<StoreIngredientResponse>()
  },

  getOrderHistory: () => {
   return new Observable<StoreOrderResponse>()
  }
 }

