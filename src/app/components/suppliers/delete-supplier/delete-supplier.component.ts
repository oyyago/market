import { Supplier } from './../supplier';
import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css']
})
export class DeleteSupplierComponent implements OnInit {

  supplier: Supplier = {
    name: "",
    phone: "",
    email: ""
  }

  constructor(
    private service: SuppliersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('id');
    if (supplierId !== null && supplierId !== undefined) {
      const id = parseInt(supplierId);
      this.service.getById(id).subscribe((supplier) => {
        this.supplier = supplier;
        console.error(this.supplier);
      });
    }
  }
  deleteSupplier() {
    const supplierId = this.route.snapshot.paramMap.get('id');
    if (supplierId) {
      this.service.deleteSupplier(parseInt(supplierId)).subscribe(()=>{
        this.router .navigate(['/suppliers']);
      }
      );
    }
  }




  cancel() {
    this.router.navigate(['/suppliers'])
  }
}
