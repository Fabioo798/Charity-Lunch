import Ingredient from "../domain/ingredient.model";
import IngredientRepo from "../domain/ingredient.model.repo";
import IngredientSearcher from "./ingredientsearcher";

const mockRepo = {
  search: jest.fn(),
} as unknown as IngredientRepo;


const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;

describe('Given the IngredientSearcher class', () => {
  const repo = new IngredientSearcher(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(IngredientSearcher);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the search Ingredient repo method should called', async () => {
      (mockRepo.search as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.execute(['tomate', 'onion']);

      expect(mockRepo.search).toHaveBeenCalled();
    });
  });
});