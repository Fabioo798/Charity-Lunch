import { NextFunction, Request, Response } from 'express';
import IngredientCreator from '../../../Ingredients/application/ingredientcreator.js';
import IngredientDeleter from '../../../Ingredients/application/ingredientdeleter.js';
import IngredientFinder from '../../../Ingredients/application/ingredientfinder.js';
import IngredientFinderAll from '../../../Ingredients/application/ingredientfinderall.js';
import IngredientSearcher from '../../../Ingredients/application/ingredientsearcher.js';
import IngredientUpdater from '../../../Ingredients/application/ingredientupdater.js';
import Ingredient from '../../../Ingredients/domain/ingredient.model.js';
import IngredientRepo from '../../../Ingredients/domain/ingredient.model.repo.js';
import { IngredientController } from './ingredient.controller.js';
import { error } from 'console';


const res = {
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;

const next = jest.fn() as unknown as NextFunction;

const mockRepo = {
  create: jest.fn(),
  search: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as IngredientRepo;


const mockIngredientCreator = new IngredientCreator(mockRepo);
const mockIngredientSearcher = new IngredientSearcher(mockRepo);
const mockIngredientFinderAll = new IngredientFinderAll(mockRepo);
const mockIngredientFinder = new IngredientFinder(mockRepo);
const mockIngredientUpdate = new IngredientUpdater(mockRepo);
const mockIngredientDeleter = new IngredientDeleter(mockRepo);

describe('Given IngredientController class', () => {
  const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;


  const controller = new IngredientController(
    mockIngredientCreator,
    mockIngredientFinder,
    mockIngredientFinderAll,
    mockIngredientSearcher,
    mockIngredientUpdate,
    mockIngredientDeleter,
  );

  describe('When it is instanced', () => {
    test('Then it should call the IngredientController', () => {
      expect(controller).toBeInstanceOf(IngredientController);
    });
  });

  describe('When createIngredient method is called', () => {
    test('Then if the Ingredient information is completed, it should return the resp.satus and resp.json', async () => {
      const req1 = {
        body: mockIngredient
      } as unknown as Request;
      
      // eslint-disable-next-line no-debugger
      debugger;
      
      await controller.createIngredient(req1, res, next);
      expect(res.status).toHaveBeenCalled();
    });

    test('Then if Ingredient information in the body, has not  state, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
             id: '2',
             quantity: 1,
        },
      } as unknown as Request;
      await controller.createIngredient(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When findIngredient method is called', () => {
    test('Then if the Ingredient info is completed it should return the status and json', async () => {
      const req = {
        params: {
          id: '1',
        },
      } as unknown as Request;
      await controller.findIngredient(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
    test('Then if the Ingredient info is INcompleted it should return next', async () => {
      const req = {} as unknown as Request;

      await controller.findIngredient(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When findAllIngredient method is called', () => {
    test('Then if the Ingredient info is completed it should return the status and json', async () => {
      const req = {} as unknown as Request;

      await controller.findAllIngredient(req, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
    test('Then if the Ingredient info is INcompleted it should return next', async () => {
      const req = null as unknown as Request;

      await controller.findAllIngredient(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When searchIngredient method is called', () => {
    test('Then if the Ingredient information is completed, it should return the resp.status and resp.json', async () => {
      const req = {
        body: {
         ingredients: [
         {
         name: 'peperoni',
         quantity: 2
        }]}
      } as unknown as Request;

      console.log(req.body.ingredients[0].name);
      
      (mockRepo.search as jest.Mock).mockResolvedValue([mockIngredient]);
      
      await controller.searchIngredient(req, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When searchIngredient method is called', () => {
    test('Then if the Ingredient information is incompleted, it should return next', async () => {
      const req = {
        body: {}
      } as unknown as Request;

      await controller.searchIngredient(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When call the updateIngredient method', () => {
    describe('When all params are correct', () => {
      test('Then it should call resp.json', async () => {
        const req = {
          body: mockIngredient
        } as unknown as Request;
        (mockRepo.update as jest.Mock).mockResolvedValue({ id: '2' });
        await controller.updateIngredient(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('When updateIngredient fails', () => {
      test('Then it should call next', async () => {
        const req = {
          body: null
        } as unknown as Request;
        (mockRepo.update as jest.Mock).mockResolvedValue(error);

        await controller.updateIngredient(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('When there is no id', () => {
      test('Then it should call next', async () => {
        const req = {
          body: { name: 'test',
          quantity: 2},
        } as unknown as Request;
        await controller.updateIngredient(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When deleteIngredient method is called', () => {
    test('Then if the id is found it should respond with status', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      (mockRepo.delete as jest.Mock).mockResolvedValue({ id: '1' });
      await controller.deleteIngredient(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });
  });
  describe('When deleteIngredient method is called', () => {
    test('Then if there is no id it should respond with next', async () => {
      const req = {
        params: {},
      } as unknown as Request;

      (mockRepo.delete as jest.Mock).mockRejectedValue({});
      await controller.deleteIngredient(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});