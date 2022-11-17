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
import { MainComponent } from './main/main.component';
import { CarrierTabComponent } from './main/carrier-tab/carrier-tab.component';
import {SortPipe} from "./sort.pipe";
import {ThreeWayFilterPipe} from "./three-way-filter.pipe";
import { CarrierComponent } from './carriers/carrier/carrier.component';
import {CarrierTruckComponent} from "./carriers/carrier/truck/carrier-truck.component";
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './settings/register/register.component';
import { UsersListComponent } from './settings/users-list/users-list.component';
import { UserComponent } from './settings/users-list/user/user.component';
import { UserDetailsComponent } from './settings/users-list/user-details/user-details.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { TruckViewComponent } from './trucks/truck-view/truck-view.component';
import { TautlinerViewComponent } from './tautliners/tautliner-view/tautliner-view.component';
import { DriverViewComponent } from './drivers/driver-view/driver-view.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TrucksComponent,
    TruckComponent,
    LoadingSpinnerComponent,
    FilterPipe,
    SortPipe,
    ThreeWayFilterPipe,
    TautlinersComponent,
    TautlinerComponent,
    DriversComponent,
    DriverComponent,
    CarriersComponent,
    CarrierShortComponent,
    MainComponent,
    CarrierTabComponent,
    CarrierComponent,
    CarrierTruckComponent,
    SettingsComponent,
    RegisterComponent,
    UsersListComponent,
    UserComponent,
    UserDetailsComponent,
    RecoverPasswordComponent,
    TruckViewComponent,
    TautlinerViewComponent,
    DriverViewComponent,
    FavoritesComponent,
    LogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
