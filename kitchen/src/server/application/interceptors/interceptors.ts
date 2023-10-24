import { NextFunction, Request, Response } from "express";
import { dishes } from "../../../dish/domain/recipes.js";
import { OrderState } from "../../../order/domain/order.model.js";
import Dish from "../../../dish/domain/dish.model.js";

export class Interceptors {
 
 
 dishInterceptor(req: Request, res: Response, next: NextFunction) {
  const dish: Dish = dishes[Math.floor(Math.random() * dishes.length)];
  req.body.dish = dish;
  req.body.timeStamp = new Date();
  req.body.state = OrderState.InProgress;
  
  next();
}

}