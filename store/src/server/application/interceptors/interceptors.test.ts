import { Request, Response, NextFunction } from 'express';
import { Interceptors } from './interceptors'; // Note: replace with actual path
import IngredientSearcher from '../../../Ingredients/application/ingredientsearcher.js';
import IngredientUpdater from '../../../Ingredients/application/ingredientupdater.js';
import Ingredient from '../../../Ingredients/domain/ingredient.model.js';
import ShopListCreator from '../../../shopList/application/shopListCreator.js';
import IngredientRepo from '../../../Ingredients/domain/ingredient.model.repo.js';
import ShopListRepo from '../../../shopList/domain/shopList.model.repo';
import axios from 'axios';

describe('Interceptors', () => {
  let interceptor: Interceptors;
  let mockIngredientSearcher: jest.Mocked<IngredientSearcher>;
  let mockIngredientUpdater: jest.Mocked<IngredientUpdater>;
  let mockShopListCreator: jest.Mocked<ShopListCreator>;

  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockRepo = {
  update: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  search: jest.fn(),

} as unknown as IngredientRepo;

 const shopListMockRepo = {
  create: jest.fn()
  
 } as unknown as ShopListRepo

  beforeEach(() => {
    // Mock the classes
    IngredientSearcher.prototype.execute = jest.fn();
    mockIngredientSearcher =  new IngredientSearcher(mockRepo) as unknown as jest.Mocked<IngredientSearcher>;

    IngredientUpdater.prototype.execute = jest.fn();
    mockIngredientUpdater =  new IngredientUpdater(mockRepo) as unknown as jest.Mocked<IngredientUpdater>;

    ShopListCreator.prototype.execute = jest.fn();
    mockShopListCreator = new ShopListCreator(shopListMockRepo) as unknown as jest.Mocked<ShopListCreator>;

    // Create the interceptor with the mock classes
    interceptor = new Interceptors(mockIngredientSearcher, mockIngredientUpdater, mockShopListCreator);
  });

  test('firstMiddleware adds missingIngredients to req.body and calls next function', async () => {

    const req = {
      body: {
        ingredients: [
          { name: 'ingredient1', quantity: 10 },
        ]
      }
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    const searchedIngredients: Ingredient[] = [
      { id: '1', name: 'ingredient1', quantity: 5 }
    ];

    // Mock execute to return ingredients with insufficient quantities
    mockIngredientSearcher.execute.mockResolvedValueOnce(Promise.resolve(searchedIngredients));

    await interceptor.firstMiddleware(req, res, next);

    expect(req.body.skip).toEqual(false);
    expect(req.body.missingIngredients[0].name).toBe('ingredient1');
    expect(next).toHaveBeenCalled();
  });

  // Continue with the initial setup, import statements, and existing tests...

it('should catch errors and pass them to the next middleware', async () => {
    
  const req = {
    body: {
      ingredients: [
        { name: 'ingredient1', quantity: 10 },
      ]
    }
  } as unknown as Request;

  const res = {} as Response;
  const next = jest.fn() as NextFunction;

  // Simulate an error by having `ingredientSearcher.execute` reject
  mockIngredientSearcher.execute.mockRejectedValueOnce(new Error('Something went wrong.'));

  await interceptor.firstMiddleware(req, res, next);

  expect(next).toHaveBeenCalled();  
});

it('should not add missing ingredients when there are enough ingredients', async () => {
    
  const req = {
    body: {
      ingredients: [
        { name: 'ingredient1', quantity: 10 },
      ]
    }
  } as unknown as Request;

  const res = {} as Response;
  const next = jest.fn() as NextFunction;

  const searchedIngredients: Ingredient[] = [
    { id: '1', name: 'ingredient1', quantity: 20 }
  ];

  // `ingredientSearcher.execute` will resolve with enough ingredients
  mockIngredientSearcher.execute.mockResolvedValueOnce(searchedIngredients);

  await interceptor.firstMiddleware(req, res, next);

  // Ensure no missing ingredients were added
  expect(req.body.skip).toEqual(true);
  expect('missingIngredients' in req.body).toBe(false);
  expect(next).toHaveBeenCalled();
  
});

  test('secondMiddleware fetches missing ingredients and adds results to req.body', async () => {
    mockedAxios.get = jest.fn().mockResolvedValueOnce({ data: { quantitySold: 10 } }).mockResolvedValueOnce({ data: { quantitySold: 20 } });
    const req = {
      body: {
        skip: false,
        missingIngredients: [{ id: 1, name: 'ingredient1', quantity: 10 }],
      }
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    // Snapshot of axios response for '/farmers-market/buy'
    const axiosResponse = { data: { quantitySold: 10 } };

    // Mock axios.get to return quantitySold
    mockedAxios.get.mockResolvedValueOnce(axiosResponse);

    await interceptor.secondMiddleware(req, res, next);

    expect(req.body.results).toBeTruthy()
    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('thirdMiddleware updates ingredients and calls next function', async () => {

    const req = {
      body: {
        skip: false,
        results: [{ id: 1, name: 'ingredient1', quantity: 10 }],
      },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    await interceptor.thirdMiddleware(req, res, next);

    expect(mockIngredientUpdater.execute).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

   test('fourthMiddleware updates ingredients and send success response', async () => {

    const req = {
      body: {
        ingredients: [{ id: 1, name: 'ingredient1', quantity: 10 }],
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
    } as unknown as Response;
    
    const next = jest.fn();

    // Mock ingredientSearcher.execute to return ingredientInDbData
    mockIngredientSearcher.execute.mockResolvedValue([{ id: '1', name: 'ingredient1', quantity: 10 }]);

    await interceptor.fourthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});