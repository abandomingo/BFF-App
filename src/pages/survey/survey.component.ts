import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss',
})
export class SurveyComponent {
  income = new FormControl('');
}
