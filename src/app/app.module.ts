import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TrucksComponent } from './trucks/trucks.component';
import {HttpClientModule} from "@angular/common/http";
import { TruckComponent } from './trucks/truck/truck.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {FilterPipe} from "./filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TrucksComponent,
    TruckComponent,
    LoadingSpinnerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
