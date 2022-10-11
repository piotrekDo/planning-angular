import {Component, OnInit} from '@angular/core';
import {CarriersService} from "./carriers.service";
import {CarrierShortModel} from "../model/carrier-short.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarrierModel} from "../model/carrier.model";
import {CarrierBasicModel} from "../model/carrier-basic.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.scss']
})
export class CarriersComponent implements OnInit {
  isFetching = false;
  carriersShort: CarrierShortModel[] = []
  newCarrierForm: FormGroup;
  newCarrierSuccess: CarrierBasicModel;
  sapForbidden;

  constructor(private carriersService: CarriersService) {
  }

  ngOnInit(): void {
    this.createNewForm();
    this.loadCarriers();
    this.newCarrierForm.get('sap').valueChanges.subscribe(value => {
      if (value.length != 6)
        this.sapForbidden = false;
    })
  }

  onNewCarrierSubmit() {
    this.carriersService.postNewCarrier(this.newCarrierForm.value).subscribe(newCarrier => {
      this.isFetching = true;
      this.newCarrierSuccess = newCarrier;
      this.createNewForm();
      this.loadCarriers();
      this.isFetching = false;
    }, error => {
      console.log(error)
      this.isFetching = false;
    })
  }

  onClear() {
    this.createNewForm();
  }

  createNewForm() {
    this.newCarrierForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9][\\w\\s]{2,100}')]),
      'origin': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9][\\w\\s]{2,100}')]),
      'rate': new FormControl(null, [Validators.required, Validators.pattern('[0-9.]+')]),
      'sap': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{6}')], this.forbiddenSap.bind(this))
    })
  }


  loadCarriers() {
    this.isFetching = true;
    this.carriersService.getAllCarriersShort().subscribe(data => {
      this.carriersShort = data.content;
      this.isFetching = false;
    }, error => {
      console.log(error);
      this.isFetching = false;
    })
  }

  forbiddenSap(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.carriersService.getCarrierBySap(control.value).subscribe(carrier => {
        console.log(carrier)
        this.sapForbidden = true;
        resolve({'sapForbidden': true});
      }, error => {
        console.log(error)
        this.sapForbidden = false;
        resolve(null)
      })
    });
    return promise;
  }

}
