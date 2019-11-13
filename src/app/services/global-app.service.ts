import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalAppService {
  public pickerSelectedColor: string ;
  constructor() { }

get selectedColor(): string {
  return this.pickerSelectedColor;
}

set selectedColor(color: string) {
  this.pickerSelectedColor = color;
}
}
