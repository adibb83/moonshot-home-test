import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ProgressSpinnerComponent } from '@shared/components/helpers/progress-spinner/progress-spinner.component';

@Injectable()
export class ProgressDialogService {

  constructor(private dialog: MatDialog) { }

  loading(state) {
    if (state) {
      this.dialog.open(ProgressSpinnerComponent, {
        disableClose: true
      });
    } else {
      this.dialog.closeAll();
    }
  }


}
