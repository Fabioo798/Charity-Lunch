import { Schema, model } from "mongoose";
import ShopList from "../../shopList/domain/shopList.model";

export const shopListSchema = new Schema<ShopList>({

  name: {
  type: String,
  required: true,
 },
  quantitySold: {
   type: Number,
   required: true,
  },
  timeStamp: {
      type: Date,
      required: true
 },
})  

shopListSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const ShopListModel = model('ShopList', shopListSchema, 'shopLists')