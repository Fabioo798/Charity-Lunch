import Ingredient from '../domain/ingredient.model.js';
import IngredientRepo from '../domain/ingredient.model.repo.js';
import IngredientDeleter from './ingredientdeleter.js';

const mockRepo = {
  delete: jest.fn(),
} as unknown as IngredientRepo;


const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;

describe('Given the IngredientDeleter class', () => {
  const repo = new IngredientDeleter(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(IngredientDeleter);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create dish repo method should called', async () => {
      (mockRepo.delete as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.execute('2');

      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
});