import { ShopListModel } from "../../server/domain/shoplist.schema.js";
import ShopList from "../domain/shopList.model.js";
import ShopListMongoRepo from "./shopList.mongo.repo.js";

jest.mock('../../server/domain/shopList.schema.js');

const mockModel = {
  create: jest.fn(),
  find: jest.fn(),
} as unknown as typeof ShopListModel;

const mockShopList = {
  id: '2',
  name: 'peperoni', 
  quantitySold: 1,
} as ShopList;

describe('Given the ShopListMongoRepo', () => {
  const repo = new ShopListMongoRepo(mockModel);

  describe('When it is called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(ShopListMongoRepo);
    });
  });

  

  describe('When create method is called', () => {
    test('Then it should create an ShopList', async () => {
      (mockModel.create as jest.Mock).mockResolvedValue(mockShopList);

      await repo.create(mockShopList);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
  
 
  describe('When findAll method is called', () => {
    test('Then it should find an Ingredient', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue(mockShopList);

      await repo.findAll();

      expect(mockModel.find).toHaveBeenCalled();
    });
  });

});