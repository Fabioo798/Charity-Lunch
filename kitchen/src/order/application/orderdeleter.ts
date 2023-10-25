import OrderRepo from "../domain/order.model.repo.js";

export default class OrderDeleter {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: OrderRepo) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}