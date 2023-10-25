/* eslint-disable no-return-await */

import Ingredient from "../domain/ingredient.model.js";
import IngredientRepo from "../domain/ingredient.model.repo.js";

export default class IngredientCreator {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: IngredientRepo) {}

  async execute(ingredient: Ingredient): Promise<Ingredient> {
    return await this.repository.create(ingredient);
  }
}