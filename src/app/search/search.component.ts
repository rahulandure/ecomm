import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchResult : undefined | Product[]
  constructor(private activatedRoute : ActivatedRoute , private productService : ProductService) {}
  ngOnInit(): void {
    let query = this.activatedRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.productService.searchProduct(query).subscribe(resullt => {
      this.searchResult = resullt;
    })
  }
}
