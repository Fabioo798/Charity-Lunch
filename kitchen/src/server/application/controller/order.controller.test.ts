import { NextFunction, Request, Response } from 'express';
import Order, { OrderState } from '../../../order/domain/order.model.js';
import OrderCreator from '../../../order/application/ordercreator.js';
import OrderDeleter from '../../../order/application/orderdeleter.js';
import OrderFinder from '../../../order/application/orderfinder.js';
import OrderFinderAll from '../../../order/application/orderfinderall.js';
import OrderSearcher from '../../../order/application/ordersearcher.js';
import OrderUpdater from '../../../order/application/orderupdater.js';
import OrderRepo from '../../../order/domain/order.model.repo.js';
import { OrderController } from './order.controller.js';


const res = {
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;

const next = jest.fn() as unknown as NextFunction;

const mockRepo = {
  create: jest.fn(),
  search: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as OrderRepo;


const mockOrderCreator = new OrderCreator(mockRepo);
const mockOrderSearcher = new OrderSearcher(mockRepo);
const mockOrderFinderAll = new OrderFinderAll(mockRepo);
const mockOrderFinder = new OrderFinder(mockRepo);
const mockOrderUpdate = new OrderUpdater(mockRepo);
const mockOrderDeleter = new OrderDeleter(mockRepo);

describe('Given OrderController class', () => {
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


  const controller = new OrderController(
    mockOrderCreator,
    mockOrderFinder,
    mockOrderFinderAll,
    mockOrderSearcher,
    mockOrderUpdate,
    mockOrderDeleter,
  );

  describe('When it is instanced', () => {
    test('Then it should call the OrderController', () => {
      expect(controller).toBeInstanceOf(OrderController);
    });
  });

  describe('When createOrder method is called', () => {
    test('Then if the Order information is completed, it should return the resp.satus and resp.json', async () => {
      const req1 = {
        body: {
         id: 'test',
          dish: {
            id: '1',
            name: 'test',
            ingredients: ['peperoni', 'test2', 'test3'],
           },
          timeStamp: new Date(),
          state: OrderState.InProgress,
        },
      } as unknown as Request;
      const mockData = (mockRepo.find as jest.Mock).mockReturnValue({
         id: 'test',
          dish: {},
          timeStamp: new Date(),
          state: OrderState.InProgress,
      });
      req1.body.owner = mockData;
      await controller.createOrder(req1, res, next);
      (mockRepo.update as jest.Mock).mockResolvedValue(mockOrder);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    test('Then if Order information in the body, has not  state, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
         id: 'test',
          dish: {
            id: '1',
            name: 'test',
            ingredients: ['peperoni', 'test2', 'test3'],
           },
          timeStamp: new Date(),
        },
      } as unknown as Request;
      await controller.createOrder(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if the Order info is INcompleted it should return next', async () => {
      const req = {
          body: {
             dish: {
               id: '1',
               name: 'test',
               ingredients: ['peperoni', 'test2', 'test3'],
              },
             state: OrderState.InProgress,
        },
      } as unknown as Request;

      await controller.createOrder(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When findOrder method is called', () => {
    test('Then if the Order info is completed it should return the status and json', async () => {
      const req = {
        params: {
          id: '1',
        },
      } as unknown as Request;
      await controller.findOrder(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
    test('Then if the Order info is INcompleted it should return next', async () => {
      const req = {} as unknown as Request;

      await controller.findOrder(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When findAllOrder method is called', () => {
    test('Then if the Order info is completed it should return the status and json', async () => {
      const req = {} as unknown as Request;

      await controller.findAllOrder(req, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
    test('Then if the Order info is INcompleted it should return next', async () => {
      const req = null as unknown as Request;

      await controller.findAllOrder(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When searchOrder method is called', () => {
    test('Then if the Order information is completed, it should return the resp.status and resp.json', async () => {
      const req = {
        body: {
          state: OrderState.InProgress,
        },
        params: {
          state: OrderState.InProgress,
        },
      } as unknown as Request;

      (mockRepo.search as jest.Mock).mockResolvedValue([OrderState.InProgress]);

      await controller.searchOrder(req, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When searchOrder method is called', () => {
    test('Then if the Order information is completed, it should return the resp.status and resp.json', async () => {
      const req = {
        body: {
          state: OrderState.InProgress,
        },
        params: {},
      } as unknown as Request;

      await controller.searchOrder(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When call the updateOrder method', () => {
    describe('When all params are correct', () => {
      test('Then it should call resp.json', async () => {
        const req = {
          body: {
  id: '2',
  dish: {
   id: '1',
   name: 'test',
   ingredients: ['peperoni', 'test2', 'test3'],
  },
  timeStamp: new Date(),
  state: OrderState.InProgress,
},
          params: { id: '2' },
        } as unknown as Request;
        (mockRepo.update as jest.Mock).mockResolvedValue({ id: '1' });
        await controller.updateOrder(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('When updateOrder fails', () => {
      test('Then it should call next', async () => {
        const req = {
          body: {
  dish: {
   id: '1',
   name: 'test',
   ingredients: ['peperoni', 'test2', 'test3'],
  },
  timeStamp: new Date(),
  state: OrderState.InProgress,
},
          params: { id: '1' },
        } as unknown as Request;
        (mockRepo.update as jest.Mock).mockResolvedValue(undefined);

        await controller.updateOrder(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('When there is no id', () => {
      test('Then it should call next', async () => {
        const req = {
          body: {
  dish: {
   id: '1',
   name: 'test',
   ingredients: ['peperoni', 'test2', 'test3'],
  },
  timeStamp: new Date(),
  state: OrderState.InProgress,
},
        } as unknown as Request;
        await controller.updateOrder(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When deleteOrder method is called', () => {
    test('Then if the id is found it should respond with status', async () => {
      const req = {
        body: {
  id: '2',
  dish: {
   id: '1',
   name: 'test',
   ingredients: ['peperoni', 'test2', 'test3'],
  },
  timeStamp: new Date(),
  state: OrderState.InProgress,
},
        params: { id: '1' },
      } as unknown as Request;

      (mockRepo.delete as jest.Mock).mockResolvedValue({ id: '1' });
      await controller.deleteOrder(req, res, next);
      expect(res.status).toHaveBeenCalled();
    });
  });
  describe('When deleteOrder method is called', () => {
    test('Then if there is no id it should respond with next', async () => {
      const req = {
        body: {
  id: '2',
  dish: {
   id: '1',
   name: 'test',
   ingredients: ['peperoni', 'test2', 'test3'],
  },
  timeStamp: new Date(),
  state: OrderState.InProgress,
},
        params: {},
      } as unknown as Request;

      (mockRepo.delete as jest.Mock).mockRejectedValue({});
      await controller.deleteOrder(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
