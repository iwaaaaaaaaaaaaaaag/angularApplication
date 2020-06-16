import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product-service.service';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private ProductService: ProductService) { }
  products:any;
  
  ngOnInit(): void {
    // this.products = this.ProductService.getProduct();

    const productObservable = this.ProductService.getProduct();
    productObservable.subscribe(
      (data) => {
        this.products = data},
      (err) => {console.error('something wrong occurred: ' + err);}
    )
  //   const observable = new Observable(subscriber => {
  //     subscriber.next(1);
  //     subscriber.next(2);
  //     subscriber.next(3);
  //     setTimeout(() => {
  //       subscriber.next(4);
  //       subscriber.complete();
  //     }, 1000);
  //   });

    
  //   console.log('just before subscribe');
  

  //   observable.subscribe({
  //     next(x) { console.log('got value ' + x); },
  //     error(err) { console.error('something wrong occurred: ' + err); },
  //     complete() { console.log('done'); }
  //   });
  //   console.log('just after subscribe');
   }

}
