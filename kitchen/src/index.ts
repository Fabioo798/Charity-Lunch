import DishCreator from "./dish/application/dishcreator.js";
import DishDeleter from "./dish/application/dishdeleter.js";
import DishFinder from "./dish/application/dishfinder.js";
import DishFinderAll from "./dish/application/dishfinderall.js";
import DishMongoRepo from "./dish/infrastructure/dish.mongo.repo.js";
import OrderCreator from "./order/application/ordercreator.js";
import OrderDeleter from "./order/application/orderdeleter.js";
import OrderFinder from "./order/application/orderfinder.js";
import OrderFinderAll from "./order/application/orderfinderall.js";
import OrderSearcher from "./order/application/ordersearcher.js";
import OrderUpdater from "./order/application/orderupdater.js";
import OrderMongoRepo from "./order/infrastructure/order.mongo.repo.js";
import { DishController } from "./server/application/controller/dish.controller.js";
import { OrderController } from "./server/application/controller/order.controller.js";
import { DishModel } from "./server/domain/dish.schema.js";
import { OrderModel } from "./server/domain/order.schema.js";
import ExpressServer from "./server/infrastructure/express.server.js";
import DishRouter from "./server/infrastructure/routers/dish.router.js";
import OrderRouter from "./server/infrastructure/routers/order.router.js";


const bootstrap = async () => {

  const dishRepository = new DishMongoRepo(DishModel);

  const dishFinders = new DishFinder(dishRepository);
  const dishFinderAll = new DishFinderAll(dishRepository);
  const dishCreator = new DishCreator(dishRepository);
  const dishDeleter = new DishDeleter(dishRepository);
  const dishController = new DishController(
    dishCreator,
    dishFinders,
    dishFinderAll,
    dishDeleter
  );

  const dishRouter = new DishRouter(dishController);

 const orderRepository = new OrderMongoRepo(OrderModel);

  const orderSearcher = new OrderSearcher(orderRepository);
  const orderFinders = new OrderFinder(orderRepository);
  const orderFinderAll = new OrderFinderAll(orderRepository);
  const orderCreator = new OrderCreator(orderRepository);
  const orderUpdater = new OrderUpdater(orderRepository);
  const orderDeleter = new OrderDeleter(orderRepository);
  const orderController = new OrderController(
    orderCreator,
    orderFinders,
    orderFinderAll,
    orderSearcher,
    orderUpdater,
    orderDeleter,
  );

  const orderRouter = new OrderRouter(orderController);

 


 const server = new ExpressServer([orderRouter, dishRouter]);

  server.start(4800);
};

bootstrap();