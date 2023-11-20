import { Component, OnInit } from '@angular/core';
import { signUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-sellerauth',
  templateUrl: './sellerauth.component.html',
  styleUrls: ['./sellerauth.component.css']
})
export class SellerauthComponent implements OnInit{
  showLogin = false;
  authError : String = '';
  constructor(private seller : SellerService) {}
  ngOnInit() {  
    this.seller.reloadSeller();
  }
  signUp(data : signUp) {
    console.warn(data);
    this.seller.userSignup(data);
    };
  login(data : signUp) {
    this.seller.userLogin(data);
    this.seller.isLoggingError.subscribe(isError => {
      if(isError) {
        this.authError = "Email or Password is not Correct ! Please Try Again"
      }
    })
    // console.warn(data);
    };

    openLogin() {
      this.showLogin = true;
    }

    openSignup() {
      this.showLogin = false;
    }
  }


