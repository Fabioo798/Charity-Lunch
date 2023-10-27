import ShopList from "../domain/shopList.model.js";
import ShopListRepo from "../domain/shopList.model.repo.js";

export default class ShopListFinderAll {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repository: ShopListRepo) {}

  async execute(): Promise<ShopList[]> {
    // eslint-disable-next-line no-return-await
    return await this.repository.findAll();
  }
}