import Ingredient from "../domain/ingredient.model.js";
import IngredientRepo from "../domain/ingredient.model.repo.js";

export default class IngredientSearcher {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: IngredientRepo) {}

  async execute(ingredients: string[]): Promise<Ingredient[]> {
    const response = await this.repository.search(ingredients);
    return response;
  }
}