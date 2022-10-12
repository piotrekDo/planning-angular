import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TautlinerModel} from "../../model/tautliner.model";
import {AuthService} from "../../auth.service";
import {UserModel} from "../../model/user.model";
import {TautlinersService} from "../tautliners.service";
import { Modal } from 'bootstrap'

@Component({
  selector: '[app-tautliner]',
  templateUrl: './tautliner.component.html',
  styleUrls: ['./tautliner.component.scss']
})
export class TautlinerComponent implements OnInit {
  @Input() tautliner: TautlinerModel;
  activeUser: UserModel;
  @Output('tautDeleted') tautlinerDeleted = new EventEmitter<void>();

  constructor(private authService: AuthService,
              private tautlinerService: TautlinersService) {
  }

  ngOnInit(): void {
    this.authService.activeUser.subscribe(user => this.activeUser = user);
  }

  onTautlinerDelete() {
    this.tautlinerService.deleteTautliner(this.tautliner.tautlinerPlates).subscribe(response => {
      this.tautliner = undefined;
      this.tautlinerDeleted.emit();
    }, error => {
      console.log(error);
    });
  }
}
