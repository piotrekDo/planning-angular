import {Component, Input, OnInit} from '@angular/core';
import {UserListModel} from "../../../model/user-list.model";

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: UserListModel

  constructor() { }

  ngOnInit(): void {
  }

}
