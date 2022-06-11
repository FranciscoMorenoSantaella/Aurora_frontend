import { Image } from "./Image";
import { Order } from "./Order";

/**
 * Este objeto es un producto tiene con lo que vale el producto y su stock tambien tiene el tipo de producto para poder filtrarlo
 */
export interface Product {
  id: number,
  creation_date?:any,
  name:String,
  price?:number,
  stock?:number,
  type:String,
  admin_id:number,
  url:String,
  orderlist?:Order[],
  imagelist?:Image,
}