import { Component } from '@angular/core';
import { Colors } from '../../constants/colors';


@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  readonly colors = Colors;
}
