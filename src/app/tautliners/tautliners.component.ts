import {Component, OnInit} from '@angular/core';
import {TautlinerModel} from "../model/tautliner.model";
import {TautlinersService} from "./tautliners.service";

@Component({
  selector: 'app-tautliners',
  templateUrl: './tautliners.component.html',
  styleUrls: ['./tautliners.component.scss']
})
export class TautlinersComponent implements OnInit {
  isFetching = false;
  tautliners: TautlinerModel[] = [];

  constructor(private tautlinersService: TautlinersService) {
  }

  ngOnInit(): void {
    this.tautlinersService.getAllTautliners().subscribe(data => {
      this.isFetching = true;
      this.tautliners = data.content;
      this.isFetching = false;
    });
  }
}
