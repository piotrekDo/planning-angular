import {Component, OnInit} from '@angular/core';
import {CarrierModel} from "../../model/carrier.model";
import {TautlinerModel} from "../../model/tautliner.model";
import {CarriersService} from "../carriers.service";
import {TautlinersService} from "../../tautliners/tautliners.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DriverModel} from "../../model/driver.model";
import {AuthService} from "../../auth.service";
import {UserModel} from "../../model/user.model";

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss']
})
export class CarrierComponent implements OnInit {
  isLoading = false;
  carrier: CarrierModel;
  xpoTaut: TautlinerModel[];
  activeUser: UserModel;

  constructor(private carriersService: CarriersService,
              private tautlinersService: TautlinersService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchData();
    this.authService.activeUser.subscribe(user => {
      this.activeUser = user;
    })
  }

  async fetchData() {
    this.isLoading = true;
    const sap = this.route.snapshot.params['sap'];
    this.carriersService.getCarrierBySap(sap).subscribe(carrier => {
      this.carrier = carrier;
      console.log(this.carrier)
    }, error => console.log(error));

    this.tautlinersService.getAllXpoTautliners().subscribe(xpoTautliners => {
      this.xpoTaut = xpoTautliners.content;
      console.log(this.xpoTaut)
    }, error => console.log(error));
    this.isLoading = false;
  }

  onCarrierDelete() {
    this.carriersService.deleteCarrier(this.carrier.sap).subscribe(response => {
      this.carrier = undefined;
      this.router.navigate(['/main'])
    }, error => {
      console.log(error);
    });
  }

  tautlinersFree(): TautlinerModel[] {
    return this.carrier.tautliners.filter(taut => !taut.truckPlates);
  }

  driversFree(): DriverModel[] {
    return this.carrier.drivers.filter(driver => !driver.truckPlates);
  }

  techInspectionDatePast(techInspection: Date): boolean {
    return new Date() > new Date(techInspection);
  }
}
