import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverModel} from "../model/driver.model";
import {DriversService} from "./drivers.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit, OnDestroy {
  isFetching = false;
  drivers: DriverModel[] = [];
  private driversServiceGetAllDriversSub: Subscription;

  constructor(private driversService: DriversService) {
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.driversServiceGetAllDriversSub = this.driversService.getAllDrivers().subscribe(data => {
      this.drivers = data.content;
      this.isFetching = false;
    })
  }

  ngOnDestroy() {
    this.driversServiceGetAllDriversSub.unsubscribe();
  }

}
