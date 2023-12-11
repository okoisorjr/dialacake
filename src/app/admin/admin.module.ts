import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { AdminRoutingModule } from './admin-routing.module';
import { NewCakeComponent } from './new-cake/new-cake.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    NewCakeComponent,
    CategoriesComponent,
    OrderHistoryComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbDropdownModule,
    FormsModule,
    SimplebarAngularModule,
    PaginatorModule,
    TableModule
  ],
})
export class AdminModule {}
