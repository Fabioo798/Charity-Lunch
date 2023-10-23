import { Schema, SchemaTypes, model } from "mongoose";
import Order from "../../order/domain/order.model";


const orderSchema = new Schema<Order>({
 
 dish: {
  type: SchemaTypes.ObjectId,
  ref: 'Dish'
 },
 timestamp: {
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