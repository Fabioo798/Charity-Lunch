import Ingredient from "./ingredient.model.js";



export default interface IngredientRepo {
 create: (ingredient: Ingredient) => Promise<Ingredient>;
 update: (id: string, ingredient: Partial<Ingredient>) => Promise<void>;
 find: (id: string) => Promise<Ingredient>;
 findAll: () => Promise<Ingredient[]>;
 delete: (id: string) => Promise<void>;
 search: (ingredients: string[]) => Promise<Ingredient[]>;
}