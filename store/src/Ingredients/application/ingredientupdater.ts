import Ingredient from "../domain/ingredient.model";
import IngredientRepo from "../domain/ingredient.model.repo";

export default class IngredientUpdater {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: IngredientRepo) {}

  async execute(ingredient: Partial<Ingredient>): Promise<void> {
    await this.repository.update(ingredient);
  }
}