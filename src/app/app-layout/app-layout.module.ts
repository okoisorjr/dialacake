import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AdminLayoutComponent,
    FooterComponent,
    TopbarComponent,
    NavbarComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    NgbDropdownModule,
    FormsModule,
    AuthModule,
  ],
  exports: [TopbarComponent, FooterComponent, AlertComponent],
})
export class AppLayoutModule {}
