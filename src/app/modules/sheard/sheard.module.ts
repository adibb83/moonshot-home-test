import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractArrayToStringPipe } from 'app/pipes/array-object-items-tostring.pipe';



@NgModule({
  declarations: [ExtractArrayToStringPipe],
  imports: [
    CommonModule
  ],
  exports: [ExtractArrayToStringPipe]
})
export class SheardModule { }
