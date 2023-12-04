import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AdminLayoutComponent,
    FooterComponent,
    TopbarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    NgbDropdownModule,
    FormsModule
  ]
})
export class AppLayoutModule { }