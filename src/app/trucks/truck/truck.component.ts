import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TruckModel } from '../../model/truck.model';
import { AuthService } from '../../auth.service';
import { UserModel } from '../../model/user.model';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { DisableButtonsService } from '../../disable-buttons.service';
import { TautlinerModel } from '../../model/tautliner.model';
import { DriverModel } from '../../model/driver.model';
import { CouplingService } from '../../coupling.service';
import { TrucksService } from '../trucks.service';
import { FavoritesService } from 'src/app/favorites/favorites.service';

@Component({
  selector: '[app-truck]',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss'],
})
export class TruckComponent implements OnInit, OnDestroy {
  isFavorite: boolean;
  isLoading = false;
  @Input() truck: TruckModel;
  @Input() tautliners: TautlinerModel[];
  @Input() xpoTautliners: TautlinerModel[];
  @Input() drivers: DriverModel[];
  @Input() carrierMode: boolean = false;
  @Input() editModeObservable: Observable<boolean>;
  @Output('dataChanged') dataChanged = new EventEmitter<void>();
  activeUserSubscription: Subscription;
  editModeSubscription: Subscription;
  disableButtonsSubscription: Subscription;
  carrierTabEditMode: boolean;
  techInspectionDatePast = false;
  private today = new Date();
  activeUser: UserModel;
  truckEditTriggered: boolean = false;
  editDisabled = false;
  selectedTautliner: string;
  selectedDriver: number;

  constructor(
    private authService: AuthService,
    private disableButtonsService: DisableButtonsService,
    private couplingService: CouplingService,
    private trucksService: TrucksService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.isFavorite = this.favoritesService.favoritesTrucks.filter(x => x.truckPlates === this.truck.truckPlates).length > 0 ? true : false;
    this.techInspectionDatePast =
      this.today > new Date(this.truck.tautlinerTechInsp);
    this.activeUserSubscription = this.authService.activeUser.subscribe(
      (user) => (this.activeUser = user)
    );
    if (this.editModeObservable)
      this.editModeSubscription = this.editModeObservable.subscribe(
        (mode) => (this.carrierTabEditMode = mode)
      );
    this.disableButtonsSubscription =
      this.disableButtonsService.disable.subscribe((disable) => {
        if (!this.truckEditTriggered) {
          this.editDisabled = disable;
        }
      });
    this.selectedDriver = this.truck.driverid;
    this.selectedTautliner = this.truck.tautlinerPlates;
  }

  ngOnDestroy() {
    this.activeUserSubscription.unsubscribe();
    if (this.editModeSubscription) this.editModeSubscription.unsubscribe();
    if (this.disableButtonsSubscription)
      this.disableButtonsSubscription.unsubscribe();
  }

  onFavorite() {
    if (!this.isFavorite) {
      this.trucksService
        .addTruckToFavorites({
          username: this.activeUser.username,
          truck: this.truck.truckPlates,
        })
        .subscribe();
    } else {
      this.trucksService
        .removeTruckFromFavorites({
          username: this.activeUser.username,
          truck: this.truck.truckPlates,
        })
        .subscribe();
    }
    this.isFavorite = !this.isFavorite;
  }

  onCopyToClipboard(copybtn: HTMLButtonElement) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${this.truck.truckPlates} ${
      this.truck.tautlinerPlates ? '/ ' + this.truck.tautlinerPlates : ''
    }
${this.truck.driverFullName ? 'driver:' + this.truck.driverFullName : ''}
${this.truck.driverTel ? 'mob:' + this.truck.driverTel : ''}
${this.truck.driverIdDocument ? 'id:' + this.truck.driverIdDocument : ''}`;
    selBox.value = selBox.value.trim();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    copybtn.classList.add('bump');
    setTimeout(() => {copybtn.classList.remove('bump')}, 300)
  }

  async onEditSave() {
    if (this.truckEditTriggered) {
      this.isLoading = true;
      if (this.selectedTautliner === '') this.selectedTautliner = undefined;
      if (this.selectedDriver !== this.truck.driverid) {
        const couple$ = this.couplingService.coupleTruckWithDriver({
          truck: this.truck.truckPlates,
          driver: this.selectedDriver,
        });
        await lastValueFrom(couple$);
      }
      if (this.selectedTautliner !== this.truck.tautlinerPlates) {
        const couple$ = this.couplingService.coupleTruckWithTautliner({
          truck: this.truck.truckPlates,
          tautliner: this.selectedTautliner,
        });
        await lastValueFrom(couple$);
      }
      this.isLoading = false;
      this.dataChanged.emit();
    }
    this.truckEditTriggered = !this.truckEditTriggered;

    if (this.truckEditTriggered) {
      this.disableButtonsService.onDisable();
    } else {
      this.disableButtonsService.onEnable();
    }
  }

  onCancelEdit() {
    this.truckEditTriggered = false;
    this.disableButtonsService.onEnable();
    this.selectedTautliner = this.truck.tautlinerPlates;
    this.selectedDriver = this.truck.driverid;
  }
}
