import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productList : undefined | Product[];
  DeleteMessage : undefined | string;
  icon = faTrash;
  editicon = faEdit;
  constructor(private productService : ProductService){}

  ngOnInit(){
    this.list();
  }

  deleteProduct(id : number) {
    this.productService.deleteProduct(id).subscribe(result => {
      if(result) {
        this.DeleteMessage = "Product is deleted Successfullys!"
        this.list();
      }
    })
    setTimeout(() => {
      this.DeleteMessage = undefined
    }, 3000);
  }

  list() {
    this.productService.productList().subscribe(result => {
      if(result) {
        this.productList = result;
      }
    })
  }

}
