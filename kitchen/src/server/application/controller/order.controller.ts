import { NextFunction, Request, Response } from "express";
import OrderCreator from "../../../order/application/ordercreator.js";
import OrderDeleter from "../../../order/application/orderdeleter.js";
import OrderFinder from "../../../order/application/orderfinder.js";
import OrderSearcher from "../../../order/application/ordersearcher.js";
import OrderUpdater from "../../../order/application/orderupdater.js";
import createDebug from 'debug';
import OrderFinderAll from "../../../order/application/orderfinderall.js";
import { HTTPError } from "../../../common/error.js";

const debug = createDebug('CL-Kitchen');


export class OrderController {
  // eslint-disable-next-line max-params
  constructor(
    private orderCreator: OrderCreator,
    private orderFinder: OrderFinder,
    private orderFinderAll: OrderFinderAll,
    private orderSearcher: OrderSearcher,
    private orderUpdater: OrderUpdater,
    private orderDeleter: OrderDeleter,
  ) {
       debug('Order controller instantiated');

}



 async createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    debug('createOrder method called')
    const { dish, timeStamp, state } = req.body;
  
    if (!dish || !timeStamp || !state) {
      throw new Error("Required properties are missing in the request body");
    }

    const data = await this.orderCreator.execute(req.body);
    req.body.orderData = data
    res.status(201).json({results: data});
    debug('order created!')
    next();
  } catch (error) {
    debug('error during order creation!')
    next(error);
  }
}

 async findOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('findOrder method called');
      const { id } = req.params;
      const data = await this.orderFinder.execute(id);

      res.status(200);
      res.json({ results: [data] });
    } catch (error) {

      debug('error finding an order!')
      next(error);
    }
  }

  async findAllOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('findAllOrder method called');

      const response = await this.orderFinderAll.execute();

      res.status(200);
      res.json({ results: response });
    } catch (error) {
      debug('error retreading all orders!')
      next(error)
    }
  }

  async searchOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('searchOrder method called');
      if (!req.params.state)
        throw new HTTPError(404, 'Missing state', 'no state in the body');
      const data = await this.orderSearcher.execute({
        key: 'state',
        value: req.params.state,
      });

      res.status(200);
      res.json(data);
    } catch (error) {

      debug('error searching an order!')
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('updateOrder method called');
      const { id } = req.params;
      const { body } = req;

      const newOrder = {
        id,
        ...body,
      };

      await this.orderUpdater.execute(id, newOrder);

      res.status(200);
      res.json({ ok: true, message: 'Order updated successfully' });
    } catch (error) {

      debug('error updating an order!')
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      debug('deleteOrder method called');
      const { id } = req.params;

      await this.orderDeleter.execute(id);

      res.status(200);
      res.json({ ok: true, message: 'Order deleted successfully' });
    } catch (error) {
      debug('error deleting an order!')
      next(error);
    }
  }

}