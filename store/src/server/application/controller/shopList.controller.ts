import { NextFunction, Request, Response } from "express";
import createDebug from 'debug';
import ShopListCreator from "../../../shopList/application/shoplistcreator.js";
import ShopListFinderAll from "../../../shopList/application/shoplistfinderall.js";

const debug = createDebug('CL-Store');


export class ShopListController {
  constructor(
    private shopListCreator: ShopListCreator,
    private shopListFinderAll: ShopListFinderAll,
  ) {
       debug('ShopList controller instantiated');

}

 async createShopList(req: Request, res: Response, next: NextFunction) {
  try {
     debug('createShopList method called')
    const data = await this.shopListCreator.execute(req.body);
    res.status(201).json({
      results: [data],
    });
  } catch (error) {
    next(error);
  }
}


  async findAllShopList(req: Request, res: Response, next: NextFunction) {
    
   try {
   debug('findShopList method called');
      const response = await this.shopListFinderAll.execute();

      res.status(200);
      res.json({ results: response });
    } catch (error) {
      next(error);
   }
  }

 
}
 