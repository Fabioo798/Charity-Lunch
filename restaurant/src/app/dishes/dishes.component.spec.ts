import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Dish, KitchenAllDishResponse } from 'src/interfaces/interfaces';
import { OrderService } from '../service/order.service/order.service';
import { DishesComponent } from './dishes.component';
import { mockOrderService } from 'src/mocks/mocks';

describe('DishesComponent', () => {
  let component: DishesComponent;
  let fixture: ComponentFixture<DishesComponent>;
  let orderService: OrderService;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      declarations: [DishesComponent],
      providers: [{ provide: OrderService, useValue: mockOrderService }]
    });

    fixture = TestBed.createComponent(DishesComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService as any);
  });

  it('should load dishes on init', () => {
    const dummyDishes: Dish[] = [
      {
        id: 'test',
        name: 'test',
        ingredients: []
      },
      {
        id: 'test1',
        name: 'test1',
        ingredients: []
      },

    ];
    const response: KitchenAllDishResponse = {
      results: dummyDishes
    };
    spyOn(orderService, 'getAllDishes').and.returnValue(of(response));

    component.ngOnInit();

    expect(orderService.getAllDishes).toHaveBeenCalled();
    expect(component.dishes.length).toBe(2);
    expect(component.isError).toBeFalse();
  });

  it('should handle error from OrderService', () => {
    spyOn(orderService, 'getAllDishes').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(orderService.getAllDishes).toHaveBeenCalled();
    expect(component.isError).toBeTrue();
  });
});
