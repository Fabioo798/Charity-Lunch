import Order, { OrderState } from '../domain/order.model.js';
import OrderRepo from '../domain/order.model.repo.js';
import OrderCreator from './ordercreator.js';

const mockRepo = {
  create: jest.fn(),
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

describe('Given the OrderCreator class', () => {
  const repo = new OrderCreator(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(OrderCreator);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create Order repo method should called', async () => {
      (mockRepo.create as jest.Mock).mockResolvedValue(mockOrder);

      await repo.execute(mockOrder);

      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
});
