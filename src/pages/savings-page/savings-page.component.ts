import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface SavingsData {
  initial: number;
  contribution: number;
  contributionFrequency: number;
  time: number;
  apy: number;
}

@Component({
  selector: 'savings-page',
  templateUrl: './savings-page.component.html',
  styleUrl: './savings-page.component.scss'
})
export class SavingsPageComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      initial: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      contribution: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      contributionFrequency: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      time: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      apy: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Do something with the form values
      console.log(this.myForm.value);
    }
  }
}
