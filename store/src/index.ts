import IngredientCreator from "./Ingredients/application/ingredientcreator.js";
import IngredientDeleter from "./Ingredients/application/ingredientdeleter.js";
import IngredientFinder from "./Ingredients/application/ingredientfinder.js";
import IngredientFinderAll from "./Ingredients/application/ingredientfinderall.js";
import IngredientSearcher from "./Ingredients/application/ingredientsearcher.js";
import IngredientUpdater from "./Ingredients/application/ingredientupdater.js";
import IngredientMongoRepo from "./Ingredients/infrastructure/ingredient.mongo.repo.js"
import { IngredientController } from "./server/application/controller/ingredient.controller.js";
import { ShopListController } from "./server/application/controller/shopList.controller.js";
import { IngredientModel } from "./server/domain/ingredient.schema.js"
import { ShopListModel } from "./server/domain/shoplist.schema.js";
import ExpressServer from "./server/infrastructure/express.server.js";
import IngredientRouter from "./server/infrastructure/routes/ingredient.router.js";
import ShopListRouter from "./server/infrastructure/routes/shopList.router.js";
import ShopListCreator from "./shopList/application/shopListCreator.js";
import ShopListFinderAll from "./shopList/application/shopListFinderAll.js";
import ShopListMongoRepo from "./shopList/infrastructure/shopList.mongo.repo.js";


const bootstrap = async () => {

 const shopListRepository = new ShopListMongoRepo(ShopListModel);

   const shopListCreator = new ShopListCreator(shopListRepository);
   const shopListFinderAll = new ShopListFinderAll(shopListRepository);
   const shopListController = new ShopListController(shopListCreator, shopListFinderAll)
 const shopListRouter = new ShopListRouter( shopListController)

 const ingredientRepository = new IngredientMongoRepo(IngredientModel);

 const ingredientSearcher = new IngredientSearcher(ingredientRepository);
  const ingredientFinders = new IngredientFinder(ingredientRepository);
  const ingredientFinderAll = new IngredientFinderAll(ingredientRepository);
  const ingredientCreator = new IngredientCreator(ingredientRepository);
  const ingredientUpdater = new IngredientUpdater(ingredientRepository);
  const ingredientDeleter = new IngredientDeleter(ingredientRepository);
  const ingredientController = new IngredientController(
    ingredientCreator,
    ingredientFinders,
    ingredientFinderAll,
    ingredientSearcher,
    ingredientUpdater,
    ingredientDeleter,
  );

  const ingredientRouter = new IngredientRouter(ingredientSearcher, ingredientUpdater,  shopListCreator, ingredientController, shopListController);

  const server = new ExpressServer([ingredientRouter, shopListRouter]);

  server.start(4900);
};

bootstrap();