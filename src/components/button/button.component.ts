import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Colors } from '../../constants/colors';

@Component({
  selector: 'button-chip',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Output() clickEvent = new EventEmitter();
  @Input() buttonText? = '';
  @Input() buttonColor = Colors.PRIMARY1;

  onButtonClick(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.clickEvent.emit();
  }
}
