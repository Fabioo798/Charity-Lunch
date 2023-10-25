import { IngredientModel } from "../../server/domain/ingredient.schema.js";
import Ingredient from "../domain/ingredient.model.js";
import IngredientMongoRepo from "./ingredient.mongo.repo.js";

jest.mock('../../server/domain/Ingredient.schema');

const mockModel = {
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
} as unknown as typeof IngredientModel;

const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;

describe('Given the IngredientMongoRepo', () => {
  const repo = new IngredientMongoRepo(mockModel);

  describe('When it is called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(IngredientMongoRepo);
    });
  });

  

  describe('When create method is called', () => {
    test('Then it should create an Ingredient', async () => {
      (mockModel.create as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.create(mockIngredient);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
  describe('When update method is called', () => {
    test('Then it should update an Ingredient', async () => {
      (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.update(mockIngredient);

      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
  describe('When find method is called', () => {
    test('Then it should find an Ingredient', async () => {
      (mockModel.findById as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.find('2');

      expect(mockModel.findById).toHaveBeenCalled();
    });
  });

  describe('When findAll method is called', () => {
    test('Then it should find an Ingredient', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.findAll();

      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('When delete method is called', () => {
    test('Then it should delete an Ingredient', async () => {
      (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.delete('2');

      expect(mockModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });
  describe('When search method is called', () => {
    test('Then it should search an Ingredient', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.search(['tomato', 'onion']);

      expect(mockModel.find).toHaveBeenCalled();
    });
  });
});