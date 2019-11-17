import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GlobalAppService {
  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar(message: string) {
    const actionButtonLabel = 'close';
    const action = true;
    const setAutoHide = true;
    const autoHide = 5000;
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    const addExtraClass = false;


    const config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = setAutoHide ? autoHide : 0;
    // config.extraClasses = addExtraClass ? ['test'] : undefined;
    this._snackBar.open(message, action ? actionButtonLabel : undefined, config);
    // this._snackBar.openFromComponent(SnackBarComponentComponent, {
    //   data: { message: 'hey you', action: 'FU', config },

    // });
  }

}
