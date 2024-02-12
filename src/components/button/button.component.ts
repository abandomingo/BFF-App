import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Colors } from '../../constants/colors';
import { Router } from '@angular/router';

@Component({
  selector: 'button-chip',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Output() clickEvent = new EventEmitter();
  @Input() buttonText? = '';
  @Input() buttonColor = Colors.PRIMARY1;
  @Input() buttonRoute? = '';

  
  constructor(private router: Router) {
  }

  onButtonClick(){
    this.router.navigate([this.buttonRoute])
  }

}
