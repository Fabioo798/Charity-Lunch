/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from "express";
import { Interceptors } from "../../application/interceptors/interceptors.js";
import ServerRouter from "../Server.router.interface.js";
import { DishController } from "../../application/controller/dish.controller.js";
import OrderUpdater from "../../../order/application/orderupdater.js";

export default class DishRouter implements ServerRouter {

  constructor(private controller: DishController,
  private orderUpdater: OrderUpdater) {
   this.registerControllers();
 }

  path: string = '/dish';
  interceptor: Interceptors = new Interceptors(this.orderUpdater);
  // eslint-disable-next-line new-cap
  router: Router = Router();

  

  registerControllers(): void {
   this.router.post('/dish', this.controller.createDish.bind(this.controller));
   this.router.get('/dishes', this.controller.findAllDish.bind(this.controller));
  }
}