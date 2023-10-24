import { Schema, model } from "mongoose";
import Dish from "../../dish/domain/dish.model.js";


const dishSchema = new Schema<Dish>({
 name: {
   type: String,
   required: true
 },
 ingredient: {
   type: Schema.ObjectId,
   ref: 'Ingredient'
 },
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