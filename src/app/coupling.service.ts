import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CouplingService {

  constructor(private http: HttpClient) {
  }

  coupleTruckWithDriver(couple: { truck: string, driver: number }): Observable<{ truck: string, driver: number }> {
    return this.http.put<{ truck: string, driver: number }>(environment.mainUrl + 'couple/truck-driver', couple);
  }

  coupleTruckWithTautliner(couple: { truck: string, tautliner: string }): Observable<{ truck: string, tautliner: string }> {
    return this.http.put<{truck: string, tautliner: string}>(environment.mainUrl + 'couple/truck-tautliner', couple);
  }
}
