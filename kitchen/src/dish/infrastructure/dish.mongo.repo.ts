import { DishModel } from "../../server/domain/dish.schema.js";
import Dish from "../domain/dish.model.js";
import DishRepo from "../domain/dish.model.repo.js";

export default class DishMongoRepo implements DishRepo {
  private dishModel: typeof DishModel;

  constructor(dishModel: typeof DishModel) {
    this.dishModel = dishModel;
  }

  async create(dish: Dish): Promise<void> {
    await this.dishModel.create(dish);
  }

  async find(id: string): Promise<Dish> {
    const response = await this.dishModel
      .findById(id);
    return response as Dish;
  }

  async findAll(): Promise<Dish[]> {
    const response = await this.dishModel.find().populate('ingredients');
    return response;
  }

  async delete(id: string): Promise<void> {
    await this.dishModel.findByIdAndDelete(id);
  }
}
