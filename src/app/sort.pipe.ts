import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {


  transform(value: any[], property: string, desc: boolean): any {
    if (!value) {
      return;
    }
    return value.sort(
      (a, b) => {
        if (!desc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] > b[property] ? -1 : 1;
        }
      }
    );
  }

}
