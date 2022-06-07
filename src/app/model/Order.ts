import { Client } from "./Client";
import { Product } from "./Product";

export interface Order {
  client:Client,
  product:Product,
  amount?:Number
}