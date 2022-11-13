import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarrierModel } from '../model/carrier.model';
import { MainViewService } from './main-view.service';
import { TautlinerModel } from '../model/tautliner.model';
import { TautlinersService } from '../tautliners/tautliners.service';
import { lastValueFrom, Subscription } from 'rxjs';
import { FavoritesService } from '../favorites/favorites.service';
import { AuthService } from '../auth.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  activeUser: UserModel;
  activeUserSubscription: Subscription;
  isFetching = false;
  carriers: CarrierModel[] = [];
  xpoTautliners: TautlinerModel[];
  private mainViewServiceGetAllCarriersSub: Subscription;
  private tautlinersServicegetAllXpoTautlinersSub: Subscription;
  private favoritesServiceSubscription: Subscription;

  constructor(
    private mainViewService: MainViewService,
    private tautlinersService: TautlinersService,
    private authService: AuthService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.mainViewServiceGetAllCarriersSub.unsubscribe();
    this.tautlinersServicegetAllXpoTautlinersSub.unsubscribe();
    this.favoritesServiceSubscription.unsubscribe();
    this.activeUserSubscription.unsubscribe();
  }

  fetchData() {
    this.isFetching = true;
    this.activeUserSubscription = this.authService.activeUser.subscribe(
      (user) => {
        this.activeUser = user;
        this.favoritesServiceSubscription = this.favoritesService
          .fetchFavorites(this.activeUser.username)
          .subscribe((data) => (this.favoritesService.favoritesTrucks = data));
      }
    );

    this.mainViewServiceGetAllCarriersSub = this.mainViewService
      .getAllCarriers()
      .subscribe((carriers) => {
        this.carriers = carriers.content;
        this.isFetching = false;
      });
    this.tautlinersServicegetAllXpoTautlinersSub = this.tautlinersService
      .getAllXpoTautliners()
      .subscribe((xpoTaut) => {
        this.xpoTautliners = xpoTaut.content.filter(
          (taut) => !taut.truckPlates
        );
        this.isFetching = false;
      });
  }
}
