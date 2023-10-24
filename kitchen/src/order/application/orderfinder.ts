import Order from "../domain/order.model.js";
import OrderRepo from "../domain/order.model.repo.js";

export default class OrderFinder {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: OrderRepo) {}

  async execute(id: string): Promise<Order> {
    // eslint-disable-next-line no-return-await
    return await (this.repository.find(id));
  }
}
