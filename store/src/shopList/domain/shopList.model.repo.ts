import ShopList from "./shopList.model.js";



export default interface ShopListRepo {
 create: (shopList: ShopList) => Promise<ShopList>;
 findAll: () => Promise<ShopList[]>;
}