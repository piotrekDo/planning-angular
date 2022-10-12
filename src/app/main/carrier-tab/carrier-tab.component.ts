import {Component, Input, OnInit} from '@angular/core';
import {CarrierModel} from "../../model/carrier.model";

@Component({
  selector: 'app-carrier-tab',
  templateUrl: './carrier-tab.component.html',
  styleUrls: ['./carrier-tab.component.scss']
})
export class CarrierTabComponent implements OnInit {
  @Input() carrier: CarrierModel;



  constructor() {
  }

  ngOnInit(): void {
  }

}
