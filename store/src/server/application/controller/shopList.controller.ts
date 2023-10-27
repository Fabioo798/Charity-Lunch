import { NextFunction, Request, Response } from "express";
import createDebug from 'debug';
import ShopListCreator from "../../../shopList/application/shopListCreator.js";
import ShopListFinderAll from "../../../shopList/application/shopListFinderAll.js";

const debug = createDebug('CL: ShopList controller');


export class ShopListController {
  constructor(
    private shopListCreator: ShopListCreator,
    private shopListFinderAll: ShopListFinderAll,
  ) {
       debug('ShopList controller instantiated');

}

 async createShopList(req: Request, res: Response, next: NextFunction) {
  try {
     
    const data = await this.shopListCreator.execute(req.body);
    res.status(201).json({
      results: [data],
    });
  } catch (error) {
    next(error);
  }
}


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAllShopList(req: Request, res: Response, _next: NextFunction) {
    debug('findShopList');
    const response = await this.shopListFinderAll.execute();

    res.status(200);
    res.json({ results: response });
  }

 
}
 

