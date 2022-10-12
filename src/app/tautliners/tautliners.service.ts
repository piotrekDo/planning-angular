import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
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

  getAllXpoTautliners(): Observable<PageModel<TautlinerModel>> {
    let customParams = new HttpParams();
    customParams = customParams.append('isXpo', 'true');
    customParams = customParams.append('page', '-1');
    customParams = customParams.append('size', '-1');
    return this.http.get<PageModel<TautlinerModel>>(environment.mainUrl + 'tautliners', {
      params: customParams
    });
  }

  postNewTautliner(taut: { tautlinerPlates: string, techInspection: string, xpo: boolean }, carrier: string): Observable<TautlinerModel> {
    return this.http.post<TautlinerModel>(environment.mainUrl + `tautliners/${carrier}`, taut)
      .pipe(catchError(this.handleError));
  }

  deleteTautliner(plates: string): Observable<TautlinerModel> {
    return this.http.delete<TautlinerModel>(environment.mainUrl + `tautliners/${plates}`)
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
