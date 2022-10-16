import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrucksService} from "./trucks.service";
import {TruckModel} from "../model/truck.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss']
})
export class TrucksComponent implements OnInit, OnDestroy {
  isFetching = false;
  trucks: TruckModel[] = [];
  megas: number;
  carrierSearch = ''
  truckSearch = ''
  tautlinerSearch = ''
  driverSearch = ''
  onlyMega = 'all';
  onlyXPO = 'all';
  private trucksServiceGetAllTrucksSub: Subscription;

  constructor(private trucksService: TrucksService) {
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.trucksServiceGetAllTrucksSub = this.trucksService.getAllTrucks().subscribe(data => {
      this.trucks = data.content;
      this.megas = data.content.reduce((n, e) => e.mega ? n + 1 : n, 0);
      this.isFetching = false;
    });
  }

  ngOnDestroy() {
    this.trucksServiceGetAllTrucksSub.unsubscribe();
  }
}
