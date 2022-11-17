import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogModel } from '../model/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }

  getLogs(identifier: string): Observable<LogModel[]> {
    return this.http.get<LogModel[]>(environment.mainUrl + `logs/${identifier}`)
  }
}
