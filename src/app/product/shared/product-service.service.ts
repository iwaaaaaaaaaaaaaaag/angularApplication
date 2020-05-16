import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  getProduct():Observable<any>{
    return this.http.get('/api/v1/products')
  }

  getProductById(productId: string):Observable<any>{
    return this.http.get('/api/v1/products/' + productId) 
  }
}
