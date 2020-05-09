import { Component, OnInit } from '@angular/core';
import { products } from '../../products';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }
  products:any = products;
  
  ngOnInit(): void {
  }

}
