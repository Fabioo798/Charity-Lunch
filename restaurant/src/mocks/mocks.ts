import { Observable } from "rxjs";
import { KitchenOrderResponse } from "src/interfaces/interfaces";

export const mockOrderService = {
 placeOrder: () => {
  return new Observable<KitchenOrderResponse>()
 },
 orderHistory: () => {
  return new Observable<KitchenOrderResponse>()
 },
}
