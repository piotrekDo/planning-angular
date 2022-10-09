import {Component, Input, OnInit} from '@angular/core';
import {TautlinerModel} from "../../model/tautliner.model";

@Component({
  selector: '[app-tautliner]',
  templateUrl: './tautliner.component.html',
  styleUrls: ['./tautliner.component.scss']
})
export class TautlinerComponent implements OnInit {
  @Input() tautliner: TautlinerModel;

  constructor() { }

  ngOnInit(): void {

  }

}
