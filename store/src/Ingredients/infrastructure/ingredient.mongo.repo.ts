import { IngredientModel } from "../../server/domain/ingredient.schema.js";
import Ingredient from "../domain/ingredient.model.js";
import IngredientRepo from "../domain/ingredient.model.repo.js";

export default class IngredientMongoRepo implements IngredientRepo {
  private ingredientModel: typeof IngredientModel;

  constructor(ingredientModel: typeof IngredientModel) {
    this.ingredientModel = ingredientModel;
  }

  async create(Ingredient: Ingredient): Promise<Ingredient> {
    const response = await this.ingredientModel.create(Ingredient)
    return response as Ingredient;
  }

  async update(Ingredient: Partial<Ingredient>): Promise<void> {
    await this.ingredientModel.findByIdAndUpdate(Ingredient.id, Ingredient);
  }

  async find(id: string): Promise<Ingredient> {
    const response = await this.ingredientModel.findById(id)
    return response as Ingredient;
  }

  async findAll(): Promise<Ingredient[]> {
    const response = await this.ingredientModel.find();
    return response;
  }

  async delete(id: string): Promise<void> {
    await this.ingredientModel.findByIdAndDelete(id);
  }

  async search(ingredients: string[]): Promise<Ingredient[]> {
    const response = await this.ingredientModel.find({ name: { $in: ingredients } });

    return response;
  }

  
}