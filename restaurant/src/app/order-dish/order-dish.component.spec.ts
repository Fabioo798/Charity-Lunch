import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDishComponent } from './order-dish.component';
import { of, throwError } from 'rxjs';
import { Dish, KitchenOrderResponse } from 'src/interfaces/interfaces';
import { mockOrderService } from 'src/mocks/mocks';
import { OrderService } from '../service/order.service/order.service';

describe('OrderDishComponent', () => {
  let component: OrderDishComponent;
  let fixture: ComponentFixture<OrderDishComponent>;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDishComponent],
      providers: [
       {
         provide: OrderService,
         useValue: mockOrderService
        }
       ],
    })
    fixture = TestBed.createComponent(OrderDishComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });




  it('should assign the dish after placing the order successfully', () => {
    const expectedDish: KitchenOrderResponse = {results: { dish: {id: '', name: 'Test Dish', ingredients: [] }}} as unknown as KitchenOrderResponse; // Define your expected dish object

    spyOn(orderService, 'placeOrder').and.returnValue(
      of(expectedDish)
    ); // Mock the placeOrder method to return an observable of the expected dish

    component.orderDish();

    expect(component.isLoading).toBe(false);
    expect(component.order?.dish).toEqual(expectedDish.results.dish);
    expect(component.error).toBeNull();
  });

  it('should handle the error when placing the order', () => {
    const expectedError: string = 'Some error message'; // Define your expected error message

    spyOn(orderService, 'placeOrder').and.returnValue(
      throwError(() => expectedError) // Mock the placeOrder method to throw an error
    );

    component.orderDish();

    expect(component.isLoading).toBe(false);
    expect(component.order?.dish).toBeUndefined();
    expect(component.error).toEqual(expectedError);
  });
});
