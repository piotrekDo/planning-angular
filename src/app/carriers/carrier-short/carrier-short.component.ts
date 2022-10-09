import {Component, Input, OnInit} from '@angular/core';
import {CarrierShortModel} from "../../model/carrier-short.model";

@Component({
  selector: '[app-carrier-short]',
  templateUrl: './carrier-short.component.html',
  styleUrls: ['./carrier-short.component.scss']
})
export class CarrierShortComponent implements OnInit {
  @Input() carrier: CarrierShortModel;

  constructor() { }

  ngOnInit(): void {
  }

}
