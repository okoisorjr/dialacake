import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import {PaginatorModule} from 'primeng/paginator';
import { AppLayoutModule } from '../app-layout/app-layout.module';
import { SimplebarAngularModule } from 'simplebar-angular';


import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { CakeCategoryComponent } from './cake-category/cake-category.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    ClientOrdersComponent,
    CakeCategoryComponent,
    OrderPageComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbDropdownModule,
    NgbModalModule,
    FormsModule,
    AdminModule,
    AuthModule,
    PaginatorModule,
    AppLayoutModule,
    SimplebarAngularModule
  ]
})
export class PagesModule { }
