import {Component, OnInit} from '@angular/core';
import {CarrierModel} from "../model/carrier.model";
import {MainViewService} from "./main-view.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isFetching = false;
  carriers: CarrierModel[] = [];

  constructor(private mainViewService: MainViewService) {
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.mainViewService.getAllData().subscribe(carriers => {
      this.carriers = carriers.content;
      this.isFetching = false;
    });
  }

}
