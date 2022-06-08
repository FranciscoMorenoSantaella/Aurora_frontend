import { Image } from "./Image";
import { Order } from "./Order";

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