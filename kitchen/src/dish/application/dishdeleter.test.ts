import Dish from "../domain/dish.model.js";
import DishRepo from "../domain/dish.model.repo.js";
import DishDeleter from "./dishdeleter.js";

const mockRepo = {
  delete: jest.fn(),
} as unknown as DishRepo;


const mockDish = {
   name: 'test',
   ingredients: [
    {name: 'peperoni', quantity: 1},
    {name: 'peperoni1', quantity: 1},
  ],
 } as Dish;

describe('Given the DishDeleter class', () => {
  const repo = new DishDeleter(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(DishDeleter);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create dish repo method should called', async () => {
      (mockRepo.delete as jest.Mock).mockResolvedValue(mockDish);

      await repo.execute('2');

      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
});