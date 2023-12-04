import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { NewCakeComponent } from './new-cake/new-cake.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrderHistoryComponent } from './order-history/order-history.component';


@NgModule({
  declarations: [
    NewCakeComponent,
    CategoriesComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbDropdownModule,
    FormsModule,
    SimplebarAngularModule
  ]
})
export class AdminModule { }
