import Order, { OrderState } from '../domain/order.model.js';
import OrderRepo from '../domain/order.model.repo.js';
import OrderFinder from './orderfinder.js';

const mockRepo = {
  find: jest.fn(),
} as unknown as OrderRepo;


const mockOrder = {
  id: '2',
  dish: {
   name: 'test',
   ingredients: [
    {name: 'peperoni', quantity: 1},
    {name: 'peperoni1', quantity: 1},
  ],
 },
  timeStamp: new Date(),
  state: OrderState.InProgress,

} as Order;

describe('Given the Orderfinder class', () => {
  const repo = new OrderFinder(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(OrderFinder);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create dish repo method should called', async () => {
      (mockRepo.find as jest.Mock).mockResolvedValue(mockOrder);

      await repo.execute('2');

      expect(mockRepo.find).toHaveBeenCalled();
    });
  });
});