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

  getDriver(id: number): Observable<DriverModel> {
    return this.http.get<DriverModel>(environment.mainUrl + `drivers/${id}`)
  }

  postNewDriver(driver: DriverBasicModel, sap: string): Observable<DriverBasicModel> {
    return this.http.post<DriverBasicModel>(environment.mainUrl + `drivers/${sap}`, driver);
  }

  updateDriver(driver: DriverBasicModel, id: number): Observable<DriverBasicModel> {
    return this.http.put<DriverBasicModel>(environment.mainUrl + `drivers/${id}`, driver);
  }

  deleteDriver(driverID: number): Observable<{ id: number, fullName: string, tel: string, idDocument: string }> {
    return this.http.delete<{ id: number, fullName: string, tel: string, idDocument: string }>(environment.mainUrl + `drivers/${driverID}`)
  }
}
