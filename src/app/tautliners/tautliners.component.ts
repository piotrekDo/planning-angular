import {Component, OnInit} from '@angular/core';
import {TautlinerModel} from "../model/tautliner.model";
import {TautlinersService} from "./tautliners.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tautliners',
  templateUrl: './tautliners.component.html',
  styleUrls: ['./tautliners.component.scss']
})
export class TautlinersComponent implements OnInit {
  newXpoTautlinerForm: FormGroup;
  isFetching = false;
  tautliners: TautlinerModel[] = [];
  tautlinerAddSuccess: TautlinerModel;
  errorMessages: { tautlinerPlates: [], techInspection: [] };

  constructor(private tautlinersService: TautlinersService) {
  }

  ngOnInit(): void {
    this.newXpoTautlinerForm = this.createNewXpoTautForm();
    this.getTautliners();
  }

  private createNewXpoTautForm(): FormGroup {
    return new FormGroup({
      'plates': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]([a-zA-Z0-9]){2,14}')]),
      'techDate': new FormControl(null, Validators.required)
    });
  }

  onNewXpoTautSubmit() {
    const plates: string = this.newXpoTautlinerForm.get('plates').value;
    const techDate: string = this.newXpoTautlinerForm.get('techDate').value;
    this.tautlinersService.postNewTautliner({tautlinerPlates: plates, techInspection: techDate, xpo: true}, '0')
      .subscribe(taut => {
        this.isFetching = true;
        this.tautlinerAddSuccess = taut;
        this.newXpoTautlinerForm = this.createNewXpoTautForm();
        this.getTautliners();
        this.isFetching = false;
      }, error => {
        this.errorMessages = error;
        console.log("ERRRORRRRRRRRRRR")
        console.log(this.errorMessages);
        this.isFetching = false;
      })
  }

  onClear() {
    this.newXpoTautlinerForm = this.createNewXpoTautForm();
  }

  getTautliners() {
    this.isFetching = true;
    this.tautlinersService.getAllTautliners().subscribe(data => {
      this.tautliners = data.content;
      this.isFetching = false;
    });
  }
}
