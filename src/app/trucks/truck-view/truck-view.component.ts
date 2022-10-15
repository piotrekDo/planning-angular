import {Component, OnInit} from '@angular/core';
import {TruckModel} from "../../model/truck.model";
import {TrucksService} from "../trucks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.scss']
})
export class TruckViewComponent implements OnInit {
  isLoading: boolean = false;
  truck: TruckModel;
  formSuccess: boolean = false;
  editTruckForm: FormGroup;

  constructor(private trucksService: TrucksService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(newPlates?: string) {
    const plates = newPlates ? newPlates : this.route.snapshot.params['plates'];
    this.trucksService.getTruck(plates).subscribe(truck => {
      this.isLoading = true;
      this.truck = truck;
      this.isLoading = false;
      this.createEditTruckForm();
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  createEditTruckForm() {
    this.editTruckForm = new FormGroup({
      'truckPlates': new FormControl(this.truck.truckPlates, [Validators.required, Validators.pattern('^[a-zA-Z]([a-zA-Z0-9]){2,14}')]),
      'mega': new FormControl(this.truck.mega, Validators.required)
    })
  }

  onEditTruckSubmit() {
    this.isLoading = true;
    this.trucksService.updateTruck(this.editTruckForm.value, this.truck.truckPlates).subscribe(truck => {
      this.router.navigate(['/trucks', this.editTruckForm.get('truckPlates').value])
      this.fetchData(this.editTruckForm.get('truckPlates').value);
      this.isLoading = false;
      this.formSuccess = true;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  onClearEditTruckForm() {
    this.createEditTruckForm();
  }
}
