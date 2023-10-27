import IngredientRepo from "../domain/ingredient.model.repo.js";

export default class IngredientDeleter {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: IngredientRepo) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}