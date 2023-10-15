import { Component, OnInit } from '@angular/core';
import { Supplier } from './supplier';
import { SuppliersService } from './suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  listSupplier:Supplier[]=[];

  supplier:Supplier={
    name:"",
    phone:"",
    email:""
  }
  constructor(private service:SuppliersService){}
  
  ngOnInit():void{
      this.service.getAllSuppliers().subscribe((listSupplier)=>{
        this.listSupplier=listSupplier
      })
  }
}
