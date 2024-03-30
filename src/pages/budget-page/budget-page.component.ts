import { animate, style, transition, trigger } from '@angular/animations';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LegendPosition } from '@swimlane/ngx-charts';

export interface PieSettings {
  view: [number, number];
  gradient: boolean;
  showLegend: boolean;
  showLabels: boolean;
  isDoughnut: boolean;
  animations: boolean;
  legendPosition: LegendPosition;
}

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

  public canSeeGraph: boolean = false;
  public isVertical: StepperOrientation = 'horizontal'

  idealDataset = [
    {
      "name": "Needs",
      "value": 100,
    },
  ];

  userDataset = [
    {
      "name": "Needs",
      "value": 100,
    },
  ];

  userCategoryDataset = [
    {
      "name": "All",
      "value": 100,
    },
  ];

  pieSettings: PieSettings = {
    view: [700, 500],
    gradient: true,
    showLegend: false,
    showLabels: true,
    isDoughnut: false,
    animations: true, 
    legendPosition: LegendPosition.Below,
  }
  

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
      savingsBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
      otherBudget: new FormControl('', [Validators.pattern(/^-?\d*\.?\d+$/)]),
    });

    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustViewSize();
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
    if(this.incomeForm.value <= 0){
      this.incomeForm.markAsTouched();
    }

    if(this.incomeForm && this.incomeForm.valid){
      this.canSeeGraph = true;
      const incomeData = this.incomeForm.value;
      const housingData = this.housingForm.value;
      const transportationData = this.transportationForm.value;
      const educationData = this.educationForm.value;
      const personalData = this.personalForm.value;

      const calculateTotal = (data: any) => {
        let total = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = parseFloat(data[key]);
                if (!isNaN(value)) {
                    total += value;
                }
            }
        }
        return total;
    };
    
    const convertEmptyStringToZero = (data: any) => {
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] === "") {
                data[key] = 0;
            }
        }
        data['total'] = calculateTotal(data); // Calculate and store the total
        return data;
    };
    

      //All empty inputs convert to 0
      const convertedIncomeData = convertEmptyStringToZero(incomeData);
      const convertedHousingData = convertEmptyStringToZero(housingData);
      const convertedTransportationData = convertEmptyStringToZero(transportationData);
      const convertedEducationData = convertEmptyStringToZero(educationData);
      const convertedPersonalData = convertEmptyStringToZero(personalData);

      const necessities = Math.round((convertedIncomeData.incomeBudget + convertedIncomeData.otherBudget) * 0.5);
      const wants = Math.round((convertedIncomeData.incomeBudget + convertedIncomeData.otherBudget)  * 0.3);
      const savings = Math.round((convertedIncomeData.incomeBudget + convertedIncomeData.otherBudget)  * 0.2);

      let dataset = [
        {
          "name": "Needs",
          "value": necessities,
        },
        {
          "name": "Savings",
          "value": savings,
        },
        {
          "name": "Wants",
          "value": wants,
        },
      ];

      this.idealDataset = dataset;

      const userNecessities = Math.round((
        convertedHousingData.housingBudget + 
        convertedHousingData.utilityBudget + 
        convertedHousingData.internetBudget + 
        convertedHousingData.otherBudget +
        convertedTransportationData.carBudget +
        convertedTransportationData.insuranceBudget +
        convertedTransportationData.gasBudget +
        convertedTransportationData.repairBudget +
        convertedEducationData.suppliesBudget + 
        convertedEducationData.tuitionBudget))

      const userWants = Math.round((
        convertedPersonalData.groceryBudget + 
        convertedPersonalData.clothesBudget + 
        convertedPersonalData.entertainmentBudget +
        convertedPersonalData.otherBudget
      ))

      const userSavings = Math.round((
        convertedEducationData.loansBudget + 
        convertedPersonalData.medicalBudget + 
        convertedPersonalData.savingsBudget
      ))

      const unaccountedMoney = Math.round((
        (convertedIncomeData.incomeBudget + convertedIncomeData.otherBudget) - (userNecessities + userSavings + userWants)
      ))

      dataset = [
        {
          "name": "Needs",
          "value": userNecessities,
        },
        {
          "name": "Wants",
          "value": userWants,
        },
        {
          "name": "Savings",
          "value": userSavings,
        },
        {
          "name": "Leftover",
          "value": unaccountedMoney,
        }
      ];

      this.userDataset = dataset;

      dataset = [
        {
          "name": "Housing",
          "value": convertedHousingData.total,
        },
        {
          "name": "Transportation",
          "value": convertedTransportationData.total,
        },
        {
          "name": "Education",
          "value": convertedEducationData.total,
        },
        {
          "name": "Personal",
          "value": convertedPersonalData.total,
        },
        {
          "name": "Extra",
          "value": unaccountedMoney,
        }
      ];

      this.userCategoryDataset = dataset

    }
  }

  private adjustViewSize(): void {
    const screenWidth = window.innerWidth;

    if(screenWidth <= 1000) {
      this.isVertical = 'vertical'
    }

    if (screenWidth < 800) {
      this.pieSettings.view = [screenWidth, screenWidth * 5/7]; 
    }
  }
}
