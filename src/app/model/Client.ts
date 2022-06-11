/**
 * Es el objeto que va a ser el usuario con todos los datos que normalmente tendria un usuario en cualquier app
 * y su saldo dentro de la app.
 */
export interface Client {
  id: number,
  name: String,
  email:String,
  surname?: String,
  phonenumber?:String,
  balance?:number,
  uid:String
}