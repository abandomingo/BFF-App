import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'budget-page',
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.scss',
  animations: [
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('350ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('350ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class BudgetPageComponent implements OnInit {

  public incomeForm!: FormGroup;
  public housingForm!: FormGroup;
  public transportationForm!: FormGroup;
  public educationForm!: FormGroup;
  public personalForm!: FormGroup;

  public necessities: number = 0;
  public wants: number = 0;
  public savings: number = 0;

  ngOnInit() {
    this.incomeForm = new FormGroup({
      incomeBudget: new FormControl('', [Validators.required, Validators.pattern(/^-?\$?\d*\.?\d+$/ )]),
      otherBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
    });

    this.housingForm = new FormGroup ({
      housingBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      utilityBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      internetBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      otherBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
    });

    this.transportationForm = new FormGroup ({
      carBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      insuranceBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      gasBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      repairBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
    });

    this.educationForm = new FormGroup ({
      suppliesBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      loansBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      tuitionBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
    });

    this.personalForm = new FormGroup ({
      groceryBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      clothesBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      entertainmentBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      medicalBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      otherBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
    });
  }

  public checkError = (formName: string, controlName: string, errorName: string) => {
    switch(formName) {
      case 'income':
        return this.incomeForm.controls[controlName].hasError(errorName);
      case 'housing':
        return this.housingForm.controls[controlName].hasError(errorName);
      case 'transportation':
        return this.transportationForm.controls[controlName].hasError(errorName);
      case 'education':
        return this.educationForm.controls[controlName].hasError(errorName);
      case 'personal':
        return this.personalForm.controls[controlName].hasError(errorName);
      default:
        return false;
    }
  };
  

  public submitBudget() {
    if(this.incomeForm && this.incomeForm.valid){
      const incomeData = this.incomeForm.value;
      const housingData = this.housingForm.value;
      const transportationData = this.transportationForm.value;
      const educationData = this.educationForm.value;
      const personalData = this.personalForm.value;

      const convertEmptyStringToZero = (data: any) => {
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key] === "") {
            data[key] = 0;
          }
        }
        return data;
      };

      const convertedIncomeData = convertEmptyStringToZero(incomeData);
      const convertedHousingData = convertEmptyStringToZero(housingData);
      const convertedTransportationData = convertEmptyStringToZero(transportationData);
      const convertedEducationData = convertEmptyStringToZero(educationData);
      const convertedPersonalData = convertEmptyStringToZero(personalData);

      this.necessities = Math.round(this.incomeForm.value.incomeBudget * 0.5);
      this.wants = Math.round(this.incomeForm.value.incomeBudget * 0.3);
      this.savings = Math.round(this.incomeForm.value.incomeBudget * 0.2);


      console.log({
        income: this.incomeForm.value,
        housing: this.housingForm.value,
        transportation: this.transportationForm.value,
        education: this.educationForm.value,
        personal: this.personalForm.value
      });
    }
  }
}
