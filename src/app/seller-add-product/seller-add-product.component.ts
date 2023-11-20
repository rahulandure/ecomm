import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{
  productMessage : string|undefined;
  constructor(private productService : ProductService) {}
  ngOnInit() {}

  submit(data : Product) {
    console.warn(data);
    this.productService.addProduct(data).subscribe(result => {
      if(result) {
        this.productMessage = "Product is added Successfully..."
      }
      console.warn(result);
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
