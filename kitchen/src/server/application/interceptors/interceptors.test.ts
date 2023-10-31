import { Request, Response, NextFunction } from "express";
import { Interceptors } from "./interceptors";
import { OrderState } from "../../../order/domain/order.model.js";
import { DishModel } from "../../domain/dish.schema.js";
import axios from "axios";
import OrderUpdater from "../../../order/application/orderupdater.js";
import OrderRepo from "../../../order/domain/order.model.repo";

jest.mock('axios');
jest.mock('../../../order/application/orderupdater.js');
jest.mock('../../domain/dish.schema.js');

const mockRequest = () => ({
    body: {}
  } as Request);

const mockResponse = () => ({
  } as Response);

const mockNext = () => jest.fn() as NextFunction;

const mockRepo = {
  update: jest.fn(),
} as unknown as OrderRepo

const orderUpdaterInstance = new OrderUpdater(mockRepo);


describe('Interceptor tests', () => {

    const interceptorsInstance = new Interceptors(orderUpdaterInstance);
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully run dishInterceptor', async () => {
        DishModel.countDocuments = jest.fn().mockResolvedValue(5);
        DishModel.findOne = jest.fn().mockImplementation(() => ({
        skip: jest.fn().mockResolvedValue('1234') }));
        await interceptorsInstance.dishInterceptor(req, res , next);

        expect(req.body.dish).toEqual('1234');
        expect(req.body.state).toEqual(OrderState.InProgress);
        expect(next).toHaveBeenCalled();
    });
    

    it('should run dishInfoInterceptor and update the order state to complete', async () => {
        req.body = {
            dish: {
              ingredients: [
                {
                  name: 'Potato',
                  quantity: 1,
                }
              ]
            },
            orderData: {
              id: '1234' 
            }
        };
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (axios.patch as any).mockResolvedValue({ status: 200 });

        await interceptorsInstance.dishInfoInterceptor(req, res, next);
    
        expect(axios.patch).toHaveBeenCalledWith('http://host.docker.internal:4900/ingredient/quantity', { ingredients: req.body.dish.ingredients });
        expect(orderUpdaterInstance.execute).toHaveBeenCalledWith(req.body.orderData.id, { state: OrderState.Complete });
    });

    it('should run dishInfoInterceptor and update the order state to NotEnoughIngredient if axios request fails', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (axios.patch as any).mockRejectedValue('Error');

        await interceptorsInstance.dishInfoInterceptor(req, res, next);

        expect(orderUpdaterInstance.execute).toHaveBeenCalledWith(req.body.orderData.id, { state: OrderState.NotEnoughIngredient });
        expect(next).toHaveBeenCalled();
    });
    
    afterAll(() => {
     interceptorsInstance.closeSocketConnection()
    });
   });