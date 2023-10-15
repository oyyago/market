import { Component, OnInit } from '@angular/core';
import { Product } from './products';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listProducts: Product[] = [];

  product: Product={
  productId: 0,
  productName: "",
  unitPrice: "",
  supplierId: 0,
  categoryId: 0,
  stock: 0
  }

constructor(private service: ProductsService){

}

ngOnInit(): void {
  this.service.getAllprodcts().subscribe((listProducts) => {
    this.listProducts = listProducts;
  })
}
}
