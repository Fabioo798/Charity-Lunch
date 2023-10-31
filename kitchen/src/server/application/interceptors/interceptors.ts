import { NextFunction, Request, Response } from "express";
import { OrderState } from "../../../order/domain/order.model.js";
import { DishModel } from "../../domain/dish.schema.js";
import axios from "axios";
import Ingredient from "../../../ingredient/domain/ingredient.model.js";
import io from 'socket.io-client';
import OrderUpdater from "../../../order/application/orderupdater.js";
import createDebug from 'debug';



const socket = io('http://localhost:4800');
const debug = createDebug('CL-Kitchen');

export class Interceptors {
 constructor(
  private orderUpdater: OrderUpdater,
 ) {
  debug('interceptor instantiated')
 }
 
 async dishInterceptor(req: Request, res: Response, next: NextFunction) {
  try {
    const count = await DishModel.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const dishObjectId = await DishModel.findOne().skip(randomIndex);
    
    req.body.dish = dishObjectId;
    req.body.timeStamp = new Date().toUTCString()
    req.body.state = OrderState.InProgress;
    debug('random plate selected!')

    next();
  } catch (error) {
    debug('error on first interceptor')
    next(error);
  }
}

  async dishInfoInterceptor(req: Request, res: Response, next: NextFunction) {
  
    const { dish, orderData } = req.body;
    
    const ingredients: Ingredient[] = dish.ingredients.map((ingredient: Ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
    }));

    try {
      const response = await axios.patch('http://host.docker.internal:4900/ingredient/quantity', { ingredients });
      // Check the response status and update the order state accordingly
      if (response.status === 200) {
        debug('Ingredient sent!')
        socket.emit('orderStateChanged', { id: orderData.id, state: 'complete' });
        await this.orderUpdater.execute(orderData.id, { state: OrderState.Complete });
        debug('Order updated');
      } 

    } catch (error) {
      debug('Not enough ingredient');
      socket.emit('orderStateChanged', { id: orderData.id, state: 'not-enough-ingredient' });
      await this.orderUpdater.execute(orderData.id, { state: OrderState.NotEnoughIngredient });
      next();
    }
   }

   closeSocketConnection() {
    socket.close()
   }
}