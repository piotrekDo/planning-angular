import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageModel} from "../model/page.model";
import {CarrierShortModel} from "../model/carrier-short.model";
import {environment} from "../../environments/environment";
import {CarrierModel} from "../model/carrier.model";
import {CarrierBasicModel} from "../model/carrier-basic.model";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class CarriersService {

  constructor(private http: HttpClient) {
  }

  getAllCarriersShort(): Observable<PageModel<CarrierShortModel>> {
    return this.http.get<PageModel<CarrierShortModel>>(environment.mainUrl + 'carriers/all-short')
  }

  getCarrierBySap(sap:string): Observable<CarrierModel> {
    return this.http.get<CarrierModel>(environment.mainUrl + `carriers/${sap}`)
  }

  postNewCarrier(carrier: CarrierBasicModel ): Observable<CarrierBasicModel> {
    return  this.http.post<CarrierBasicModel>(environment.mainUrl + 'carriers', carrier)
  }

  deleteCarrier(sap: string) : Observable<CarrierShortModel>{
    return this.http.delete<CarrierShortModel>(environment.mainUrl + `carriers/${sap}`)
  }


}
