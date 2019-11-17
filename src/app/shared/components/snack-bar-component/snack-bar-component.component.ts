import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-component',
  templateUrl: './snack-bar-component.component.html',
  styleUrls: ['./snack-bar-component.component.scss']
})
export class SnackBarComponentComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() {}
}
