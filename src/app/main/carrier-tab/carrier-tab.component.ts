import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarrierModel} from "../../model/carrier.model";
import {Subject} from "rxjs";
import {TautlinerModel} from "../../model/tautliner.model";

@Component({
  selector: 'app-carrier-tab',
  templateUrl: './carrier-tab.component.html',
  styleUrls: ['./carrier-tab.component.scss']
})
export class CarrierTabComponent implements OnInit {
  @Input() carrier: CarrierModel;
  @Input() xpoTautliners: TautlinerModel[];
  @Output('dataChanged') dataChanged = new EventEmitter<void>()
  editMode: boolean = false
  editModeSubject = new Subject<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSwitchEditMode() {
    this.editMode = !this.editMode;
    this.editModeSubject.next(this.editMode);
  }
}
