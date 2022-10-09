import {Component, Input, OnInit} from '@angular/core';
import {TruckModel} from "../../model/truck.model";

@Component({
  selector: '[app-truck]',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {
  @Input() truck: TruckModel;
  techInspectionDatePast = false;
  private today = new Date();

  constructor() {
  }

  ngOnInit(): void {
    this.techInspectionDatePast = this.today < new Date(this.truck.tautlinerTechInsp);
    // console.log(this.truck.truckPlates + ' ' + this.truck.tautlinerPlates + ' ' +  this.truck.tautlinerTechInsp);
    console.log(this.today)
    console.log(new Date(this.truck.tautlinerTechInsp))
    console.log('-------')
  }

}
