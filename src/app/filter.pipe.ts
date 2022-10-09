import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propname: string): any {
    if (value.length === 0){
      return value;
    }
    const result = [];
    for (const element of value) {
      if (element[propname].includes(filterString)) {
        result.push(element);
      }
    }
    return result;
  }
}
