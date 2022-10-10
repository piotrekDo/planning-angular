import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PageModel} from "../model/page.model";
import {TautlinerModel} from "../model/tautliner.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TautlinersService {

  constructor(private http: HttpClient) {
  }

  getAllTautliners(): Observable<PageModel<TautlinerModel>> {
    return this.http.get<PageModel<TautlinerModel>>(environment.mainUrl + 'tautliners');
  }

  postNewTautliner(taut: { tautlinerPlates: string, techInspection: string, xpo: boolean }, carrier: number): Observable<TautlinerModel> {
    return this.http.post<TautlinerModel>(environment.mainUrl + `tautliners/${carrier}`, taut)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse)
    let errorObject =
      {
        details: {
          tautlinerPlates: [],
          techInspection: []
        }
      }
    return throwError(errorObject = errorResponse.error.details)
  };

}
