/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from "express";
import { Interceptors } from "../../application/interceptors/interceptors.js";
import ServerRouter from "../Server.router.interface.js";
import { DishController } from "../../application/controller/dish.controller.js";

export default class DishRouter implements ServerRouter {

  path: string = '/dish';
  interceptor: Interceptors = new Interceptors();
  // eslint-disable-next-line new-cap
  router: Router = Router();

  constructor(private controller: DishController) {
    this.registerControllers();
  }

  registerControllers(): void {
   this.router.post('/dish', this.controller.createDish.bind(this.controller));
   this.router.get('/dishes', this.controller.findAllDish.bind(this.controller));
  }
}