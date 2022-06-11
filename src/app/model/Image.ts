/**
 * Objeto que tiene todos los datos de la imagen
 * su nombre original un nombre unico la url que es la carpeta en la que esta guardada y el id del producto a la que esta asociada la imagen
 */
export interface Image {
  id: number,
  originalname: String,
  uniquename:String,
  url:String,
  product_id:Number
}