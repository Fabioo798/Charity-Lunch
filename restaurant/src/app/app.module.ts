import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDishComponent } from './order-dish/order-dish.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './infrastructure/layout/layout.component';
import { HeaderComponent } from './infrastructure/header/header.component';
import { LOCALE_ID } from '@angular/core';
import { StoreComponent } from './store/store.component';
import { DishesComponent } from './dishes/dishes.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDishComponent,
    OrderHistoryComponent,
    LayoutComponent,
    HeaderComponent,
    StoreComponent,
    DishesComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
   { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
