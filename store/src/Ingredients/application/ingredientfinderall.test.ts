import Ingredient from "../domain/ingredient.model";
import IngredientRepo from "../domain/ingredient.model.repo";
import IngredientFinderAll from "./ingredientfinderall";

const mockRepo = {
  findAll: jest.fn(),
} as unknown as IngredientRepo;

const mockIngredient = {
  id: '2',
  name: 'peperoni', 
  quantity: 1,
} as Ingredient;

describe('Given the IngredientCreator class', () => {
  const repo = new IngredientFinderAll(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(IngredientFinderAll);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create Ingredient repo method should called', async () => {
      (mockRepo.findAll as jest.Mock).mockResolvedValue(mockIngredient);

      await repo.execute();

      expect(mockRepo.findAll).toHaveBeenCalled();
    });
  });
});