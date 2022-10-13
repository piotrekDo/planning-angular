import {Component, OnInit} from '@angular/core';
import {UserListModel} from "../../model/user-list.model";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  isLoading = false;
  usersList: UserListModel[];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.isLoading = true;
    this.authService.getUsers().subscribe(users => {
      this.usersList = users.content;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

}
