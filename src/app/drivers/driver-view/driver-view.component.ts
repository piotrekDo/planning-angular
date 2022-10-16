import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverModel} from "../../model/driver.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DriversService} from "../drivers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.scss']
})
export class DriverViewComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  driver: DriverModel;
  formSuccess: any;
  editDriverForm: FormGroup;
  private driversServiceGetDriverSub: Subscription;
  private driversServiceUpdateDriverSub: Subscription;

  constructor(private driversService: DriversService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.driversServiceGetDriverSub.unsubscribe();
    if (this.driversServiceUpdateDriverSub)
      this.driversServiceUpdateDriverSub.unsubscribe();
  }

  createEditDriverForm() {
    this.editDriverForm = new FormGroup({
      'fullName': new FormControl(this.driver.fullName, [Validators.required]),
      'tel': new FormControl(this.driver.tel, [Validators.required, Validators.pattern('\\d{9}')]),
      'idDocument': new FormControl(this.driver.idDocument, [Validators.required, Validators.pattern('^[a-zA-z]{2,3}[a-zA-Z0-9]{6,7}')])
    })
  }

  fetchData() {
    this.driversServiceGetDriverSub = this.driversService.getDriver(this.route.snapshot.params['id']).subscribe(driver => {
      this.isLoading = true
      this.driver = driver;
      this.createEditDriverForm();
      this.isLoading = false;
    })
  }

  onClearEditDriverForm() {
    this.createEditDriverForm();
  }

  onEditDriverSubmit() {
    this.isLoading = true;
    this.driversServiceUpdateDriverSub = this.driversService.updateDriver(this.editDriverForm.value, this.driver.id).subscribe(driver => {
      this.fetchData();
      this.isLoading = false;
      this.formSuccess = true;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }
}
