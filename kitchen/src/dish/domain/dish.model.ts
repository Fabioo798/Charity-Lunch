/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Ingredient from "../../ingredient/domain/ingredient.model";

export default class Dish {
 
 constructor(
  id: string,
  name: string,
  ingredients: Ingredient[]
 ) {}
}

