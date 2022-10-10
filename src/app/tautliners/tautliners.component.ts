import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TautlinerModel} from "../model/tautliner.model";
import {TautlinersService} from "./tautliners.service";
import {FormControl, FormGroup} from "@angular/forms";

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
      'plates': new FormControl(null),
      'techDate': new FormControl(null)
    });
  }

  onNewXpoTautSubmit() {
    const plates: string = this.newXpoTautlinerForm.get('plates').value;
    const searchRegExp = new RegExp(" ", 'g');
    let platesTrimmed = plates.replace(searchRegExp, '');
    const techDate: string = this.newXpoTautlinerForm.get('techDate').value;
    this.tautlinersService.postNewTautliner({tautlinerPlates: platesTrimmed, techInspection: techDate, xpo: true}, 0)
      .subscribe(taut => {
        this.isFetching = true;
        console.log(taut);
        this.tautlinerAddSuccess = taut;
        this.newXpoTautlinerForm = this.createNewXpoTautForm();
        this.getTautliners();
        this.isFetching = false;
      }, error => {
        this.errorMessages = error;
        console.log("ERRRORRRRRRRRRRR")
        console.log(this.errorMessages)
      })
  }

  onClear() {
    this.createNewXpoTautForm();
    this.newXpoTautlinerForm = this.createNewXpoTautForm();
  }

  private getTautliners() {
    this.tautlinersService.getAllTautliners().subscribe(data => {
      this.isFetching = true;
      this.tautliners = data.content;
      this.isFetching = false;
    });
  }
}
