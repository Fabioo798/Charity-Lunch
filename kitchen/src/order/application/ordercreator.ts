import Order from "../domain/order.model.js";
import OrderRepo from "../domain/order.model.repo.js";

export default class OrderCreator {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: OrderRepo) {}

  async execute(user: Order): Promise<void> {
    await this.repository.create(user);
  }
}
