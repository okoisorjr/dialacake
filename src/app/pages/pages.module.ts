import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { CakeCategoryComponent } from './cake-category/cake-category.component';
import { OrderPageComponent } from './order-page/order-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    ClientOrdersComponent,
    CakeCategoryComponent,
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbDropdownModule,
    NgbModalModule,
    FormsModule,
    AdminModule
  ]
})
export class PagesModule { }
