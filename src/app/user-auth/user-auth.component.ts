import { Component, OnInit } from '@angular/core';
import { Cart, LogIn, Product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  showLogin = false;
  authError : string = '';
  constructor(private userSerivce : UserService, private productService : ProductService) {}

  ngOnInit() {
    this.userSerivce.userAuthReload();
  }

  signUp(data : signUp) {
    this.userSerivce.userSignup(data);
  }

  logIn(data : LogIn) {
    this.userSerivce.userLogin(data);
    this.userSerivce.invalidUserAuth.subscribe(result => {
      if(result) {
        this.authError = "User Not Found! Please Try Again. "
      }else {
        this.localCartToRemotCart();
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  localCartToRemotCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data) {
      let cartDataList : Product[] = JSON.parse(data);
      cartDataList.forEach((product : Product,index) => {
        let cartData:Cart={
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe(result => {
            if(result) {
              console.warn("data is stroed in DB");  
            }
          })
        }, 500);
        if(cartDataList.length === index+1) {
          localStorage.removeItem('localCart');
        }
      })
    }

    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 500);
  }
}
