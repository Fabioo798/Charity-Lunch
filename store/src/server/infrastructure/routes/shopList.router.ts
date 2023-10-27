import { Router } from "express";
import { ShopListController } from "../../application/controller/shopList.controller";
import ServerRouter from "../Server.router.interface";

export default class ShopListRouter implements ServerRouter {
 constructor(
  private controller: ShopListController

 ) {this.registerControllers();}

  path = '/shoplist';
  // eslint-disable-next-line new-cap
  router: Router = Router()


  registerControllers(): void {
   this.router.post('/new', this.controller.createShopList.bind(this.controller) );
   this.router.get('/shoplists' , this.controller.findAllShopList.bind(this.controller));
  }
 }