import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType : string = "default";
  sellerName : string = '';
  userName : string ='';
  searchResult : undefined | Product[]
  cartItems = 0;
  constructor(private router: Router, private productService : ProductService) { }
  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStorage = localStorage.getItem('seller');
          let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];
          this.sellerName = sellerData.name;
          this.menuType = "seller"
        } else if (localStorage.getItem('user')) {
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          this.userName = userData.name;
          this.menuType = "user";
          this.productService.getCartList(userData.id);
        }
        else {
          this.menuType = "default"
        }
      }
    })

    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe(items => {
      this.cartItems = items.length;
    })
  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
  }

  searchProduct(query : KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe(result => {
        if(result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id : number) {
    this.router.navigate(['/details/'+id]);
  }

  submitSearch(val : string) {
    console.warn(val);
    this.router.navigate([`search/${val}`]);
  }
}
