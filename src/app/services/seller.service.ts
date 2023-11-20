import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LogIn, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggingError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }
  userSignup(data: signUp) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe(result => {
        console.warn(result);
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home']);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: LogIn) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`
      , { observe: 'response' })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          this.isLoggingError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home']);
        } else {
          console.warn("login failed!");
          this.isLoggingError.emit(true);
        }
      })
    // console.warn(data);
  }
}
