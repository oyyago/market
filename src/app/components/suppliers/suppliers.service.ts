import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from './supplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private readonly SUPPLIERS_URL="http://localhost:8080/suppliers";

  constructor(private http:HttpClient) { }

  getAllSuppliers():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.SUPPLIERS_URL)
  }
  deleteSupplier(id:number):Observable<Supplier>{
    const url:string= `${this.SUPPLIERS_URL}/${id}`
    return this.http.delete<Supplier>(url);
  }
  getById(id:number){
    const url:string=`${this.SUPPLIERS_URL}/${id}`
    return this.http.get<Supplier>(url);
  }
}