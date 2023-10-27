import { Component } from '@angular/core';
import { OrderService } from '../service/order.service/order.service';
import { KitchenOrderResponse, KitchenOrdersArrResponse, Order } from 'src/interfaces/interfaces';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
 orders: Order[];

  constructor(private orderService: OrderService) {
   this.orders = [];
   }

  ngOnInit(): void {
    this.loadOrderHistory();
    registerLocaleData(localeEs, 'Es', localeEsExtra);

  }

  loadOrderHistory(): void {
    this.orderService.orderHistory().subscribe({
     next: (response: KitchenOrdersArrResponse) => {
      this.orders = response.results;
      console.log(this.orders)
     },
     error: (error) => {
      console.log(error)
     }
  });
  }
}
