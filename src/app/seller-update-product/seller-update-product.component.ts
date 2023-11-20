import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData : undefined | Product
  updateMessage : undefined | string

  constructor(private route : ActivatedRoute, private productService : ProductService) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe(data => {
      console.warn(data);
      this.productData = data;
    })
  }

  submit(data : any) {
    if(this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe(result => {
      if(result) {
        this.updateMessage = "Product Updted Successfully!"
      }
    })
    setTimeout(() => {
      this.updateMessage = undefined;
    }, 3000);
  }
}
