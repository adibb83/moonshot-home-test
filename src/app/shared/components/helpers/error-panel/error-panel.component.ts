import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Error {
  error_description: string;
  Message: string;
  ModelState: string;
}

@Component({
  selector: 'app-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.scss']
})
export class ErrorPanelComponent {
  @Input() error: Error;
  @Output() clear = new EventEmitter();
  public message: string;
}
