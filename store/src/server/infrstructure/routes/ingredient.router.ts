/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from "express";
import ServerRouter from "../Server.router.interface.js";
import { IngredientController } from "../../application/controller/ingredient.controller.js";
import { Interceptors } from "../../application/interceptors/interceptors.js";
import IngredientSearcher from "../../../Ingredients/application/ingredientsearcher.js";
import IngredientUpdater from "../../../Ingredients/application/ingredientupdater.js";


export default class IngredientRouter implements ServerRouter {
 constructor(
  private ingredientSearcher: IngredientSearcher,
  private ingredientUpdater: IngredientUpdater,
  private controller: IngredientController

 ) {this.registerControllers();}

  path: string = '/ingredient';
  interceptor: Interceptors = new Interceptors(this.ingredientSearcher, this.ingredientUpdater);
  router: Router = Router();


  registerControllers(): void {
   this.router.patch('/quantity', this.interceptor.firstMiddleware.bind(this.controller), this.interceptor.secondMiddleware.bind(this.controller), this.interceptor.thirdMiddleware.bind(this.controller), this.interceptor.fourthMiddleware.bind(this.controller));
   this.router.get('/ingredients' , );
   // This.router.post('/create', this.controller.createIngredient.bind(this.controller))
  }
}