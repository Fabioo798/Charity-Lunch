import { NextFunction, Request, Response } from "express";
import DishCreator from "../../../dish/application/dishcreator";
import DishDeleter from "../../../dish/application/dishdeleter";
import DishFinder from "../../../dish/application/dishfinder";
import DishFinderAll from "../../../dish/application/dishfinderall";
import Dish from "../../../dish/domain/dish.model";
import DishRepo from "../../../dish/domain/dish.model.repo";
import { DishController } from "./dish.controller";

const res = {
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;

const next = jest.fn() as unknown as NextFunction;

const mockRepo = {
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
} as unknown as DishRepo;


const mockDishCreator = new DishCreator(mockRepo);
const mockDishFinderAll = new DishFinderAll(mockRepo);
const mockDishFinder = new DishFinder(mockRepo);
const mockDishDeleter = new DishDeleter(mockRepo);

describe('Given DishController class', () => {
  const mockDish = {
   id: '1',
   name: 'test',
   ingredients: [
    {name: 'peperoni', quantity: 1},
    {name: 'peperoni1', quantity: 1},
  ],
  } as Dish;


  const controller = new DishController(
    mockDishCreator,
    mockDishFinder,
    mockDishFinderAll,
    mockDishDeleter,
  );

  describe('When it is instanced', () => {
    test('Then it should call the DishController', () => {
      expect(controller).toBeInstanceOf(DishController);
    });
  });

    describe('When createDish method is called', () => {
    test('Then if the Dish information is completed, it should return the resp.satus and resp.json', async () => {
      const req1 = {
        body: mockDish
      } as unknown as Request;

      await controller.createDish(req1, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    test('Then if Dish information in the body, has not name, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
          ingredients: [
          {name: 'peperoni', quantity: 1},
          {name: 'peperoni1', quantity: 1},
  ],
  },
      } as unknown as Request;
      await controller.createDish(req, res, next);
      expect(next).toHaveBeenCalled();
    });
   });

   describe('When findDish method is called', () => {
    test('Then if the Dish info is completed it should return the status and json', async () => {
      const req = {
        params: {
          id: '1',
        },
      } as unknown as Request;
      await controller.findDish(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
    test('Then if the Dish info is INcompleted it should return next', async () => {
      const req = {} as unknown as Request;

      await controller.findDish(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When findAllDish method is called', () => {
    test('Then if the Dish info is completed it should return the status and json', async () => {
      const req = {} as unknown as Request;

      await controller.findAllDish(req, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
    test('Then if the Dish info is INcompleted it should return next', async () => {
      const req = null as unknown as Request;

      await controller.findAllDish(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When deleteDish method is called', () => {
    test('Then if the id is found it should respond with status', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      (mockRepo.delete as jest.Mock).mockResolvedValue({ id: '1' });
      await controller.deleteDish(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('When deleteDish method is called', () => {
    test('Then if there is no id it should respond with next', async () => {
      const req = {
        params: {},
      } as unknown as Request;

      (mockRepo.delete as jest.Mock).mockRejectedValue({});
      await controller.deleteDish(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
 });