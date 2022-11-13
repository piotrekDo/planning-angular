import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {TruckModel} from "../model/truck.model";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoritesTrucks: TruckModel[] = [];

  constructor(private http: HttpClient) { }

  fetchFavorites(username: string): Observable<TruckModel[]> {
    return this.http.get<TruckModel[]>(environment.mainUrl + `favorites/${username}`);
  }
}
