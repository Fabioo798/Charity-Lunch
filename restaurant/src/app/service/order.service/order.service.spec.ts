import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { KitchenOrderResponse } from 'src/interfaces/interfaces';

describe('OrderService', () => {
  let service: OrderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Given placeOrder method', () => {
    describe('When called', () => {
      it('Then should send a GET request to the server', () => {
        service.placeOrder().subscribe((resp) => {
          expect(resp).not.toBeNull;
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne('http://localhost:4800/order/create');
        expect(req.request.method).toEqual('POST');
        req.flush({} as KitchenOrderResponse);
      });
    });
  });
  describe('Given orderHistory method', () => {
    describe('When called', () => {
      it('Then should send a GET request to the server', () => {
        service.orderHistory().subscribe((resp) => {
          expect(resp).not.toBeNull;
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne('http://localhost:4800/order/history');
        expect(req.request.method).toEqual('GET');
        req.flush({} as KitchenOrderResponse);
      });
    });
  });
});
