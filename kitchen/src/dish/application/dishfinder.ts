import Dish from "../domain/dish.model.js";
import DishRepo from "../domain/dish.model.repo.js";

export default class DishFinder {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: DishRepo) {}

  async execute(id: string): Promise<Dish> {
    // eslint-disable-next-line no-return-await
    return await (this.repository.find(id));
  }
}
