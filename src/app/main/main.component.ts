import {Component, OnInit} from '@angular/core';
import {CarrierModel} from "../model/carrier.model";
import {MainViewService} from "./main-view.service";
import {TautlinerModel} from "../model/tautliner.model";
import {TautlinersService} from "../tautliners/tautliners.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isFetching = false;
  carriers: CarrierModel[] = [];
  xpoTautliners: TautlinerModel[];

  constructor(private mainViewService: MainViewService,
              private tautlinersService: TautlinersService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isFetching = true;
    this.mainViewService.getAllCarriers().subscribe(carriers => {
      this.carriers = carriers.content;
      this.isFetching = false;
    });
    this.tautlinersService.getAllXpoTautliners().subscribe(xpoTaut => {
      this.xpoTautliners = xpoTaut.content.filter(taut=> !taut.truckPlates);
      this.isFetching = false;
    })
  }
}
