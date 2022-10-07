import {Component, OnDestroy, OnInit} from '@angular/core';
import {TautlinerModel} from "../../model/tautliner.model";
import {TautlinersService} from "../tautliners.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserModel} from "../../model/user.model";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-tautliner-view',
  templateUrl: './tautliner-view.component.html',
  styleUrls: ['./tautliner-view.component.scss']
})
export class TautlinerViewComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  tautliner: TautlinerModel;
  editTautlinerForm: FormGroup;
  formSuccess: boolean = false;
  popupDisplay = "none";
  private tautlinerServiceUpdateTautlinerSub: Subscription;
  private tautlinerServiceGetTautlinerSub: Subscription;
  private tautlinerServiceDeleteTautlinerSub: Subscription;
  private authServiceActiveUserSub: Subscription;
  activeUser: UserModel;

  constructor(private tautlinersService: TautlinersService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchData();
    this.authServiceActiveUserSub = this.authService.activeUser.subscribe(user => this.activeUser = user);
  }

  ngOnDestroy() {
    this.tautlinerServiceGetTautlinerSub.unsubscribe();
    this.authServiceActiveUserSub.unsubscribe();
    if (this.tautlinerServiceDeleteTautlinerSub)
      this.tautlinerServiceDeleteTautlinerSub.unsubscribe();
    if (this.tautlinerServiceUpdateTautlinerSub)
      this.tautlinerServiceUpdateTautlinerSub.unsubscribe();
  }

  fetchData(newPlates?: string) {
    const plates = newPlates ? newPlates : this.route.snapshot.params['plates'];
    this.tautlinerServiceGetTautlinerSub = this.tautlinersService.getTautliner(plates).subscribe(taut => {
      this.isLoading = true
      this.tautliner = taut;
      this.createEditTautlinerForm();
      this.isLoading = false;
    })
  }

  createEditTautlinerForm() {
    this.editTautlinerForm = new FormGroup({
      'tautlinerPlates': new FormControl(this.tautliner.tautlinerPlates, [Validators.required, Validators.pattern('^[a-zA-Z]([a-zA-Z0-9]){2,14}')]),
      'techInspection': new FormControl(new Date(this.tautliner.techInspection).toISOString().substring(0, 10), Validators.required),
      'xpo': new FormControl(this.tautliner.xpo, Validators.required)
    })
  }

  onClearEditTautlinerForm() {
    this.createEditTautlinerForm();
  }

  onEditTautlinerSubmit() {
    this.isLoading = true;
    this.tautlinerServiceUpdateTautlinerSub = this.tautlinersService.updateTautliner(this.editTautlinerForm.value, this.tautliner.tautlinerPlates)
      .subscribe(taut => {
        this.router.navigate(['/tautliners', this.editTautlinerForm.get('tautlinerPlates').value])
        this.fetchData(this.editTautlinerForm.get('tautlinerPlates').value);
        this.isLoading = false;
        this.formSuccess = true;
      }, error => {
        console.log(error);
        this.isLoading = false;
      })
  }

  onTautlinerDelete() {
    this.openPopup();
  }

  openPopup() {
    this.popupDisplay = "block";
  }

  popupConfirm() {
    this.tautlinerServiceDeleteTautlinerSub = this.tautlinersService.deleteTautliner(this.tautliner.tautlinerPlates).subscribe(response => {
      this.tautliner = undefined;
      this.popupDisplay = "none";
      this.router.navigate(['../'], {relativeTo: this.route});
    }, error => {
      console.log(error);
      this.popupDisplay = "none";
    });
  }

  popupCancel() {
    this.popupDisplay = "none";
  }
}
