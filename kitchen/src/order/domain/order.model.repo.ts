import Order from "./order.model.js";

export default interface OrderRepo {
 create: (order: Order) => Promise<Order>;
 update: (user: Partial<Order>) => Promise<void>;
 find: (id: string) => Promise<Order>;
 findAll: () => Promise<Order[]>;
 delete: (id: string) => Promise<void>;
 search: (query: { key: string; value: unknown }) => Promise<Order[]>;
}