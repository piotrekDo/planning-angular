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

  postNewTruck(truck: { mega: boolean, truckPlates: string }, carrierSap: string): Observable<TruckModel> {
    return this.http.post<TruckModel>(environment.mainUrl + `trucks/${carrierSap}`, truck)
  }
}
