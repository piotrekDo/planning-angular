import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { TruckModel } from '../model/truck.model';
import { UserModel } from '../model/user.model';
import { FavoritesService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  isLoading = false;
  favoritesTrucks: TruckModel[];
  activeUser: UserModel;
  activeUserSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activeUserSubscription = this.authService.activeUser.subscribe(
      (user) => (this.activeUser = user)
    );
    this.favoritesService
      .fetchFavorites(this.activeUser.username)
      .subscribe((data) => {
        this.favoritesTrucks = data;
        this.favoritesService.favoritesTrucks = data;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.activeUserSubscription.unsubscribe();
  }
}
