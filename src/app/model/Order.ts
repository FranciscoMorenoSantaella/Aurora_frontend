import { Client } from "./Client";
import { Product } from "./Product";
import { Shoppingcart } from "./shoppingcart";

/**
 * Es el objeto que tiene la relacion entre el carro de la compra y los productos y nos sirve para guardar cuanta cantidad de cada producto hay en cada carro de la compra
 */
export interface Order {
  id?:Number
  shoppingcart:Shoppingcart,
  product:Product,
  amount?:number
}