import Ingredient from "../domain/ingredient.model.js";
import IngredientRepo from "../domain/ingredient.model.repo.js";
import IngredientFinder from "./ingredientfinder.js";

const mockRepo = {
  find: jest.fn(),
} as unknown as IngredientRepo;


const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;

describe('Given the Ingredientfinder class', () => {
  const repo = new IngredientFinder(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(IngredientFinder);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create dish repo method should called', async () => {
      (mockRepo.find as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.execute('2');

      expect(mockRepo.find).toHaveBeenCalled();
    });
  });
});