import { ShopListModel } from "../../server/domain/shoplist.schema.js";
import ShopList from "../domain/shopList.model.js";
import ShopListRepo from "../domain/shopList.model.repo.js";

export default class ShopListMongoRepo implements ShopListRepo {
  private shopListModel: typeof ShopListModel;

  constructor(shopListModel: typeof ShopListModel) {
    this.shopListModel = shopListModel;
  }

  async create(shopList: ShopList): Promise<ShopList> {
    const response = await this.shopListModel.create(shopList)
    return response as ShopList;
  }

  async findAll(): Promise<ShopList[]> {
    const response = await this.shopListModel.find();
    return response;
  }
  
}