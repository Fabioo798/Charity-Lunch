import { Component, OnInit } from '@angular/core';
import { StoreService } from '../service/store.service/store.service';
import { Ingredient, StoreIngredientResponse, StoreOrder, StoreOrderResponse } from 'src/interfaces/interfaces';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  ingredients: Ingredient[] = [];
  orders: StoreOrder[] = [];
  isErrorOrder: boolean = false;
  isErrorIngredients: boolean = false;

  constructor(private storeService: StoreService) {
   }

  ngOnInit(): void {
    this.loadIngredients();
    this.loadOrderHistory();
    registerLocaleData(localeEs, 'Es', localeEsExtra);
  }

  loadIngredients(): void {
    this.storeService.getIngredients().subscribe({
     next: (response: StoreIngredientResponse) => {
      this.ingredients = response.results;
    },
     error: () => {
      this.isErrorIngredients = true;
     }
   });
  }

  loadOrderHistory(): void {
    this.storeService.getOrderHistory().subscribe(
     {
      next: (response: StoreOrderResponse) => {
      this.orders = response.results;
    },
     error: () => {
      this.isErrorOrder = true;
     }
   });
  }
}
