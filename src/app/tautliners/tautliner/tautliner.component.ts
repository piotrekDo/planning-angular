import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TautlinerModel} from "../../model/tautliner.model";
import {AuthService} from "../../auth.service";
import {UserModel} from "../../model/user.model";
import {TautlinersService} from "../tautliners.service";

@Component({
  selector: '[app-tautliner]',
  templateUrl: './tautliner.component.html',
  styleUrls: ['./tautliner.component.scss']
})
export class TautlinerComponent implements OnInit {
  @Input() tautliner: TautlinerModel;
  @Output('tautDeleted') tautlinerDeleted = new EventEmitter<void>();
  activeUser: UserModel;
  popupDisplay = "none";
  techInspectionDatePast;


  constructor(private authService: AuthService,
              private tautlinerService: TautlinersService) {
  }

  ngOnInit(): void {
    this.authService.activeUser.subscribe(user => this.activeUser = user);
    this.techInspectionDatePast = new Date() > new Date(this.tautliner.techInspection);
  }

  onTautlinerDelete() {
    this.openPopup();
  }

  openPopup() {
    this.popupDisplay = "block";
  }

  popupConfirm() {
    this.tautlinerService.deleteTautliner(this.tautliner.tautlinerPlates).subscribe(response => {
      this.tautliner = undefined;
      this.tautlinerDeleted.emit();
      this.popupDisplay = "none";
    }, error => {
      console.log(error);
      this.popupDisplay = "none";
    });
  }

  popupCancel() {
    this.popupDisplay = "none";
  }
}
