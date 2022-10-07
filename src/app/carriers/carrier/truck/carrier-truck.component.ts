import {Component, Input, OnInit} from '@angular/core';
import {TruckModel} from "../../../model/truck.model";

@Component({
  selector: '[app-carrier-truck]',
  templateUrl: './carrier-truck.component.html',
  styleUrls: ['./carrier-truck.component.scss']
})
export class CarrierTruckComponent implements OnInit {
  @Input() truck: TruckModel;
  techInspectionDatePast;
  private today = new Date();

  constructor() { }

  ngOnInit(): void {
    this.techInspectionDatePast = this.today > new Date(this.truck.tautlinerTechInsp);
  }

}
