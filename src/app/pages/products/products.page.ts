import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  page:number =0;
  productlist:Product[];
  constructor(private productservice:ProductService, private router:Router, private storage:StorageService) { }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts(){
    this.productlist = await this.productservice.getProductsByPage(this.page,10);
  }

  goToProduct(product:Product){
    this.storage.set('product',product);
    this.router.navigate(['product']);
  }

}
