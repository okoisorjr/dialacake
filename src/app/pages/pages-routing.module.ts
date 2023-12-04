import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeCategoryComponent } from './cake-category/cake-category.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  /* { path: '', redirectTo: 'cakes', pathMatch: 'full' }, */
  { path: '', component: HomeComponent },
  { path: 'my-orders', component: ClientOrdersComponent },
  { path: ':category', component: CakeCategoryComponent },
  /* { path: 'cakes/:category/:cake-name', component: OrderPageComponent }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
