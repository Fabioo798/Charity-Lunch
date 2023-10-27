import Ingredient from "../domain/ingredient.model.js";
import IngredientRepo from "../domain/ingredient.model.repo.js";
import IngredientCreator from "./ingredientcreator.js";

const mockRepo = {
  create: jest.fn(),
} as unknown as IngredientRepo;

const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;

describe('Given the IngredientCreator class', () => {
  const repo = new IngredientCreator(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(IngredientCreator);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create Ingredient repo method should called', async () => {
      (mockRepo.create as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.execute(mockIngredient);

      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
});