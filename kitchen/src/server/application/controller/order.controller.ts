/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from "express";
import OrderCreator from "../../../order/application/ordercreator.js";
import OrderDeleter from "../../../order/application/orderdeleter.js";
import OrderFinder from "../../../order/application/orderfinder.js";
import OrderSearcher from "../../../order/application/ordersearcher.js";
import OrderUpdater from "../../../order/application/orderupdater.js";


export class OrderController {
  // eslint-disable-next-line max-params
  constructor(
    private orderCreator: OrderCreator,
    private orderFinder: OrderFinder,
    private orderSearcher: OrderSearcher,
    private orderUpdater: OrderUpdater,
    private orderDeleter: OrderDeleter
  ) {
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

}