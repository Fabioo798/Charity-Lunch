import ShopList from "../domain/shopList.model.js";
import ShopListRepo from "../domain/shopList.model.repo.js";
import ShopListCreator from "./shoplistcreate.js";

const mockRepo = {
  create: jest.fn(),
} as unknown as ShopListRepo;

const mockShopList = {
  id: '2',
  name: 'peperoni', 
  quantitySold: 1,
} as ShopList;

describe('Given the ShopListCreator class', () => {
  const repo = new ShopListCreator(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(ShopListCreator);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create ShopList repo method should called', async () => {
      (mockRepo.create as jest.Mock).mockResolvedValue(mockShopList);

      await repo.execute(mockShopList);

      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
});