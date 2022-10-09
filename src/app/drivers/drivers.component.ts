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
    this.driversService.getAllDrivers().subscribe(data => {
      this.isFetching = true;
      this.drivers = data.content;
      console.log(this.drivers);
      this.isFetching = false;
    })
  }

}
