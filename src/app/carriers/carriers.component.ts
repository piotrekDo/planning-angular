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
    this.isFetching = true;
    this.carriersService.getAllCarriersShort().subscribe(data => {
      this.carriersShort = data.content;
      this.isFetching = false;
    })
  }

}
