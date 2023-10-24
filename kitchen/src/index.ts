import OrderCreator from "./order/application/ordercreator.js";
import OrderDeleter from "./order/application/orderdeleter.js";
import OrderFinder from "./order/application/orderfinder.js";
import OrderSearcher from "./order/application/ordersearcher.js";
import OrderUpdater from "./order/application/orderupdater.js";
import OrderMongoRepo from "./order/infrastructure/order.mongo.repo.js";
import { OrderController } from "./server/application/controller/order.controller.js";
import { OrderModel } from "./server/domain/order.schema.js";
import ExpressServer from "./server/infrastructure/express.server.js";
import OrderRouter from "./server/infrastructure/routers/order.router.js";


const bootstrap = async () => {

 const orderRepository = new OrderMongoRepo(OrderModel);

  const orderSearcher = new OrderSearcher(orderRepository);
  const orderFinders = new OrderFinder(orderRepository);
  const orderCreator = new OrderCreator(orderRepository);
  const orderUpdater = new OrderUpdater(orderRepository);
  const orderDeleter = new OrderDeleter(orderRepository);
  const orderController = new OrderController(
    orderCreator,
    orderFinders,
    orderSearcher,
    orderUpdater,
    orderDeleter
  );

  const orderRouter = new OrderRouter(orderController);

 const server = new ExpressServer([orderRouter]);

  server.start(4800);
};

bootstrap();