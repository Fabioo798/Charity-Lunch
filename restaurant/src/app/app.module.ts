import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDishComponent } from './order-dish/order-dish.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './infrastructure/layout/layout.component';
import { HeaderComponent } from './infrastructure/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDishComponent,
    OrderHistoryComponent,
    RecipeComponent,
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
