import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter3Way',
  pure: false
})
export class ThreeWayFilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propname: string): any {
    if (value.length === 0) {
      return value;
    }

    let result = [];

    switch (filterString) {
      case 'all' :
        return value
      case 'true' :
        result = value.filter(item => item[propname] === true)
        break;
      case 'false' :
        result = value.filter(item => item[propname] === false)
        break;
    }
    return result;
  }
}
