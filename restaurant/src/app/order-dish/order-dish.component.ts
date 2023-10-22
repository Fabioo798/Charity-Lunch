import { Component } from '@angular/core';
import { Dish } from 'src/interfaces/interfaces';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.component.html',
  styleUrls: ['./order-dish.component.scss'],
})
export class OrderDishComponent {
  dish: Dish | undefined;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(public srv: OrderService) {}

  orderDish() {
    this.isLoading = true;
    this.srv.placeOrder().subscribe({
      next: (resp) => {
        this.isLoading = false;
        this.dish = resp.results.data;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
