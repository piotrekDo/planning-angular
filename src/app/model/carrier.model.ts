import {TruckModel} from "./truck.model";
import {DriverModel} from "./driver.model";
import {TautlinerModel} from "./tautliner.model";

export interface CarrierModel {
  sap: string;
  name: string;
  origin: string;
  rate: number;
  trucks: TruckModel[];
  drivers: DriverModel[];
  tautliners: TautlinerModel[];
}
