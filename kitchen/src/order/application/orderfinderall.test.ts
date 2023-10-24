import Order, { OrderState } from '../domain/order.model.js';
import OrderRepo from '../domain/order.model.repo.js';
import OrderFinderAll from './orderfinderall.js';

const mockRepo = {
  findAll: jest.fn(),
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

describe('Given the OrderCreator class', () => {
  const repo = new OrderFinderAll(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(OrderFinderAll);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create Order repo method should called', async () => {
      (mockRepo.findAll as jest.Mock).mockResolvedValue(mockOrder);

      await repo.execute();

      expect(mockRepo.findAll).toHaveBeenCalled();
    });
  });
});
