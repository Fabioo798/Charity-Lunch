import Ingredient from "../domain/ingredient.model";
import IngredientRepo from "../domain/ingredient.model.repo";
import IngredientUpdater from "./ingredientupdater";

const mockRepo = {
  update: jest.fn(),
} as unknown as IngredientRepo;


const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;

describe('Given the IngredientUpdater class', () => {
  const repo = new IngredientUpdater(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(IngredientUpdater);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the search Ingredient repo method should called', async () => {
      (mockRepo.update as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.execute(mockIngredient.id, mockIngredient);

      expect(mockRepo.update).toHaveBeenCalled();
    });
  });
});