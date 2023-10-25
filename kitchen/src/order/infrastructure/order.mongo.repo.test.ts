import { OrderModel } from "../../server/domain/order.schema.js";
import Order, { OrderState } from "../domain/order.model.js";
import OrderMongoRepo from "./order.mongo.repo.js";

jest.mock('../../server/domain/order.schema');

const mockModel = {
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
} as unknown as typeof OrderModel;

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
let popValue: unknown;

const mockPopulateExec = () => ({
  populate: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(popValue),
    })),
  })),
});

describe('Given the OrderMongoRepo', () => {
  const repo = new OrderMongoRepo(mockModel);

  describe('When it is called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(OrderMongoRepo);
    });
  });

  

  describe('When create method is called', () => {
    test('Then it should create an order', async () => {
      (mockModel.create as jest.Mock).mockResolvedValue(mockOrder);

      await repo.create(mockOrder);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
  describe('When update method is called', () => {
    test('Then it should update an order', async () => {
      (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockOrder);

      await repo.update(mockOrder);

      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
  describe('When find method is called', () => {
    test('Then it should find an order', async () => {
      (mockModel.findById as jest.Mock).mockImplementation(mockPopulateExec);

      await repo.find('2');

      expect(mockModel.findById).toHaveBeenCalled();
    });
  });

  describe('When findAll method is called', () => {
    test('Then it should find an Order', async () => {
      (mockModel.find as jest.Mock).mockImplementation(mockPopulateExec);

      await repo.findAll();

      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('When delete method is called', () => {
    test('Then it should delete an order', async () => {
      (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockOrder);

      await repo.delete('2');

      expect(mockModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });
  describe('When search method is called', () => {
    test('Then it should search an order', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue(mockOrder);

      await repo.search({ key: 'state', value: 'in progress' });

      expect(mockModel.find).toHaveBeenCalled();
    });
  });
});