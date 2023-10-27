/* eslint-disable no-useless-constructor */


export default class ShopList {

 constructor (
  public name: string,
  public quantitySold: number,
  public timeStamp: Date,
  public id?: string,

 ) {}
}