import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrucksService } from './trucks.service';
import { TruckModel } from '../model/truck.model';
import { catchError, lastValueFrom, Subscription } from 'rxjs';
import { FavoritesService } from '../favorites/favorites.service';
import { AuthService } from '../auth.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss'],
})
export class TrucksComponent implements OnInit, OnDestroy {
  activeUser: UserModel;
  activeUserSubscription: Subscription;
  favoritesTruckSubscription: Subscription;
  isFetching = false;
  trucks: TruckModel[] = [];
  megas: number;
  carrierSearch = '';
  truckSearch = '';
  tautlinerSearch = '';
  driverSearch = '';
  onlyMega = 'all';
  onlyXPO = 'all';
  private trucksServiceGetAllTrucksSub: Subscription;

  constructor(
    private authService: AuthService,
    private trucksService: TrucksService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isFetching = true;
    this.activeUserSubscription = this.authService.activeUser.subscribe(
      (user) => {
        this.activeUser = user;
        this.favoritesTruckSubscription = this.favoritesService
          .fetchFavorites(this.activeUser.username)
          .subscribe((data) => {
            this.favoritesService.favoritesTrucks = data;
          });
      }
    );
    this.trucksServiceGetAllTrucksSub = this.trucksService
      .getAllTrucks()
      .subscribe((data) => {
        this.trucks = data.content;
        this.megas = data.content.reduce((n, e) => (e.mega ? n + 1 : n), 0);
        this.isFetching = false;
      });
  }

  ngOnDestroy() {
    this.trucksServiceGetAllTrucksSub.unsubscribe();
    this.activeUserSubscription.unsubscribe();
    this.favoritesTruckSubscription.unsubscribe();
  }
}
