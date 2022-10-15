import {Component, OnInit} from '@angular/core';
import {CarrierModel} from "../../model/carrier.model";
import {TautlinerModel} from "../../model/tautliner.model";
import {CarriersService} from "../carriers.service";
import {TautlinersService} from "../../tautliners/tautliners.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DriverModel} from "../../model/driver.model";
import {AuthService} from "../../auth.service";
import {UserModel} from "../../model/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TrucksService} from "../../trucks/trucks.service";
import {DriversService} from "../../drivers/drivers.service";

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
  editCarrierForm: FormGroup;
  addNewTruckForm: FormGroup;
  addNewTautlinerForm: FormGroup;
  addNewDriverForm: FormGroup;
  formSuccess: any;
  popupDisplay = "none";

  constructor(private carriersService: CarriersService,
              private tautlinersService: TautlinersService,
              private trucksService: TrucksService,
              private driversService: DriversService,
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

  async fetchData(newSap?: string) {
    this.isLoading = true;
    const sap = newSap ? newSap : this.route.snapshot.params['sap'];
    this.carriersService.getCarrierBySap(sap).subscribe(carrier => {
      this.carrier = carrier;
      this.createCarrierEditForm();
      this.createNewTruckForm();
      this.createNewTautlinerForm();
      this.createNewDriverForm();
    }, error => console.log(error));

    this.tautlinersService.getAllXpoTautliners().subscribe(xpoTautliners => {
      this.xpoTaut = xpoTautliners.content;
    }, error => console.log(error));
    this.isLoading = false;
  }

  createCarrierEditForm() {
    this.editCarrierForm = new FormGroup({
      'name': new FormControl(this.carrier.name, [Validators.required, Validators.pattern('^[a-zA-Z0-9][\\w\\s]{2,100}')]),
      'origin': new FormControl(this.carrier.origin, [Validators.required, Validators.pattern('^[a-zA-Z0-9][\\w\\s]{2,100}')]),
      'rate': new FormControl(this.carrier.rate, [Validators.required, Validators.pattern('[0-9.]+')]),
      'sap': new FormControl(this.carrier.sap, [Validators.required, Validators.pattern('^[0-9]{6}')])
    })
  }

  createNewTruckForm() {
    this.addNewTruckForm = new FormGroup({
      'mega': new FormControl(null, Validators.required),
      'truckPlates': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]([a-zA-Z0-9]){2,14}')])
    })
  }

  createNewTautlinerForm() {
    this.addNewTautlinerForm = new FormGroup({
      'tautlinerPlates': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]([a-zA-Z0-9]){2,14}')]),
      'techInspection': new FormControl(null, Validators.required),
      'xpo': new FormControl(null, Validators.required)
    })
  }

  createNewDriverForm() {
    this.addNewDriverForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required]),
      'tel': new FormControl(null, [Validators.required, Validators.pattern('\\d{9}')]),
      'idDocument': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-z]{2,3}[a-zA-Z0-9]{6,7}')])
    })
  }

  onEditCarrierSubmit() {
    this.carriersService.editCarrier(this.editCarrierForm.value, this.carrier.sap).subscribe(editedCarrier => {
      this.isLoading = true;
      this.formSuccess = editedCarrier;
      this.router.navigate(['/carriers', this.editCarrierForm.get('sap').value])
      this.fetchData(this.editCarrierForm.get('sap').value);
      this.isLoading = false;
    }, error => {
      console.log(error)
      this.isLoading = false;
    })
  }

  onClearEditCarrierForm() {
    this.createCarrierEditForm();
  }

  onNewTruckSubmit() {
    this.trucksService.postNewTruck(this.addNewTruckForm.value, this.carrier.sap).subscribe(newTruck => {
      this.isLoading = true;
      this.formSuccess = newTruck;
      this.fetchData();
      this.isLoading = false;
    }, error => {
      console.log(error)
      this.isLoading = false;
    });
  }

  onClearNewTruckForm() {
    this.createNewTruckForm();
  }

  onNewTautlinerSubmit() {
    this.tautlinersService.postNewTautliner(this.addNewTautlinerForm.value, this.carrier.sap).subscribe(newTautliner => {
      this.isLoading = true;
      this.formSuccess = newTautliner;
      this.fetchData();
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  onClearNewTautlinerForm() {
    this.createNewTautlinerForm();
  }

  onNewDriverSubmit() {
    this.driversService.postNewDriver(this.addNewDriverForm.value, this.carrier.sap).subscribe(newDriver => {
      this.isLoading = true;
      this.formSuccess = newDriver;
      this.fetchData();
      this.isLoading = false;
    }, error => {
      console.log(error)
      this.isLoading = false;
    })
  }

  onClearNewDriverForm() {
    this.createNewDriverForm();
  }

  onCarrierDelete() {
    this.openPopup();
  }

  openPopup() {
    this.popupDisplay = "block";
  }

  popupConfirm() {
    this.carriersService.deleteCarrier(this.carrier.sap).subscribe(response => {
      this.carrier = undefined;
      this.popupDisplay = "none";
      this.router.navigate(['/main']);
    }, error => {
      console.log(error);
      this.popupDisplay = "none";
    });
  }

  popupCancel() {
    this.popupDisplay = "none";
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
