import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PageModel} from "../model/page.model";
import {TruckModel} from "../model/truck.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrucksService {
  private dbUrl = 'https://planning-piodom.herokuapp.com/'

  constructor(private http: HttpClient) {
  }

  getAllTrucks(): Observable<PageModel<TruckModel>>{
    return  this.http.get<PageModel<TruckModel>>(this.dbUrl + 'trucks');
  }
}
