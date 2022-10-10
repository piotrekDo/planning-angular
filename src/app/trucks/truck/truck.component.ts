import {Component, Input, OnInit} from '@angular/core';
import {TruckModel} from "../../model/truck.model";
import {AuthService} from "../../auth.service";
import {UserModel} from "../../model/user.model";

@Component({
  selector: '[app-truck]',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {
  @Input() truck: TruckModel;
  @Input() carrierMode: boolean = false;
  techInspectionDatePast = false;
  private today = new Date();
  activeUser: UserModel;
  showCopyButton = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.techInspectionDatePast = this.today > new Date(this.truck.tautlinerTechInsp);
    this.authService.activeUser.subscribe(user => this.activeUser = user);
  }

  onCopyToClipboard() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value =
      `${this.truck.truckPlates} ${this.truck.tautlinerPlates ? '/ ' + this.truck.tautlinerPlates : ''}
${this.truck.driverFullName ? 'driver:' + this.truck.driverFullName : ''}
${this.truck.driverTel ? 'mob:' + this.truck.driverTel : ''}
${this.truck.driverIdDocument ? 'id:' + this.truck.driverIdDocument : ''}`
    selBox.value = selBox.value.trim();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log(selBox.value);
  }

}
