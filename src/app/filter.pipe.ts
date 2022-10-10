import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propname: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    if (filterString === ' ')
      return value.filter(item => !item[propname]);

    return value.filter(item => item[propname] && item[propname].toLowerCase().includes(filterString.toLowerCase()));
  }
}
