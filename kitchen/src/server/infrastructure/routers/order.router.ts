/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from "express";
import { Interceptors } from "../../application/interceptors/interceptors.js";
import ServerRouter from "../Server.router.interface.js";
import { OrderController } from "../../application/controller/order.controller.js";

export default class OrderRouter implements ServerRouter {

  path: string = '/order';
  interceptor: Interceptors = new Interceptors();
  // eslint-disable-next-line new-cap
  router: Router = Router();

  constructor(private controller: OrderController) {
    this.registerControllers();
  }

  registerControllers(): void {
   this.router.post('/order', this.interceptor.dishInterceptor, this.controller.createOrder.bind(this.controller))
  }
}