import { DishModel } from "../../server/domain/dish.schema.js";
import Dish from "../domain/dish.model.js";
import DishMongoRepo from "./dish.mongo.repo.js";

jest.mock('../../server/domain/dish.schema');

const mockModel = {
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
} as unknown as typeof DishModel;

const mockDish = {
   name: 'test',
   ingredients: [
    {name: 'peperoni', quantity: 1},
    {name: 'peperoni1', quantity: 1},
  ],
 } as Dish;
let popValue: unknown;

const mockPopulateExec = () => ({
  populate: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(popValue),
    })),
  })),
});

describe('Given the DishMongoRepo', () => {
  const repo = new DishMongoRepo(mockModel);

  describe('When it is called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(DishMongoRepo);
    });
  });

  describe('When create method is called', () => {
    test('Then it should create an dish', async () => {
      (mockModel.create as jest.Mock).mockResolvedValue(mockDish);

      await repo.create(mockDish);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
  describe('When find method is called', () => {
    test('Then it should find an dish', async () => {
      (mockModel.findById as jest.Mock).mockImplementation(mockPopulateExec);

      await repo.find('2');

      expect(mockModel.findById).toHaveBeenCalled();
    });
  });

  describe('When findAll method is called', () => {
    test('Then it should find an dish', async () => {
      (mockModel.find as jest.Mock).mockImplementation(mockPopulateExec);

      await repo.findAll();

      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('When delete method is called', () => {
    test('Then it should delete an Dish', async () => {
      (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDish);

      await repo.delete('2');

      expect(mockModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });
  
});
