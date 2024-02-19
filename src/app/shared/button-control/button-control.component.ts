import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-control',
  templateUrl: './button-control.component.html',
  styleUrls: ['./button-control.component.scss'],
})
export class ButtonControlComponent {
  @Input() path: string = '';
  @Input() color: 'primary' | 'warning' | 'danger' = 'primary';
  @Input() content: string = '';
  @Input() disabled: any;
}
