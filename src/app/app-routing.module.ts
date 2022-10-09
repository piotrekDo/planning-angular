import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TrucksComponent} from "./trucks/trucks.component";
import {TautlinersComponent} from "./tautliners/tautliners.component";
import {DriversComponent} from "./drivers/drivers.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'trucks', component: TrucksComponent},
  {path: 'tautliners', component: TautlinersComponent},
  {path: 'truckdrivers', component: DriversComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
