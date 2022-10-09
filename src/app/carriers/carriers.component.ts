import { Component, OnInit } from '@angular/core';
import {CarriersService} from "./carriers.service";
import {CarrierShortModel} from "../model/carrier-short.model";

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.scss']
})
export class CarriersComponent implements OnInit {
  isFetching = false;
  carriersShort: CarrierShortModel[] = []

  constructor(private carriersService: CarriersService) { }

  ngOnInit(): void {
    this.carriersService.getAllCarriersShort().subscribe(data => {
      this.isFetching = true;
      this.carriersShort = data.content;
      console.log(this.carriersShort);
      this.isFetching = false;
    })
  }

}
