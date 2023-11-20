import { Component, OnInit } from '@angular/core';
import { Order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  orderData : Order[] | undefined;
  constructor(private productService : ProductService){}
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId : number|undefined) {
    orderId && this.productService.cancelOrder(orderId).subscribe(result => {
      if(result) {
        this.getOrderList();
      }
    })
  }

  getOrderList() {
    this.productService.orderList().subscribe(result => {
      this.orderData = result;
    })
  }
}
