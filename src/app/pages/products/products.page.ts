import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ImageService } from 'src/app/services/image.service';
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
  urllist:Promise<String[]>;
  imagelist:Image[];
  constructor(private productservice:ProductService, private router:Router, private storage:StorageService, private imageservice:ImageService) { }

  async ngOnInit() {
    await this.getProducts();
    await this.getImgByProductId();
   
  }

  async getProducts(){
    this.productlist = await this.productservice.getProductsByPage(this.page,10);
  }

  async getImgByProductId(){
        for(let i:number = 0; this.productlist.length > i; i++){
        this.imagelist = await this.imageservice.getImgByProductId(this.productlist[i].id);
        console.log(this.imagelist);
      }
   
      
 
  }

  goToProduct(product:Product){
    this.storage.set('product',product);
    this.router.navigate(['product']);
  }

}
