import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button-control',
  templateUrl: './button-control.component.html',
  styleUrls: ['./button-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonControlComponent {
  @Input() path: string = '';
  @Input() color: 'primary' | 'warning' | 'danger' = 'primary';
  @Input() content: string = '';
  @Input() disabled: any;
}
