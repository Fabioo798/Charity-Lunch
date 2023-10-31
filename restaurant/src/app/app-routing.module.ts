import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDishComponent } from './order-dish/order-dish.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { StoreComponent } from './store/store.component';
import { DishesComponent } from './dishes/dishes.component';

const routes: Routes = [
  { path: 'order', component: OrderDishComponent },
  { path: 'history', component: OrderHistoryComponent },
  { path: 'recipes', component: DishesComponent },
  { path: 'storage', component: StoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
