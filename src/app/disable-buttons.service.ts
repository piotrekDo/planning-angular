import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DisableButtonsService {
  disable = new Subject<boolean>();

  onDisable() {
    this.disable.next(true);
  }

  onEnable() {
    this.disable.next(false);
  }
}
