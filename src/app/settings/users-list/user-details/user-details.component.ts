import {Component, OnInit, ViewChild} from '@angular/core';
import {UserListModel} from "../../../model/user-list.model";
import {AuthService} from "../../../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../../model/user.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  popupDisplay = "none";
  isloading = false
  user: UserListModel;
  activeUser: UserModel;
  @ViewChild('modSwitch') modSwitch;
  @ViewChild('adminCheck') adminCheck;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loaduser();
    this.authService.activeUser.subscribe(activeUser => this.activeUser = activeUser);
  }

  loaduser() {
    this.isloading = true;
    this.authService.getUser(this.route.snapshot.params['id']).subscribe(user => {
      this.user = user;
      this.isloading = false;
    })
  }

  onDeleteUser() {
    this.openPopup();
  }

  openPopup() {
    this.popupDisplay = "block";
  }

  popupCancel() {
    this.popupDisplay = "none";
  }

  popupConfirm() {
    this.authService.deleteUser({username: this.user.username}).subscribe(response => {
      this.user = undefined;
      this.popupDisplay = "none";
      this.router.navigate(['../'], {relativeTo: this.route})
    }, error => {
      console.log(error);
      this.popupDisplay = "none";
    });
  }

  onModSwitch() {
    if (this.user.userRoles.indexOf('MODERATOR') < 0) {
      this.callAddRole('MODERATOR');
    } else {
      this.callRemoveRole('MODERATOR');
    }
  }

  onAdminSwitch() {
    if (this.user.userRoles.indexOf('ADMIN') < 0) {
      this.callAddRole('ADMIN');
    } else {
      this.callRemoveRole('ADMIN');
    }
  }

  private callAddRole(role: string) {
    this.isloading = true;
    this.authService.addRoleToUser({roleName: role, username: this.user.username}).subscribe(suerRole => {
      this.isloading = false;
      this.loaduser();
    }, error => {
      console.log(error);
      this.isloading = false;
    })
  }

  private callRemoveRole(role: string) {
    this.isloading = true;
    this.authService.removeRoleFromUser({roleName: role, username: this.user.username}).subscribe(suerRole => {
      this.isloading = false;
      this.loaduser();
    }, error => {
      console.log(error);
      this.isloading = false;
    })
  }
}
