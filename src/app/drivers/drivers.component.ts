import {Component, OnInit} from '@angular/core';
import {DriverModel} from "../model/driver.model";
import {DriversService} from "./drivers.service";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  isFetching = false;
  drivers: DriverModel[] = [];

  constructor(private driversService: DriversService) {
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.driversService.getAllDrivers().subscribe(data => {
      this.drivers = data.content;
      this.isFetching = false;
    })
  }

}
