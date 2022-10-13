import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TrucksComponent} from "./trucks/trucks.component";
import {TautlinersComponent} from "./tautliners/tautliners.component";
import {DriversComponent} from "./drivers/drivers.component";
import {CarriersComponent} from "./carriers/carriers.component";
import {AuthGuardService} from "./auth-guard.service";
import {MainComponent} from "./main/main.component";
import {CarrierComponent} from "./carriers/carrier/carrier.component";
import {SettingsComponent} from "./settings/settings.component";
import * as path from "path";
import {RegisterComponent} from "./settings/register/register.component";
import {AdminGuardService} from "./admin-guard.service";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
  {path: 'trucks', component: TrucksComponent, canActivate: [AuthGuardService]},
  {path: 'tautliners', component: TautlinersComponent, canActivate: [AuthGuardService]},
  {path: 'truckdrivers', component: DriversComponent, canActivate: [AuthGuardService]},
  {path: 'carriers', component: CarriersComponent, canActivate: [AuthGuardService]},
  {path: 'carriers/null', redirectTo: '/carriers'},
  {path: 'carriers/:sap', component: CarrierComponent, canActivate: [AuthGuardService]},
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService], children: [
      {path: 'register', component: RegisterComponent, canActivate: [AdminGuardService]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
