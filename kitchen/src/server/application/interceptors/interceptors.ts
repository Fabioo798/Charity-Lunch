import { NextFunction, Request, Response } from "express";
import { OrderState } from "../../../order/domain/order.model.js";
import { DishModel } from "../../domain/dish.schema.js";

export class Interceptors {
 
 async dishInterceptor(req: Request, res: Response, next: NextFunction) {
  try {
    const count = await DishModel.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const dishObjectId = await DishModel.findOne().skip(randomIndex);
    
    req.body.dish = dishObjectId;
    req.body.timeStamp = new Date().toUTCString()
    req.body.state = OrderState.InProgress;

    next();
  } catch (error) {
    next(error);
  }
}

}