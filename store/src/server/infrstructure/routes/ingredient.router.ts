/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from "express";
import ServerRouter from "../Server.router.interface.js";
import { IngredientController } from "../../application/controller/ingredient.controller.js";


export default class IngredientRouter implements ServerRouter {

  path: string = '/ingredient';
  // eslint-disable-next-line new-cap
  router: Router = Router();

  constructor(private controller: IngredientController) {
    this.registerControllers();
  }

  registerControllers(): void {
   this.router.patch('/quantity', );
   this.router.get('/ingredients' , );
   this.router.post('/create', this.controller.createIngredient.bind(this.controller))
  }
}