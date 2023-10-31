import ShopList from "../domain/shopList.model.js";
import ShopListRepo from "../domain/shopList.model.repo.js";
import ShopListFinderAll from "./shopListFinderall.js";

const mockRepo = {
  findAll: jest.fn(),
} as unknown as ShopListRepo;

const mockShopList = {
  id: '2',
  name: 'peperoni', 
  quantitySold: 1,
} as ShopList;

describe('Given the ShopListCreator class', () => {
  const repo = new ShopListFinderAll(mockRepo);

  describe('when is it called', () => {
    test('Then it should be instantiated', () => {
      expect(repo).toBeInstanceOf(ShopListFinderAll);
    });
  });

  describe('When the method execute is called', () => {
    test('Then the create ShopList repo method should called', async () => {
      (mockRepo.findAll as jest.Mock).mockResolvedValue(mockShopList);

      await repo.execute();

      expect(mockRepo.findAll).toHaveBeenCalled();
    });
  });
});