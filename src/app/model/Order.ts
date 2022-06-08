import { Client } from "./Client";
import { Product } from "./Product";
import { Shoppingcart } from "./shoppingcart";

export interface Order {
  id?:Number
  shoppingcart:Shoppingcart,
  product:Product,
  amount?:Number
}