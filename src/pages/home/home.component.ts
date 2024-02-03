import { Component } from '@angular/core';
import { Colors } from '../../constants/colors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly colors = Colors;
}
