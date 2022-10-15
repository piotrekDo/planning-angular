import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CarrierModel} from "../model/carrier.model";
import {PageModel} from "../model/page.model";

@Injectable({
  providedIn: 'root'
})
export class MainViewService {

  constructor(private http: HttpClient) {
  }

  getAllCarriers(): Observable<PageModel<CarrierModel>> {
    return this.http.get<PageModel<CarrierModel>>(environment.mainUrl + 'carriers');
  }
}
