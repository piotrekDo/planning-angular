import {Component, Input, OnInit} from '@angular/core';
import {DriverModel} from "../../model/driver.model";

@Component({
  selector: '[app-driver]',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  @Input() driver: DriverModel;

  constructor() { }

  ngOnInit(): void {
  }

}
