import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CarrierShortModel} from "../../model/carrier-short.model";
import {AuthService} from "../../auth.service";
import {UserModel} from "../../model/user.model";
import {CarriersService} from "../carriers.service";
import {Subscription} from "rxjs";

@Component({
  selector: '[app-carrier-short]',
  templateUrl: './carrier-short.component.html',
  styleUrls: ['./carrier-short.component.scss']
})
export class CarrierShortComponent implements OnInit, OnDestroy {
  @Input() carrier: CarrierShortModel;
  activeUser: UserModel;
  @Output('carrierDeleted') carrierDeleted = new EventEmitter<void>();
  private authServiceSubscription: Subscription;
  private carriersServiceDeleteCarierSub: Subscription;


  constructor(private authService: AuthService,
              private carriersService: CarriersService) {
  }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.activeUser.subscribe(user => {
      this.activeUser = user;
    })
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
    if (this.carriersServiceDeleteCarierSub)
      this.carriersServiceDeleteCarierSub.unsubscribe();
  }

  onCarrierDelete() {
    this.carriersService.deleteCarrier(this.carrier.sap).subscribe(response => {
      this.carrier = undefined;
      this.carrierDeleted.emit();
    }, error => {
      console.log(error);
    });
  }
}
