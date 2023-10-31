import { NextFunction, Request, Response } from "express";
import createDebug from 'debug';
import { HTTPError } from "../../../common/error.js";
import IngredientCreator from "../../../Ingredients/application/ingredientcreator.js";
import IngredientDeleter from "../../../Ingredients/application/ingredientdeleter.js";
import IngredientFinder from "../../../Ingredients/application/ingredientfinder.js";
import IngredientFinderAll from "../../../Ingredients/application/ingredientfinderall.js";
import IngredientSearcher from "../../../Ingredients/application/ingredientsearcher.js";
import IngredientUpdater from "../../../Ingredients/application/ingredientupdater.js";
import Ingredient from "../../../Ingredients/domain/ingredient.model.js";

const debug = createDebug('CL-Store');


export class IngredientController {
  // eslint-disable-next-line max-params
  constructor(
    private ingredientCreator: IngredientCreator,
    private ingredientFinder: IngredientFinder,
    private ingredientFinderAll: IngredientFinderAll,
    private ingredientSearcher: IngredientSearcher,
    private ingredientUpdater: IngredientUpdater,
    private ingredientDeleter: IngredientDeleter,
  ) {
       debug('Ingredient controller instantiated');

}



 async createIngredient(req: Request, res: Response, next: NextFunction) {
  try {
   debug('createIngredient method called!')
    const { name, quantity } = req.body;
  
    if (!name || !quantity) {
      throw new Error("Required properties are missing in the request body");
    }

    const data = await this.ingredientCreator.execute(req.body);
    res.status(201).json({
      results: [data],
    });
  } catch (error) {
    next(error);
  }
}

 async findIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      debug('findIngredient method called');
      const { id } = req.params;
      const data = await this.ingredientFinder.execute(id);
      res.status(200);
      res.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async findAllIngredient(req: Request, res: Response, next: NextFunction) {
    try {
       debug('findAllIngredient method called');
       const response = await this.ingredientFinderAll.execute();
       res.status(200);
       res.json({ results: response });
    } catch (error) {
       next(error);
    }
  }

 async searchIngredient(req: Request, res: Response, next: NextFunction) {
  try {
    debug('searchIngredient method called');
    if (!req.body.ingredients || req.body.ingredients.length === 0) {
      throw new HTTPError(404, 'Missing ingredients', 'no ingredients');
    }

    const ingredientNames = req.body.ingredients.map((ingredient: Ingredient) => ingredient.name);
    const data = await this.ingredientSearcher.execute(ingredientNames);

    res.status(200);
    res.json({ results: data });
  } catch (error) {
    next(error);
  }
}



  async updateIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      debug('updateIngredient method called');
      const { id } = req.body;
      const { quantity } = req.body;

      const newIngredient = {
        id,
        ...quantity,
      };

      await this.ingredientUpdater.execute(id, newIngredient);

      res.status(200);
      res.json({ ok: true, message: 'Ingredient updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  async deleteIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      debug('deleteIngredient method called');
      const { id } = req.params;

      await this.ingredientDeleter.execute(id);

      res.status(200);
      res.json({ ok: true, message: 'Ingredient deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

}