import { NextFunction, Request, Response } from "express";
import createDebug from 'debug';
import DishCreator from "../../../dish/application/dishcreator.js";
import DishDeleter from "../../../dish/application/dishdeleter.js";
import DishFinderAll from "../../../dish/application/dishfinderall.js";
import DishFinder from "../../../dish/application/dishfinder.js";

const debug = createDebug('WOF: user controller');


export class DishController {
  constructor(
    private dishCreator: DishCreator,
    private dishFinder: DishFinder,
    private dishFinderAll: DishFinderAll,
    private dishDeleter: DishDeleter
  ) {
       debug('Dish controller instantiated');

}



 async createDish(req: Request, res: Response, next: NextFunction) {
   try {
    const { body } = req
   if(
    !req.body.name || 
    !req.body.ingredients)
   throw new Error;


    const data = await this.dishCreator.execute(body);

     res.status(201);
      res.json({
        results: [data],
      });
   } catch (error) {
     next(error);
   }
 }

 async findDish(req: Request, res: Response, next: NextFunction) {
    try {
      debug('findDish');
      const { id } = req.params;
      const data = await this.dishFinder.execute(id);

      res.status(200);
      res.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAllDish(req: Request, res: Response, _next: NextFunction) {
    debug('findUser');
    const response = await this.dishFinderAll.execute();

    res.status(200);
    res.json({ results: response });
  }

  async deleteDish(req: Request, res: Response, next: NextFunction) {
    try {
      debug('deleteDish');
      const { id } = req.params;

      await this.dishDeleter.execute(id);

      res.status(200);
      res.json({ ok: true, message: 'Order deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

}