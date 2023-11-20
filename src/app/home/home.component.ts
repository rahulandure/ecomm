import { Component, OnInit } from '@angular/core';
import { Cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  popularProducts : undefined | Product[]
  trendyProducts : undefined | Product[]
  cartData : Cart | undefined;

  constructor(private productService : ProductService) {}
  ngOnInit() {
    this.productService.popularProduct().subscribe(result => {
      this.popularProducts = result;
    });

    this.productService.trendyProduct().subscribe(data => {
      this.trendyProducts = data;
    })
  }
}
