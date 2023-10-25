import { Schema, model } from "mongoose";
import Ingredient from "../../Ingredients/domain/ingredient.model.js";


export const ingredientSchema = new Schema<Ingredient>({
 name: {
  type: String,
  required: true,
 },
 quantity: {
  type: Number,
  required: true
 }
})

ingredientSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const IngredientModel = model('Ingredient', ingredientSchema, 'ingredients');