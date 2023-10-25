import Order from "../domain/order.model.js";
import OrderRepo from "../domain/order.model.repo.js";

export default class OrderFinderAll {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: OrderRepo) {}

  async execute(): Promise<Order[]> {
    // eslint-disable-next-line no-return-await
    return await this.repository.findAll();
  }
}