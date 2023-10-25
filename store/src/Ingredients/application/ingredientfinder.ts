import Ingredient from "../domain/ingredient.model";
import IngredientRepo from "../domain/ingredient.model.repo";

export default class IngredientFinder {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: IngredientRepo) {}

  async execute(id: string): Promise<Ingredient> {
    // eslint-disable-next-line no-return-await
    return await (this.repository.find(id));
  }
}