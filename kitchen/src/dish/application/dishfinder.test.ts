import Dish from "../domain/dish.model.js";
import DishRepo from "../domain/dish.model.repo.js";
import DishFinder from "./dishfinder.js";

const mockRepo = {
  find: jest.fn(),
} as unknown as DishRepo;


const mockDish = {
   name: 'test',
   ingredients: [
    {name: 'peperoni', quantity: 1},
    {name: 'peperoni1', quantity: 1},
  ],
 } as Dish;

describe('Given the Dishfinder class', () => {
  const repo = new DishFinder(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(DishFinder);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create dish repo method should called', async () => {
      (mockRepo.find as jest.Mock).mockResolvedValue(mockDish);

      await repo.execute('2');

      expect(mockRepo.find).toHaveBeenCalled();
    });
  });
});
