import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, PriceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cartData : Cart[] | undefined
  priceSummary : PriceSummary = {
    price : 0,
    discount : 0,
    tax : 0,
    total : 0,
    delivery : 0
  }
  constructor(private productService : ProductService, private router : Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId : number | undefined) {
    cartId && this.cartData && this.productService.removeToCart(cartId)
    .subscribe(result => {
      this.loadDetails();
    })
  }

  loadDetails() {
    this.productService.currentCart().subscribe(result => {
      this.cartData = result;
      let price = 0;
      let charge = 100;
      result.forEach((item) => {
        if(item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/10;
      this.priceSummary.delivery = charge;
      this.priceSummary.total = price + (price/10) + 100 - (price/10);

      if(!this.cartData.length) {
        this.router.navigate(['/']);
      }
    })
  }

  checkOut() {
    this.router.navigate(['/checkout']);
  }
}
