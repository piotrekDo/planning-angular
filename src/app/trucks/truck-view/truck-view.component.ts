import {Component, OnDestroy, OnInit} from '@angular/core';
import {TruckModel} from "../../model/truck.model";
import {TrucksService} from "../trucks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserModel} from "../../model/user.model";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.scss']
})
export class TruckViewComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  truck: TruckModel;
  formSuccess: boolean = false;
  editTruckForm: FormGroup;
  activeUser: UserModel;
  popupDisplay = "none";
  private trucksServiceGetTruckSub: Subscription;
  private trucksServiceUpdateTruckSub: Subscription;
  private trucksServiceDeleteTruckSub: Subscription
  private authServiceActiveUserSub: Subscription;

  constructor(private trucksService: TrucksService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchData();
    this.authServiceActiveUserSub = this.authService.activeUser.subscribe(user => this.activeUser = user);
  }

  ngOnDestroy() {
    this.trucksServiceGetTruckSub.unsubscribe();
    this.authServiceActiveUserSub.unsubscribe();
    if (this.trucksServiceUpdateTruckSub)
      this.trucksServiceUpdateTruckSub.unsubscribe();
    if (this.trucksServiceDeleteTruckSub)
      this.trucksServiceDeleteTruckSub.unsubscribe();
  }

  fetchData(newPlates?: string) {
    const plates = newPlates ? newPlates : this.route.snapshot.params['plates'];
    this.trucksServiceGetTruckSub = this.trucksService.getTruck(plates).subscribe(truck => {
      this.isLoading = true;
      this.truck = truck;
      this.isLoading = false;
      this.createEditTruckForm();
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  createEditTruckForm() {
    this.editTruckForm = new FormGroup({
      'truckPlates': new FormControl(this.truck.truckPlates, [Validators.required, Validators.pattern('^[a-zA-Z]([a-zA-Z0-9]){2,14}')]),
      'mega': new FormControl(this.truck.mega, Validators.required)
    })
  }

  onEditTruckSubmit() {
    this.isLoading = true;
    this.trucksServiceUpdateTruckSub = this.trucksService.updateTruck(this.editTruckForm.value, this.truck.truckPlates).subscribe(truck => {
      this.router.navigate(['/trucks', this.editTruckForm.get('truckPlates').value])
      this.fetchData(this.editTruckForm.get('truckPlates').value);
      this.isLoading = false;
      this.formSuccess = true;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  onClearEditTruckForm() {
    this.createEditTruckForm();
  }

  onTruckDelete() {
    this.openPopup();
  }

  openPopup() {
    this.popupDisplay = "block";
  }

  popupConfirm() {
    this.trucksServiceDeleteTruckSub = this.trucksService.deleteTruck(this.truck.truckPlates).subscribe(response => {
      this.truck = undefined;
      this.popupDisplay = "none";
      this.router.navigate(['../'], {relativeTo: this.route});
    }, error => {
      console.log(error);
      this.popupDisplay = "none";
    });
  }

  popupCancel() {
    this.popupDisplay = "none";
  }
}
