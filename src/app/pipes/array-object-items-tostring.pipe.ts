import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayObjectToString'
})
export class ExtractArrayToStringPipe implements PipeTransform {
  transform(value: any, key: any): any {
    let str = '';
    value.map(m => str += ', ' + m[key]);
    return str.substr(1);
  }

}
