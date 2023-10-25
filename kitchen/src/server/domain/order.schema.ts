import { Schema, model } from "mongoose";
import Order from "../../order/domain/order.model.js";


const orderSchema = new Schema<Order>({
 
 dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish',
    required: true,
    
  },
 timeStamp: {
      type: Date,
      required: true
 },
 state: {
   type: String,
   required: true
  }

});

orderSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const OrderModel = model('Order', orderSchema, 'orders')