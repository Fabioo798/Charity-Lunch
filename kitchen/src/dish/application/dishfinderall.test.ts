import Dish from "../domain/dish.model";
import DishRepo from "../domain/dish.model.repo";
import DishFinderAll from "./dishfinderall";

const mockRepo = {
  findAll: jest.fn(),
} as unknown as DishRepo;

const mockDish = {
   name: 'test',
   ingredients: [
    {name: 'peperoni', quantity: 1},
    {name: 'peperoni1', quantity: 1},
  ],
 } as Dish;

describe('Given the DishCreator class', () => {
  const repo = new DishFinderAll(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(DishFinderAll);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create dish repo method should called', async () => {
      (mockRepo.findAll as jest.Mock).mockResolvedValue(mockDish);

      await repo.execute();

      expect(mockRepo.findAll).toHaveBeenCalled();
    });
  });
});
