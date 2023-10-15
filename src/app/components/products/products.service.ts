import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly PRODUCTS_URL="http://localhost:8080/products";
  constructor(private http:HttpClient) { }

  getAllprodcts():Observable<Product[]>{
    return this.http.get<Product[]>(this.PRODUCTS_URL)
  }
}
