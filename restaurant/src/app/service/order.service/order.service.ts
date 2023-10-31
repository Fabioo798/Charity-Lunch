import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize, switchMap } from 'rxjs';
import { KitchenAllDishResponse, KitchenOrderResponse, KitchenOrderStateResponse, KitchenOrdersArrResponse, Order } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
 ordersInProgress$: BehaviorSubject<Order[]>
  constructor(public http: HttpClient) {
   this.ordersInProgress$ = new BehaviorSubject<Order[]>([])

  }

  placeOrder(): Observable<KitchenOrderResponse> {
    const response = this.http.post<KitchenOrderResponse>('http://34.74.133.150:4800/order/create', {body: {dish: '', timesStamp: '', state: '' }});
    return response;
  }
  orderHistory(): Observable<KitchenOrdersArrResponse> {
    return this.http.get<KitchenOrdersArrResponse>('http://34.74.133.150:4800/order/history');
  }

  getAllDishes(): Observable<KitchenAllDishResponse> {
    return this.http.get<KitchenAllDishResponse>('http://34.74.133.150:4800/dish/dishes')
  }

  filterOrder(state: string): Observable<Order[]> {
    this.http.get<Order[]>(`http://34.74.133.150:4800/order/state=${state}`).subscribe({
      next: (orders: Order[]) => {
        this.ordersInProgress$.next(orders); // Emit the new orders
      },
      error: (error) => {
       console.log(error)
      }
     });

    return this.ordersInProgress$; // Return the BehaviorSubject as an Observable
  }
}
