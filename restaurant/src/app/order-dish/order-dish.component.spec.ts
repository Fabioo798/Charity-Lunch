import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDishComponent } from './order-dish.component';
import { OrderService } from '../service/order.service';
import { of, throwError } from 'rxjs';
import { Dish } from 'src/interfaces/interfaces';

describe('OrderDishComponent', () => {
  let component: OrderDishComponent;
  let fixture: ComponentFixture<OrderDishComponent>;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDishComponent],
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDishComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should assign the dish after placing the order successfully', () => {
    const expectedDish: Dish = { id: '', name: 'Test Dish', ingredients: [] }; // Define your expected dish object

    spyOn(orderService, 'placeOrder').and.returnValue(
      of({ results: { data: expectedDish } })
    ); // Mock the placeOrder method to return an observable of the expected dish

    component.orderDish();

    expect(component.isLoading).toBe(false);
    expect(component.dish).toEqual(expectedDish);
    expect(component.error).toBeNull();
  });

  it('should handle the error when placing the order', () => {
    const expectedError: string = 'Some error message'; // Define your expected error message

    spyOn(orderService, 'placeOrder').and.returnValue(
      throwError(() => expectedError) // Mock the placeOrder method to throw an error
    );

    component.orderDish();

    expect(component.isLoading).toBe(false);
    expect(component.dish).toBeUndefined();
    expect(component.error).toEqual(expectedError);
  });
});