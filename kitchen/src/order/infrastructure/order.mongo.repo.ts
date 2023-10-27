import { OrderModel } from "../../server/domain/order.schema.js";
import Order from "../domain/order.model.js";
import OrderRepo from "../domain/order.model.repo.js";

export default class OrderMongoRepo implements OrderRepo {
  private orderModel: typeof OrderModel;

  constructor(orderModel: typeof OrderModel) {
    this.orderModel = orderModel;
  }

  async create(Order: Order): Promise<Order> {
    const response = await this.orderModel.create(Order)
    return response as Order;
  }

  async update(id: string, Order: Partial<Order>): Promise<void> {
    await this.orderModel.findByIdAndUpdate(id, Order);
  }

  async find(id: string): Promise<Order> {
    const response = await this.orderModel
      .findById(id)
      .populate('dish');
    return response as Order;
  }

  async findAll(): Promise<Order[]> {
    const response = await this.orderModel.find().populate('dish', 'name ingredients')
    return response;
  }

  async delete(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id);
  }

  async search(query: { key: string; value: unknown }): Promise<Order[]> {
    const response = await this.orderModel.find({ [query.key]: query.value });

    return response;
  }
}