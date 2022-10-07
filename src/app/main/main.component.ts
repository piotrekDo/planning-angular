import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarrierModel} from "../model/carrier.model";
import {MainViewService} from "./main-view.service";
import {TautlinerModel} from "../model/tautliner.model";
import {TautlinersService} from "../tautliners/tautliners.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isFetching = false;
  carriers: CarrierModel[] = [];
  xpoTautliners: TautlinerModel[];
  private mainViewServiceGetAllCarriersSub: Subscription;
  private tautlinersServicegetAllXpoTautlinersSub: Subscription;

  constructor(private mainViewService: MainViewService,
              private tautlinersService: TautlinersService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy() {
    this.mainViewServiceGetAllCarriersSub.unsubscribe();
    this.tautlinersServicegetAllXpoTautlinersSub.unsubscribe();
  }

  fetchData() {
    this.isFetching = true;
    this.mainViewServiceGetAllCarriersSub = this.mainViewService.getAllCarriers().subscribe(carriers => {
      this.carriers = carriers.content;
      this.isFetching = false;
    });
    this.tautlinersServicegetAllXpoTautlinersSub = this.tautlinersService.getAllXpoTautliners().subscribe(xpoTaut => {
      this.xpoTautliners = xpoTaut.content.filter(taut => !taut.truckPlates);
      this.isFetching = false;
    })
  }
}
