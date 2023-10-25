import Dish from "../domain/dish.model.js";
import DishRepo from "../domain/dish.model.repo.js";

export default class DishCreator {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: DishRepo) {}

  async execute(dish: Dish): Promise<void> {
    await this.repository.create(dish);
  }
}