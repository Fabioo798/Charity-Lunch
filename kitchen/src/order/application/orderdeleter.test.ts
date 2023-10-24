import Order, { OrderState } from '../domain/order.model.js';
import OrderRepo from '../domain/order.model.repo.js';
import OrderDeleter from './orderdeleter.js';

const mockRepo = {
  delete: jest.fn(),
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

describe('Given the OrderDeleter class', () => {
  const repo = new OrderDeleter(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(OrderDeleter);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create user repo method should called', async () => {
      (mockRepo.delete as jest.Mock).mockResolvedValue(mockOrder);

      await repo.execute('2');

      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
});