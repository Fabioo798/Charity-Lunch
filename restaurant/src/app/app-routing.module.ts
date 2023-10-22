import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDishComponent } from './order-dish/order-dish.component';
import { RecipeComponent } from './recipe/recipe.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  { path: 'order', component: OrderDishComponent },
  { path: 'history', component: OrderHistoryComponent },
  { path: 'recipes', component: RecipeComponent },
  { path: 'storage', component: OrderDishComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
