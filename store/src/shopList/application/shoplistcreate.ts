/* eslint-disable no-return-await */

import ShopList from "../domain/shopList.model.js";
import ShopListRepo from "../domain/shopList.model.repo.js";


export default class ShopListCreator {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: ShopListRepo) {}

  async execute(shopList: ShopList): Promise<ShopList> {
    return await this.repository.create(shopList);
  }
}