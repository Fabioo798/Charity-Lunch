import Dish from "../domain/dish.model.js";
import DishRepo from "../domain/dish.model.repo.js";
import DishCreator from "./dishcreator.js";

const mockRepo = {
  create: jest.fn(),
} as unknown as DishRepo;

const mockDish = {
   name: 'test',
   ingredients: [
    {name: 'peperoni', quantity: 1},
    {name: 'peperoni1', quantity: 1},
  ],
 } as Dish;

describe('Given the DishCreator class', () => {
  const repo = new DishCreator(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(DishCreator);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create dish repo method should called', async () => {
      (mockRepo.create as jest.Mock).mockResolvedValue(mockDish);

      await repo.execute(mockDish);

      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
});