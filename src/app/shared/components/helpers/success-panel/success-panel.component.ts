import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-panel',
  templateUrl: './success-panel.component.html',
  styleUrls: ['./success-panel.component.scss']
})
export class SuccessPanelComponent {
  @Input() success: object;
  @Output() clear = new EventEmitter();
}
