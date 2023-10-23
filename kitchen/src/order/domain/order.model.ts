/* eslint-disable no-useless-constructor */

import Dish from "../../dish/domain/dish.model";

export enum OrderState {
  InProgress = "in-progress",
  Complete = "complete",
  NotEnoughIngredient = "not-enough-ingredient",
}

export default class Order {
 constructor(
  public id: string,
  public dish: Dish,
  public timestamp: Date,
  public state: OrderState
 ) {}
} 