/* eslint-disable no-await-in-loop */
import { Request, Response, NextFunction } from "express";
import Ingredient from "../../../Ingredients/domain/ingredient.model.js";
import IngredientSearcher from "../../../Ingredients/application/ingredientsearcher.js";
import axios from "axios";
import IngredientUpdater from "../../../Ingredients/application/ingredientupdater.js";
import { HTTPError } from "../../../common/error.js";
import ShopList from "../../../shopList/domain/shopList.model.js";
import ShopListCreator from "../../../shopList/application/shopListCreator.js";


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
    let skipSecondAndThird: boolean;
    // eslint-disable-next-line prefer-destructuring
    const  ingredients  = req.body.ingredients;
    console.log('INGREDIENT IN THE BODY' , ingredients)
    const missingIngredients: Ingredient[] = [];
    const availableIngredients: Ingredient[] = [];

    for (const ingredient of ingredients) {
      const [foundIngredient] = (await this.ingredientSearcher.execute(ingredient.name))
        .filter((item: Ingredient) => item.name === ingredient.name);
        const { id, name, quantity: currentQuantity } = foundIngredient;

        const requestedQuantity = ingredient.quantity;

      // Check guard for updating the quantity
      if (currentQuantity < requestedQuantity) {
        missingIngredients.push({ id, name, quantity: requestedQuantity });
      } else {
        availableIngredients.push({ id, name, quantity: requestedQuantity });
      }
    }

    if (missingIngredients.length > 0) {
      // Call the next middleware to handle the API call for insufficient quantity
      skipSecondAndThird = false
      console.log("FIRST MIDDLWARE - NOT ENOUGH INGRED.")
      req.body.skip = skipSecondAndThird;
      req.body.missingIngredients = missingIngredients;
      return next();
    }
    
    console.log("FIRST MIDDLWARE - ENOUGH INGR");

    skipSecondAndThird = true;
    req.body.skip = skipSecondAndThird
    console.log('CLG DE REQ' , req.body.skip)
    next();

  } catch (error) {
      console.log('PRIMO MIDL ERROR!');
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.', error as Error));
    }
 }
 
  async secondMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
   const skipSecondAndThird = req.body.skip
   if(skipSecondAndThird === true){
    console.log('SECOND MID - ENOUGH ING');
    next();
   }
   
   console.log('SECOND MID - NOT ENOUGH INGR')
    // eslint-disable-next-line prefer-destructuring
    const missingIngredients = req.body.missingIngredients;
  
    // Store the promises for each API request
    const promises = missingIngredients.map(async (ingredient: Ingredient) => {
      const response = await axios.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${ingredient.name.toLocaleLowerCase()}`);
      console.log('ALEGRA API', response.data);
      
      // eslint-disable-next-line no-debugger
      debugger;
      
      await this.shopListCreator.execute({name: ingredient.name, quantitySold: response.data.quantitySold, timeStamp: new Date()} as ShopList);
      return {
       id: ingredient.id, 
       name: ingredient.name,
       quantity: response.data.quantitySold
      } as Ingredient;
    });
  
    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    const hasZeroQuantity = results.some((ingredient: Ingredient) => ingredient.quantity === 0);

    if (hasZeroQuantity) {
      return res.status(400).json({ message: "Not enough ingredients" });
    }

    // Pass the results to the next middleware or send the response as needed...
    req.body.results = results;
    console.log('SECOND MID - ALEGRA FETCH SUCCESS' + results)
    return next();
  
  } catch (error) {
      console.log('SECONDO MIDL ERROR!');
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.'));
    }
 }

 async thirdMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
   const skipSecondAndThird = req.body.skip
   if(skipSecondAndThird === true){
    console.log('THIRD MIDDL - ENOUGH INGR')
    next();
   }

    const promises  = req.body.results;

    // Store the promises for updating the quantities in the database
    const updatePromises = promises.map(async (ingredient: Ingredient) => {
      // Call the updateIngredient method to update the specific ingredient
      await this.ingredientUpdater.execute(ingredient.id, {quantity: ingredient.quantity});
    });

    // Wait for all promises to resolve
    await Promise.all(updatePromises);
     console.log('THIRD MIDL - ALL INGRED UPDATED');
    // Call the next middleware or send the response accordingly
    return next();
  } catch (error) {
      console.log('TERZO MIDL ERROR!');
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.', error as Error));
    }
}

  async fourthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      // eslint-disable-next-line prefer-destructuring
      const  ingredients: Ingredient[]  = req.body.ingredients;
     console.log('4 MIDLW INGRED', ingredients)

     
      const promises = [];
        for (const ingredient of ingredients) {
        const ingredientInDbData = await this.ingredientSearcher.execute([ingredient.name]);
        const newQuantity = ingredientInDbData[0].quantity - ingredient.quantity;
        await this.ingredientUpdater.execute(ingredientInDbData[0].id, { quantity: newQuantity });
        console.log('INGREDIENTUPDATE EXECUTED');
        promises.push(ingredient);
}

      await Promise.all(promises);
      console.log("PROCESS COMPLETED SUCCESFULLY")
      return res.status(200).json({ message: `The Ingredients ${ingredients} updated successfully` });
    } catch (error) {
      console.log('QUARTO MIDL ERROR!');
      next(new HTTPError(500, 'Internal Server Error', 'Something went wrong.', error as Error));
    }
}
}