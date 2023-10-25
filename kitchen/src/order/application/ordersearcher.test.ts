import Order, { OrderState } from '../domain/order.model.js';
import OrderRepo from '../domain/order.model.repo.js';
import OrderSearcher from './ordersearcher.js';

const mockRepo = {
  search: jest.fn(),
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

describe('Given the OrderSearcher class', () => {
  const repo = new OrderSearcher(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(OrderSearcher);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the search order repo method should called', async () => {
      (mockRepo.search as jest.Mock).mockResolvedValue(mockOrder);

      await repo.execute({ key: 'email', value: 'test' });

      expect(mockRepo.search).toHaveBeenCalled();
    });
  });
});