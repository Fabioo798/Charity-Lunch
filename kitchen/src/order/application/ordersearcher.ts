import Order from "../domain/order.model.js";
import OrderRepo from "../domain/order.model.repo.js";

export default class OrderSearcher {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: OrderRepo) {}

  async execute(query: { key: string; value: unknown }): Promise<Order[]> {
    const response = await this.repository.search(query);
    return response;
  }
}
