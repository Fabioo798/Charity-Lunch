import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoreService } from './store.service';
import { StoreIngredientResponse, StoreOrder, StoreOrderResponse } from 'src/interfaces/interfaces';

describe('StoreService', () => {
  let service: StoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoreService]
    });

    service = TestBed.inject(StoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch ingredients', () => {
    const mockResponse: StoreIngredientResponse = {results: []};

    service.getIngredients().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://34.74.133.150:4900/ingredient/ingredients');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch order history', () => {
    const mockResponse: StoreOrderResponse = {results: []};

    service.getOrderHistory().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://34.74.133.150:4900/shoplist/shoplists');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });
});
