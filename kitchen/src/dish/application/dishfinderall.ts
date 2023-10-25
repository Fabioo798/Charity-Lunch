import Dish from "../domain/dish.model.js";
import DishRepo from "../domain/dish.model.repo.js";

export default class DishFinderAll {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: DishRepo) {}

  async execute(): Promise<Dish[]> {
    // eslint-disable-next-line no-return-await
    return await this.repository.findAll();
  }
}