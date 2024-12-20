import Order from "../domain/order.model.js";
import OrderRepo from "../domain/order.model.repo.js";

export default class OrderUpdater {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: OrderRepo) {}

  async execute(id: string, order: Partial<Order>): Promise<void> {
    await this.repository.update(id, order);
  }
}