import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserListModel} from "../../model/user-list.model";
import {AuthService} from "../../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  isLoading = false;
  usersList: UserListModel[];
  private authServiceGetUsersSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  ngOnDestroy() {
    this.authServiceGetUsersSub.unsubscribe();
  }

  getUsersList() {
    this.isLoading = true;
    this.authServiceGetUsersSub = this.authService.getUsers().subscribe(users => {
      this.usersList = users.content;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

}
