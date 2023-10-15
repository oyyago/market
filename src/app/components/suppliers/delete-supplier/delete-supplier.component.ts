import { Supplier } from './../supplier';
import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    const supplierId = this.route.snapshot.paramMap.get('id')
    this.service.getById(parseInt(supplierId!)).subscribe((supplier) => {
      this.supplier = supplier;
    })
    console.error(this.supplier)
  }

  deleteSupplier() {
    if (this.supplier.supplierId) {
      this.service.deleteSupplier(this.supplier.supplierId).subscribe(() => {
        this.router.navigate(['/suppliers'])
      })
    }
    console.error(this.supplier.name)
  }

  cancel() {
    this.router.navigate(['/suppliers'])
  }
}
