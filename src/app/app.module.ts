import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.prod';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlutterwaveModule,
    NgbModule,
    HttpClientModule,
    AppLayoutModule,
    PagesModule,
    AdminModule,
    NgbDropdownModule,
    AuthModule,
    ArchwizardModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
