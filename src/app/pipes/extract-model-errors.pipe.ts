import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractModelErrors'
})
export class ExtractModelErrorsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Object.keys(value).reduce((previous: any[], key: string) => [...previous, ...value[key]], []);
  }

}
