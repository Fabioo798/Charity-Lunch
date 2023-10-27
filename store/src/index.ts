import IngredientCreator from "./Ingredients/application/ingredientcreator.js";
import IngredientDeleter from "./Ingredients/application/ingredientdeleter.js";
import IngredientFinder from "./Ingredients/application/ingredientfinder.js";
import IngredientFinderAll from "./Ingredients/application/ingredientfinderall.js";
import IngredientSearcher from "./Ingredients/application/ingredientsearcher.js";
import IngredientUpdater from "./Ingredients/application/ingredientupdater.js";
import IngredientMongoRepo from "./Ingredients/infrastructure/ingredient.mongo.repo.js"
import { IngredientController } from "./server/application/controller/ingredient.controller.js";
import { IngredientModel } from "./server/domain/ingredient.schema.js"
import ExpressServer from "./server/infrstructure/express.server.js";
import IngredientRouter from "./server/infrstructure/routes/ingredient.router.js";


const bootstrap = async () => {

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

  const ingredientRouter = new IngredientRouter(ingredientSearcher, ingredientUpdater, ingredientController );

  const server = new ExpressServer([ingredientRouter]);

  server.start(4900);
};

bootstrap();