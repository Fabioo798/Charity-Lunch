import DishRepo from "../domain/dish.model.repo.js";

export default class DishDeleter {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: DishRepo) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
