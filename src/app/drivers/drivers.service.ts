import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageModel} from "../model/page.model";
import {DriverModel} from "../model/driver.model";

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private dbUrl = 'https://planning-piodom.herokuapp.com/'

  constructor(private http: HttpClient) { }

  getAllDrivers(): Observable<PageModel<DriverModel>>{
    return this.http.get<PageModel<DriverModel>>(this.dbUrl + 'drivers');
  }
}
