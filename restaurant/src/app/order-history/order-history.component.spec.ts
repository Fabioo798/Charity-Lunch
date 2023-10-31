import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import { OrderService } from '../service/order.service/order.service';
import { mockOrderService } from 'src/mocks/mocks';
import { of, throwError } from 'rxjs';
import { Dish, KitchenOrdersArrResponse, Order } from 'src/interfaces/interfaces';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let orderService: OrderService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      providers: [
       {
         provide: OrderService,
         useValue: mockOrderService
        }
       ],
    });
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order history on init', () => {
    const dummyOrders: Order[] = [
      {
       id: 'test',
       dish: {} as unknown as Dish,
       timeStamp: new Date(),
       state: 'in progress'
      },
      {
       id: 'test1',
       dish: {} as unknown as Dish,
       timeStamp: new Date(),
       state: 'in progress'
      },
    ];
    const response: KitchenOrdersArrResponse = {
      results: dummyOrders as any
    };
    spyOn(orderService, 'orderHistory').and.returnValue(of(response));

    component.ngOnInit();

    expect(orderService.orderHistory).toHaveBeenCalled();
    expect(component.orders.length).toBe(2);
    expect(component.isError).toBeFalse();
  });

  it('should handle error from OrderService', () => {
    spyOn(orderService, 'orderHistory').and.returnValue(throwError(() => 'Error'));

    component.ngOnInit();

    expect(orderService.orderHistory).toHaveBeenCalled();
    expect(component.isError).toBeTrue();
  });
});
