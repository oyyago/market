import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { ProductsComponent } from './components/products/products.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { DeleteSupplierComponent } from './components/suppliers/delete-supplier/delete-supplier.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },
  {
    path:"default",
    component:DefaultComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'suppliers',
    component: SuppliersComponent
  },
  {
    path:'suppliers/deleteSupplier/:id',
    component:DeleteSupplierComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
