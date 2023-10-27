import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreIngredientResponse, StoreOrder, StoreOrderResponse } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor( public http: HttpClient) { }

  getIngredients(): Observable<StoreIngredientResponse>{
   const response = this.http.get<StoreIngredientResponse>('http://localhost:4900/ingredient/ingredients')
   return response
  }

  getOrderHistory(): Observable<StoreOrderResponse> {
   const response = this.http.get<StoreOrderResponse>('http://localhost:4900/shoplist/shoplists');
   return response;
  }
}
