/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from "express";
import { Interceptors } from "../../application/interceptors/interceptors.js";
import ServerRouter from "../Server.router.interface.js";
import { OrderController } from "../../application/controller/order.controller.js";
import OrderUpdater from "../../../order/application/orderupdater.js";
export default class OrderRouter implements ServerRouter {
 constructor(private controller: OrderController,
  private orderUpdater: OrderUpdater) {
   this.registerControllers();
 }

  path: string = '/order';
  interceptor: Interceptors = new Interceptors(this.orderUpdater);
  // eslint-disable-next-line new-cap
  router: Router = Router();


  registerControllers(): void {
   this.router.post('/create', this.interceptor.dishInterceptor, this.controller.createOrder.bind(this.controller), this.interceptor.dishInfoInterceptor.bind(this.controller));
   this.router.get('/history', this.controller.findAllOrder.bind(this.controller));
   this.router.get('/state=:state', this.controller.searchOrder.bind(this.controller));
  }
}