/* eslint-disable no-return-await */
import Order from "../domain/order.model.js";
import OrderRepo from "../domain/order.model.repo.js";

export default class OrderCreator {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: OrderRepo) {}

  async execute(order: Order): Promise<Order> {
    return await this.repository.create(order);
  }
}
