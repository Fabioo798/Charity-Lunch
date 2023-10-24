/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from "express";
import OrderCreator from "../../../order/application/ordercreator.js";
import OrderDeleter from "../../../order/application/orderdeleter.js";
import OrderFinder from "../../../order/application/orderfinder.js";
import OrderSearcher from "../../../order/application/ordersearcher.js";
import OrderUpdater from "../../../order/application/orderupdater.js";
import createDebug from 'debug';
import OrderFinderAll from "../../../order/application/orderfinderall.js";
import { HTTPError } from "../../../common/error.js";

const debug = createDebug('WOF: user controller');


export class OrderController {
  // eslint-disable-next-line max-params
  constructor(
    private orderCreator: OrderCreator,
    private orderFinder: OrderFinder,
    private orderFinderAll: OrderFinderAll,
    private orderSearcher: OrderSearcher,
    private orderUpdater: OrderUpdater,
    private orderDeleter: OrderDeleter
  ) {
       debug('Order controller instantiated');

}



 async createOrder(req: Request, res: Response, next: NextFunction) {
   try {
    const { body } = req
   if(
    !req.body.dish ||
    !req.body.timeStamp || 
    !req.body.state)
   throw new Error;


    const data = await this.orderCreator.execute(body);

     res.status(201);
      res.json({
        results: [data],
      });
   } catch (error) {
     next(error);
   }
 }

 async findOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('findOrder');
      const { id } = req.params;
      const data = await this.orderFinder.execute(id);

      res.status(200);
      res.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async findAllOrder(req: Request, res: Response, _next: NextFunction) {
    debug('findUser');
    const response = await this.orderFinderAll.execute();

    res.status(200);
    res.json({ results: [response] });
  }

  async searchOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('searchOrder');
      if (!req.params.state)
        throw new HTTPError(404, 'Missing state', 'no state in the body');
      const data = await this.orderSearcher.execute({
        key: 'state',
        value: req.params.state,
      });

      res.status(200);
      res.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('updateOrder');
      const { id } = req.params;
      const { body } = req;

      const newOrder = {
        id,
        ...body,
      };

      await this.orderUpdater.execute(newOrder);

      res.status(200);
      res.json({ ok: true, message: 'Order updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('deleteOrder');
      const { id } = req.params;

      await this.orderDeleter.execute(id);

      res.status(200);
      res.json({ ok: true, message: 'Order deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

}