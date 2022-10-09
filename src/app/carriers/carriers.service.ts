import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageModel} from "../model/page.model";
import {CarrierShortModel} from "../model/carrier-short.model";

@Injectable({
  providedIn: 'root'
})
export class CarriersService {
  private dbUrl = 'https://planning-piodom.herokuapp.com/'

  constructor(private http: HttpClient) {}

  getAllCarriersShort(): Observable<PageModel<CarrierShortModel>> {
    return this.http.get<PageModel<CarrierShortModel>>(this.dbUrl + 'carriers/all-short')
  }
}
