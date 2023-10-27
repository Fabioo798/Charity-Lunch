import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Dish, KitchenOrderResponse, KitchenOrderStateResponse, Order, UpdatedOrder } from 'src/interfaces/interfaces';
import { OrderService } from '../service/order.service/order.service';
import { WebSocketService } from '../service/websocket.service/web-socket.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { Observable, catchError, of, startWith, take } from 'rxjs';

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.component.html',
  styleUrls: ['./order-dish.component.scss'],
})
export class OrderDishComponent implements OnInit {
  order: Order | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  ordersInProgress$: Observable<Order[]>; // Observable to represent the list of orders

  constructor(public orderService: OrderService, private socketService: WebSocketService, private cdr: ChangeDetectorRef) {
   this.ordersInProgress$ = this.orderService.filterOrder('in-progress')
  }

  ngOnInit(): void {
   console.log(this.ordersInProgress$)
    registerLocaleData(localeEs, 'Es', localeEsExtra);
    this.connectToWebSocket();
  }

  orderDish() {
    this.isLoading = true;

    this.orderService.placeOrder().subscribe({
      next: (resp: KitchenOrderResponse) => {
        this.isLoading = false;
        this.order = resp.results;
        this.orderService.filterOrder('in-progress').subscribe((orders: Order[]) => {
        this.ordersInProgress$ = of(orders);
      });
      },
      error: (error: string) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }

  connectToWebSocket(): void {
  const event = 'orderStateChanged';

  this.socketService.on<UpdatedOrder>(event).subscribe((updatedOrder: UpdatedOrder) => {
   console.log('Received orderStateChanged event:', updatedOrder);
    this.fetchOrdersInProgress();

    const { id, state } = updatedOrder;

    if (this.order && this.order.id === id) {
      this.order.state = state;
    }
    console.log(this.order?.state);
    this.cdr.detectChanges();
  });
}

fetchOrdersInProgress(): void {
  this.orderService.filterOrder('in-progress').subscribe((orders: Order[]) => {
    this.ordersInProgress$ = of(orders);
  });
}
}
