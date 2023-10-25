import { Schema, model } from "mongoose";
import Dish from "../../dish/domain/dish.model.js";


export const dishSchema = new Schema<Dish>({
 name: {
   type: String,
   required: true
 },
 ingredients: [{
  _id: false,
   name: {
    type: String,
    required: true
   },
   quantity: {
    type: Number,
    required: true
   }

 }],
})

dishSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const DishModel = model('Dish', dishSchema, 'dishes')