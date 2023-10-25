/* eslint-disable no-useless-constructor */
import Ingredient from "../../ingredient/domain/ingredient.model.js";

export default class Dish {
 
 constructor(
  public id: string,
  public name: string,
  public ingredients: Ingredient[]
 ) {}
}