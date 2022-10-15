import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PageModel} from "../model/page.model";
import {TruckModel} from "../model/truck.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrucksService {

  constructor(private http: HttpClient) {
  }

  getAllTrucks(): Observable<PageModel<TruckModel>> {
    return this.http.get<PageModel<TruckModel>>(environment.mainUrl + 'trucks');
  }

  getTruck(plates: string): Observable<TruckModel> {
    return this.http.get<TruckModel>(environment.mainUrl + `trucks/${plates}`);
  }

  postNewTruck(truck: { mega: boolean, truckPlates: string }, carrierSap: string): Observable<TruckModel> {
    return this.http.post<TruckModel>(environment.mainUrl + `trucks/${carrierSap}`, truck)
  }

  updateTruck(truck: {mega: boolean, truckPlates: string}, plates: string): Observable<{ mega: boolean, truckPlates: string }>{
    return this.http.put<{mega: boolean, truckPlates: string}>(environment.mainUrl + `trucks/${plates}`, truck);
  }
}
