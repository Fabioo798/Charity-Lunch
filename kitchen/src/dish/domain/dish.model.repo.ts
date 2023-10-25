import Dish from "./dish.model.js";

export default interface DishRepo {
 create: (dish: Dish) => Promise<void>;
 find: (id: string) => Promise<Dish>;
 findAll: () => Promise<Dish[]>;
 delete: (id: string) => Promise<void>;
}