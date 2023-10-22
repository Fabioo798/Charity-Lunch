import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KitchenOrderResponse } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(public http: HttpClient) {}

  placeOrder(): Observable<KitchenOrderResponse> {
    return this.http.get<KitchenOrderResponse>('/order');
  }
  orderHistory(): Observable<KitchenOrderResponse> {
    return this.http.get<KitchenOrderResponse>('/history');
  }
}
