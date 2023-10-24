import Order, { OrderState } from '../domain/order.model.js';
import OrderRepo from '../domain/order.model.repo.js';
import OrderUpdater from './orderupdater.js';

const mockRepo = {
  update: jest.fn(),
} as unknown as OrderRepo;


const mockOrder = {
  id: '2',
  dish: {
   id: '1',
   name: 'test',
   ingredients: ['peperoni', 'test2', 'test3'],
  },
  timeStamp: new Date(),
  state: OrderState.InProgress,
} as Order;

describe('Given the OrderUpdater class', () => {
  const repo = new OrderUpdater(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(OrderUpdater);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the search user repo method should called', async () => {
      (mockRepo.update as jest.Mock).mockResolvedValue(mockOrder);

      await repo.execute(mockOrder);

      expect(mockRepo.update).toHaveBeenCalled();
    });
  });
});