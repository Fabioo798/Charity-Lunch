/* eslint-disable no-await-in-loop */
import { Request, Response, NextFunction } from "express";
import Ingredient from "../../../Ingredients/domain/ingredient.model.js";
import IngredientSearcher from "../../../Ingredients/application/ingredientsearcher.js";
import axios from "axios";
import IngredientUpdater from "../../../Ingredients/application/ingredientupdater.js";
import { HTTPError } from "../../../common/error.js";
import ShopList from "../../../shopList/domain/shopList.model.js";
import ShopListCreator from "../../../shopList/application/shoplistcreator.js";
import createDebug from 'debug';


const debug = createDebug('CL-Store');

export class Interceptors {
 // eslint-disable-next-line no-useless-constructor
 constructor(
  private ingredientSearcher: IngredientSearcher,
  private ingredientUpdater: IngredientUpdater,
  private shopListCreator: ShopListCreator,
 ) {

 }

 async firstMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
   debug('First middleware called')
    let skipSecondAndThird: boolean;
    // eslint-disable-next-line prefer-destructuring
    const  ingredients  = req.body.ingredients;
    const missingIngredients: Ingredient[] = [];

    for (const ingredient of ingredients) {
      const [foundIngredient] = (await this.ingredientSearcher.execute(ingredient.name))
        .filter((item: Ingredient) => item.name === ingredient.name);
        const { id, name, quantity: currentQuantity } = foundIngredient;

        const requestedQuantity = ingredient.quantity;

      // Check guard for updating the quantity
      if (currentQuantity < requestedQuantity)
        missingIngredients.push({ id, name, quantity: requestedQuantity });
    }

    if (missingIngredients.length > 0) {
      // Call the next middleware to handle the API call for insufficient quantity
      skipSecondAndThird = false
      debug('Not enough ingredient')
      req.body.skip = skipSecondAndThird;
      req.body.missingIngredients = missingIngredients;
      return next();
    }
    
    debug("Enough ingredient");
    skipSecondAndThird = true;
    req.body.skip = skipSecondAndThird
    next();

  } catch (error) {
      debug('Error in the first middleware')
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.', error as Error));
    }
 }
 
  async secondMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
   debug('Second middleware called')
   const skipSecondAndThird = req.body.skip
   if(skipSecondAndThird === true){
    debug('Enough ingredient -> next()')
    next();
   }
   
    // eslint-disable-next-line prefer-destructuring
    const missingIngredients = req.body.missingIngredients;
  
    // Store the promises for each API request
    const promises = missingIngredients.map(async (ingredient: Ingredient) => {
      const response = await axios.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${ingredient.name.toLocaleLowerCase()}`);      
      
      await this.shopListCreator.execute({name: ingredient.name, quantitySold: response.data.quantitySold, timeStamp: new Date()} as ShopList);
      return {
       id: ingredient.id, 
       name: ingredient.name,
       quantity: response.data.quantitySold
      } as Ingredient;
    });
  
    const results = await Promise.all(promises);

    const hasZeroQuantity = results.some((ingredient: Ingredient) => ingredient.quantity === 0);

    if (hasZeroQuantity) {
      debug('Not enough ingredient from market!');
      return res.status(400).json({ message: "Not enough ingredients" });
    }

    // Pass the results to the next middleware or send the response as needed...
    req.body.results = results;
    return next();
  
  } catch (error) {
      debug('Second middleware error');
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.'));
    }
 }

 async thirdMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
   debug('third middleware called')
   const skipSecondAndThird = req.body.skip
   if(skipSecondAndThird === true){
    debug('enough ingredient')
    next();
   }

    const promises  = req.body.results;

    const updatePromises = promises.map(async (ingredient: Ingredient) => {
      await this.ingredientUpdater.execute(ingredient.id, {quantity: ingredient.quantity});
    });

    await Promise.all(updatePromises);
    debug('Ingredient updated')
    return next();
  } catch (error) {
     debug('Error in the third middleware')
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.', error as Error));
    }
}

  async fourthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Fourth middleware called')
      // eslint-disable-next-line prefer-destructuring
      const  ingredients: Ingredient[]  = req.body.ingredients;

     
      const promises = [];
        for (const ingredient of ingredients) {
        const ingredientInDbData = await this.ingredientSearcher.execute([ingredient.name]);
        const newQuantity = ingredientInDbData[0].quantity - ingredient.quantity;
        await this.ingredientUpdater.execute(ingredientInDbData[0].id, { quantity: newQuantity });
        promises.push(ingredient);
       }

      await Promise.all(promises);
      debug('Process completed, ingredients updated')
      return res.status(200).json({ message: `The Ingredients ${ingredients} updated successfully` });
    } catch (error) {
      debug('Error in the fourth middleware');
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.', error as Error));
    }
}
}