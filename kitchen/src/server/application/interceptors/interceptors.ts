import { NextFunction, Request, Response } from "express";
import { OrderState } from "../../../order/domain/order.model.js";
import { DishModel } from "../../domain/dish.schema.js";
import axios from "axios";
import Ingredient from "../../../ingredient/domain/ingredient.model.js";
import io from 'socket.io-client';
import OrderUpdater from "../../../order/application/orderupdater.js";


const socket = io('http://localhost:4800');

export class Interceptors {
 // eslint-disable-next-line no-useless-constructor
 constructor(
  private orderUpdater: OrderUpdater,
 ) {

 }
 
 async dishInterceptor(req: Request, res: Response, next: NextFunction) {
  try {
    const count = await DishModel.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const dishObjectId = await DishModel.findOne().skip(randomIndex);
    
    req.body.dish = dishObjectId;
    req.body.timeStamp = new Date().toUTCString()
    req.body.state = OrderState.InProgress;
    console.log('dish interceptor pass');

    next();
  } catch (error) {
    next(error);
  }
}

  async dishInfoInterceptor(req: Request, res: Response, next: NextFunction) {
  
    const { dish, orderData } = req.body;
    console.log('INFORMAZIONI PIATTO', dish);
    console.log('INFORMAZIONI ORDINE', orderData);
    
    const ingredients: Ingredient[] = dish.ingredients.map((ingredient: Ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
    }));
    console.log('INFRO ARRAY INGREDI', ingredients)

    try {
      const response = await axios.patch('http://localhost:4900/ingredient/quantity', { ingredients });
      // Check the response status and update the order state accordingly
      if (response.status === 200) {
        console.log('Ingredient sent!');
        socket.emit('orderStateChanged', { id: orderData.id, state: 'complete' });
        await this.orderUpdater.execute(orderData.id, { state: OrderState.Complete });
        console.log('AFTER ORDER UPDATE');
      } 
    } catch (error) {
      console.log('Not enough ingredient');
      socket.emit('orderStateChanged', { id: orderData.id, state: 'not-enough-ingredient' });
      await this.orderUpdater.execute(orderData.id, { state: OrderState.NotEnoughIngredient });
      next();
    }
}
}