import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageModel} from "../model/page.model";
import {DriverModel} from "../model/driver.model";
import {environment} from "../../environments/environment";
import {DriverBasicModel} from "../model/driver-basic.model";

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http: HttpClient) {
  }

  getAllDrivers(): Observable<PageModel<DriverModel>> {
    return this.http.get<PageModel<DriverModel>>(environment.mainUrl + 'drivers');
  }

  postNewDriver(driver: DriverBasicModel, sap: string): Observable<DriverBasicModel> {
    return this.http.post<DriverBasicModel>(environment.mainUrl + `drivers/${sap}`, driver);
  }
}
