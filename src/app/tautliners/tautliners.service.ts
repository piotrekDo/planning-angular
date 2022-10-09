import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageModel} from "../model/page.model";
import {TautlinerModel} from "../model/tautliner.model";

@Injectable({
  providedIn: 'root'
})
export class TautlinersService {
  private dbUrl = 'https://planning-piodom.herokuapp.com/'

  constructor(private http: HttpClient) { }

  getAllTautliners(): Observable<PageModel<TautlinerModel>> {
    return  this.http.get<PageModel<TautlinerModel>>(this.dbUrl + 'tautliners');
  }
}
