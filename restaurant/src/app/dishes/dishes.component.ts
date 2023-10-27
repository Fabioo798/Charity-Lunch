import { Component } from '@angular/core';
import { OrderService } from '../service/order.service/order.service';
import { Dish, KitchenAllDishResponse } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent {
 dishes: Dish[];

 constructor(private orderService: OrderService) {
  this.dishes = []
 }

 ngOnInit(): void {
 this.getAllDishes()
 }


 getAllDishes(): void {
    this.orderService.getAllDishes().subscribe({
     next: (response: KitchenAllDishResponse) => {
      this.dishes = response.results;
      console.log(this.dishes)
     },
     error: (error) => {
      console.log(error)
     }
  });
  }
}
