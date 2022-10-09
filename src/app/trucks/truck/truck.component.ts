import {Component, Input, OnInit} from '@angular/core';
import {TruckModel} from "../../model/truck.model";

@Component({
  selector: '[app-truck]',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {
  @Input() truck: TruckModel;
  techInspectionDatePast;

  constructor() {
  }

  ngOnInit(): void {
    this.techInspectionDatePast = new Date() > this.truck.tautlinerTechInsp;
    console.log(this.techInspectionDatePast);
  }

}
