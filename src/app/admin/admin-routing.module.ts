import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NewCakeComponent } from './new-cake/new-cake.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-cake', pathMatch: 'full'},
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'add-cake', component: NewCakeComponent },
  { path: ':category', component: CategoriesComponent },
  /* { path: 'celebration-cakes', component: CakeCategoryComponent },
  { path: 'discounted-cakes', component: CakeCategoryComponent },
  { path: 'kiddies-cakes', component: CakeCategoryComponent },
  { path: 'plant-based-cakes', component: CakeCategoryComponent }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
