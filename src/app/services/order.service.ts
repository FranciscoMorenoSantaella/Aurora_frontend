import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  endpoint: any = environment.endpoint + environment.apiOrder;
  constructor(private http:HttpClient) { }

  public async postOrder(order:Order) {
    await this.http.post(this.endpoint, order).toPromise();
  }

  
}
