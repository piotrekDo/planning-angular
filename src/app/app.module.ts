import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TrucksComponent } from './trucks/trucks.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TruckComponent } from './trucks/truck/truck.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {FilterPipe} from "./filter.pipe";
import { TautlinersComponent } from './tautliners/tautliners.component';
import { TautlinerComponent } from './tautliners/tautliner/tautliner.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverComponent } from './drivers/driver/driver.component';
import { CarriersComponent } from './carriers/carriers.component';
import { CarrierShortComponent } from './carriers/carrier-short/carrier-short.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TrucksComponent,
    TruckComponent,
    LoadingSpinnerComponent,
    FilterPipe,
    TautlinersComponent,
    TautlinerComponent,
    DriversComponent,
    DriverComponent,
    CarriersComponent,
    CarrierShortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
