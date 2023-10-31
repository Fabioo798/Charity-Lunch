import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Ingredient, StoreIngredientResponse, StoreOrder, StoreOrderResponse } from 'src/interfaces/interfaces';
import { StoreService } from '../service/store.service/store.service';
import { StoreComponent } from './store.component';
import { mockIngredientService } from 'src/mocks/mocks';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let storeService: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreComponent],
      providers: [{provide: StoreService, useValue: mockIngredientService}]
    });

    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
  });

  it('should load ingredients and orders on init', () => {
    const dummyIngredients: Ingredient[] = [
      {id: 3, name: 'test', quantity: 3},
      {id: 2, name: 'test', quantity: 3},
    ];
    const ingredientResponse: StoreIngredientResponse = {
      results: dummyIngredients
    };
    spyOn(storeService, 'getIngredients').and.returnValue(of(ingredientResponse));

    const dummyOrders: StoreOrder[] = [
      {id: 'test', name: 'test', quantitySold: 3, timeStamp: new Date()},
      {id: 'test', name: 'test', quantitySold: 4, timeStamp: new Date()},

    ];
    const orderResponse: StoreOrderResponse = {
      results: dummyOrders
    };
    spyOn(storeService, 'getOrderHistory').and.returnValue(of(orderResponse));

    component.ngOnInit();

    expect(storeService.getIngredients).toHaveBeenCalled();
    expect(component.ingredients.length).toBe(2);
    expect(component.isErrorIngredients).toBeFalse();
    expect(storeService.getOrderHistory).toHaveBeenCalled();
    expect(component.orders.length).toBe(2);
    expect(component.isErrorOrder).toBeFalse();
  });

  it('should handle error from StoreService', () => {
    spyOn(storeService, 'getIngredients').and.returnValue(throwError('Error'));
    spyOn(storeService, 'getOrderHistory').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(storeService.getIngredients).toHaveBeenCalled();
    expect(component.isErrorIngredients).toBeTrue();
    expect(storeService.getOrderHistory).toHaveBeenCalled();
    expect(component.isErrorOrder).toBeTrue();
  });

});
