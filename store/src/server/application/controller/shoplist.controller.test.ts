import { NextFunction, Request, Response } from 'express';
import ShopListCreator from '../../../shopList/application/shopListCreator.js';
import ShopListFinderAll from '../../../shopList/application/shopListFinderall.js';
import ShopList from '../../../shopList/domain/shopList.model.js';
import ShopListRepo from '../../../shopList/domain/shopList.model.repo.js';
import { ShopListController } from './shopList.controller.js';


const res = {
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;

const next = jest.fn() as unknown as NextFunction;

const mockRepo = {
  create: jest.fn(),
  findAll: jest.fn(),
} as unknown as ShopListRepo;


const mockShopListCreator = new ShopListCreator(mockRepo);
const mockShopListFinderAll = new ShopListFinderAll(mockRepo);

describe('Given ShopListController class', () => {
  const mockShopList = {
  id: '2',
  name: 'peperoni', 
  quantitySold: 1,
} as ShopList;


  const controller = new ShopListController(
    mockShopListCreator,
    mockShopListFinderAll,
  );

  describe('When it is instanced', () => {
    test('Then it should call the ShopListController', () => {
      expect(controller).toBeInstanceOf(ShopListController);
    });
  });

  describe('When createShopList method is called', () => {
    test('Then if the ShopList information is completed, it should return the resp.status and resp.json', async () => {
      const req1 = {
        body: mockShopList
      } as unknown as Request;
      
      // eslint-disable-next-line no-debugger
      debugger;
      
      await controller.createShopList(req1, res, next);
      expect(res.status).toHaveBeenCalled();
    });

    test('Then if ShopList information in the body, has not  state, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
             id: '2',
             quantity: 1,
        },
      } as unknown as Request;
      await controller.createShopList(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  
  describe('When findAllShopList method is called', () => {
    test('Then if the ShopList info is completed it should return the status and json', async () => {
      const req = {} as unknown as Request;

      await controller.findAllShopList(req, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
    test('Then if the ShopList info is INcompleted it should return next', async () => {
      const req = null as unknown as Request;

      await controller.findAllShopList(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});